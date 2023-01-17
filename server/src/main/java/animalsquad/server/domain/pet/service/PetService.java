package animalsquad.server.domain.pet.service;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.address.repository.AddressRepository;
import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.entity.Species;
import animalsquad.server.domain.pet.repository.PetRepository;
import animalsquad.server.global.s3.service.FileUploadService;
import animalsquad.server.global.auth.jwt.JwtTokenProvider;
import animalsquad.server.global.enums.Role;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor // final 붙은 필드 생성자 자동 생성
@Slf4j
public class PetService {

    private final PetRepository petRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileUploadService fileUploadService;
    private final RedisTemplate redisTemplate;
    private final String folder = "profile";


    public Pet createPet(Pet pet, MultipartFile file) throws IllegalAccessException {
        verifyExistsId(pet.getLoginId());
        pet.setPassword(passwordEncoder.encode(pet.getPassword()));
        pet.setRoles(Collections.singletonList(Role.ROLE_USER.name()));

        int code = pet.getAddress().getCode();
        Address address = verifiedAddress(code);
        pet.setAddress(address);

        String defaultDogImageUrl = "https://animal-squad.s3.ap-northeast-2.amazonaws.com/profile/default_dog.png";
        String defaultCatImageUrl = "https://animal-squad.s3.ap-northeast-2.amazonaws.com/profile/default_cat.png";

        // 디폴트 이미지는 S3에 저장해두고 Url만 저장
        if (file == null && pet.getSpecies() == Species.DOG) {
            pet.setProfileImage(defaultDogImageUrl);
        } else if ( file == null && pet.getSpecies() == Species.CAT) {
            pet.setProfileImage(defaultCatImageUrl);
        } else {
                String imageUrl = fileUploadService.uploadImage(file, folder);
                pet.setProfileImage(imageUrl);
        }

        return petRepository.save(pet);
    }

    public Pet updatePet(Pet pet,long petId, MultipartFile file) throws IllegalAccessException {
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

        String defaultDogImageUrl = "https://animal-squad.s3.ap-northeast-2.amazonaws.com/profile/default_dog.png";
        String defaultCatImageUrl = "https://animal-squad.s3.ap-northeast-2.amazonaws.com/profile/default_cat.png";

        // 프로필 이미지 수정, 디폴트 이미지, 종에 따라 디폴트 이미지 변경
        if(file != null && !file.isEmpty()) {
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
    // 커뮤니티 기능 구현 전 나의 정보만 조회
    // 저장된 유저의 id와 요청한 유저의 id가 맞는지 검증하는 로직
    public Pet petVerifiedToken(long id, long petId) {
        Pet findPet = findPet(id);

        verifiedToken(findPet, petId);

        return findPet;
    }

    // repository에 저장된 유저를 가져오는 로직
    public Pet findPet(long id) {
        return findVerifiedPet(id);
    }

    // redis 설정 시 refreshToken 삭제 추가

    public void deletePet(long id, long petId) throws IllegalAccessException {
        Pet findPet = findVerifiedPet(id);

        verifiedToken(findPet, petId);

        // redis에서 RefreshToken 삭제
        String findPetLoginId = findPet.getLoginId();
        redisTemplate.delete("RT:" + findPetLoginId);
        // S3에서 image삭제
        if (!findPet.getProfileImage().contains("default")) {
            String image = findPet.getProfileImage();
            fileUploadService.deleteFile(image, folder);
        }
        petRepository.deleteById(id);
    }

    private void verifiedToken(Pet pet, long petId) {
        if (petId != pet.getId()) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }
    }

    private Address verifiedAddress(int code) {
        Optional<Address> optionalAddress = addressRepository.findByCode(code);
        Address address = optionalAddress.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));
        return address;
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
                new NoSuchElementException(ExceptionCode.PET_NOT_FOUND.getMessage()));

        return findPet;
    }

}
