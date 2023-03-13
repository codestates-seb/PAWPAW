package animalsquad.server.domain.pet.service;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.address.service.AddressService;
import animalsquad.server.domain.pet.dto.PetPostAdminDto;
import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.entity.PetStatus;
import animalsquad.server.domain.pet.entity.Species;
import animalsquad.server.domain.pet.repository.PetRepository;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.repository.PostRepository;
import animalsquad.server.global.auth.dto.AuthResponseDto;
import animalsquad.server.global.auth.jwt.JwtTokenProvider;
import animalsquad.server.global.auth.service.AuthService;
import animalsquad.server.global.enums.Role;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import animalsquad.server.global.s3.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PetService {

    private final PetRepository petRepository;
    private final AddressService addressService;
    private final PasswordEncoder passwordEncoder;
    private final FileUploadService fileUploadService;
    private final RedisTemplate redisTemplate;
    private final JwtTokenProvider jwtTokenProvider;
    private final PostRepository postRepository;
    private final AuthService authService;
    private final String folder = "profile";
    private final String defaultDogImageUrl = "https://animal-squad.s3.ap-northeast-2.amazonaws.com/profile/default_dog.png";
    private final String defaultCatImageUrl = "https://animal-squad.s3.ap-northeast-2.amazonaws.com/profile/default_cat.png";

    public Pet createPet(Pet pet, MultipartFile file) {
        verifyExistsId(pet.getLoginId());
        pet.setPassword(passwordEncoder.encode(pet.getPassword()));
        pet.setRoles(Collections.singletonList(Role.ROLE_USER.name()));

        int code = pet.getAddress().getCode();
        Address address = verifiedAddress(code);
        pet.setAddress(address);

        if (file == null && pet.getSpecies() == Species.DOG) {
            pet.setProfileImage(defaultDogImageUrl);
        } else if (file == null && pet.getSpecies() == Species.CAT) {
            pet.setProfileImage(defaultCatImageUrl);
        } else {
            String imageUrl = fileUploadService.uploadImage(file, folder);
            pet.setProfileImage(imageUrl);
        }
        return petRepository.save(pet);
    }

    public Pet updatePet(Pet pet, long petId, MultipartFile file) {
        Pet findPet = findVerifiedPet(pet.getId());

        verifiedToken(pet, petId);

        Optional.ofNullable(pet.getPetName())
                .ifPresent(name -> findPet.setPetName(name));
        Optional.ofNullable(pet.getAge())
                .ifPresent(age -> findPet.setAge(age));
        Optional.ofNullable(pet.getGender())
                .ifPresent(gender -> findPet.setGender(gender));
        Optional.ofNullable(pet.getSpecies())
                .ifPresent(species -> findPet.setSpecies(species));
        Optional.ofNullable(pet.getAddress().getCode())
                .ifPresent(code -> {
                    Address address = verifiedAddress(code);
                    findPet.setAddress(address);
                });

        // 프로필 이미지 수정, 디폴트 이미지, 종에 따라 디폴트 이미지 변경
        if (file != null && !file.isEmpty()) {
            String beforeImage = findPet.getProfileImage();
            fileUploadService.deleteFile(beforeImage, folder);

            String imageUrl = fileUploadService.uploadImage(file, folder);
            findPet.setProfileImage(imageUrl);

        } else if (file != null && findPet.getProfileImage().contains("default")) {
            String imageUrl = fileUploadService.uploadImage(file, folder);
            findPet.setProfileImage(imageUrl);
        } else if (file == null && findPet.getProfileImage().contains("default") && findPet.getSpecies() == Species.DOG) {
            findPet.setProfileImage(defaultDogImageUrl);
        } else if (file == null && findPet.getProfileImage().contains("default") && findPet.getSpecies() == Species.CAT) {
            findPet.setProfileImage(defaultCatImageUrl);
        }

        Pet savedPet = petRepository.save(findPet);

        return savedPet;
    }

    public Boolean checkLoginId(String loginId) {
        return petRepository.existsByLoginId(loginId);
    }

    public Pet findPet(long id) {
        return findVerifiedPet(id);
    }

    public Page<Post> findPost(int page, int size, long petId) {
        return postRepository.findAllByPet_Id(PageRequest.of(page, size, Sort.by("id").descending()), petId);
    }

    public void deletePet(long id, long petId) {
        Pet findPet = findVerifiedPet(id);

        verifiedToken(findPet, petId);

        if(findPet.getLoginId().equals("guest1234")) {
            throw new BusinessLogicException(ExceptionCode.NOT_HAVE_PERMISSION_TO_EDIT);
        }

        findPet.setPetStatus(PetStatus.PET_SLEEP);

        String findPetLoginId = findPet.getLoginId();
        redisTemplate.delete("RT:" + findPetLoginId);

        // S3에서 image삭제 후 기본 이미지로 변경
        if (!findPet.getProfileImage().contains("default")) {
            String image = findPet.getProfileImage();
            fileUploadService.deleteFile(image, folder);

            if(findPet.getSpecies() == Species.DOG) {
                findPet.setProfileImage(defaultDogImageUrl);
            } else {
                findPet.setProfileImage(defaultCatImageUrl);
            }
        }
    }

    // 관리자 권한 승인 요청
    public void verifiedAdmin(long id, long petId, PetPostAdminDto petPostAdminDto) {
        Pet findPet = findVerifiedPet(id);

        verifiedToken(findPet, petId);

        if (findPet.getRoles().contains("ROLE_ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.PET_ROLE_EXISTS);
        }

        if (!petPostAdminDto.getAdminCode().equals("동물특공대")) {
            throw new BusinessLogicException(ExceptionCode.ADMIN_CODE_NOT_MATCH);
        }

        findPet.getRoles().add((Role.ROLE_ADMIN.name()));
        petRepository.save(findPet);

        AuthResponseDto.TokenInfo tokenInfo = jwtTokenProvider.delegateToken(findPet);

        authService.setToken(tokenInfo);

        redisTemplate.opsForValue().set("RT:" + findPet.getLoginId(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
    }

    public List<Pet> findFriends(List<Integer> code,long id) {
        List<Pet> friends = petRepository.findFriends(code,id);
        return friends;
    }

    private void verifiedToken(Pet pet, long petId) {
        if (petId != pet.getId()) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }
    }

    private Address verifiedAddress(int code) {
        return addressService.findAddressByCode(code);
    }

    private void verifyExistsId(String loginId) {
        Optional<Pet> pet = petRepository.findByLoginId(loginId);

        if (pet.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.PET_EXISTS);
        }
    }

    private Pet findVerifiedPet(long id) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        Pet findPet = optionalPet.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));

        return findPet;
    }

}
