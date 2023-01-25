package animalsquad.server.domain.pet.mapper;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.infomap.entity.InfoMapComment;
import animalsquad.server.domain.pet.dto.PetPatchDto;
import animalsquad.server.domain.pet.dto.PetPostDto;
import animalsquad.server.domain.pet.dto.PetResponseDto;
import animalsquad.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PetMapper {

    default Pet petPostToPet(PetPostDto petPostDto) {
        Integer code = petPostDto.getCode();
        Address address = new Address();
        address.setCode(code);

        Pet pet = new Pet();

        pet.setLoginId(petPostDto.getLoginId());
        pet.setPassword( petPostDto.getPassword() );
        pet.setPetName( petPostDto.getPetName() );
        pet.setAge( petPostDto.getAge() );
        pet.setGender( petPostDto.getGender() );
        pet.setSpecies(petPostDto.getSpecies());
//        pet.setProfileImage( petPostDto.getProfileImage());
        pet.setAddress(address);

        return pet;
    }
    default Pet petPatchToPet(PetPatchDto petPatchDto) {
        Integer code = petPatchDto.getCode();
        Address address = new Address();
        address.setCode(code);

        Pet pet = new Pet();

        pet.setId(petPatchDto.getId());
        pet.setPetName(petPatchDto.getPetName());
        pet.setAge(petPatchDto.getAge());
        pet.setGender(petPatchDto.getGender());
        pet.setSpecies(petPatchDto.getSpecies());
//        pet.setProfileImage(petPatchDto.getProfileImage());
        pet.setAddress(address);

        return pet;
    }

    default PetResponseDto.PetInfo setPetInfo(Pet pet) {
        Integer code = pet.getAddress().getCode();

        PetResponseDto.PetInfo petInfo = new PetResponseDto.PetInfo();

        petInfo.setPetName(pet.getPetName());
        petInfo.setCode(code);
        petInfo.setProfileImage(pet.getProfileImage());
        petInfo.setAge(pet.getAge());
        petInfo.setGender(pet.getGender());
        petInfo.setSpecies(pet.getSpecies());

        return petInfo;
    }
    //TODO: 게시글 가져오기
    default List<PetResponseDto.PostInfo> setPostInfo(List<Post> posts){
        return posts.stream()
                .map(post -> {
                    PetResponseDto.PostInfo postInfo = new PetResponseDto.PostInfo();
                    postInfo.setPostId(posts.getId);
                    postInfo.setTitle(posts.getTitle);
                    postInfo.setContents(posts.getContent);
//                    postInfo.setPetName();
                    postInfo.setCreatedAt(posts.getCreatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd")));
//                    postInfo.setLikeCount();

                    return postInfo;
                }).collect(Collectors.toList());
    }

    default PetResponseDto petToPetResponseDto(Pet pet, Page<Post> postPage) {
        List<Post> posts = postPage.getContent();
        PetResponseDto.PetInfo petInfo = setPetInfo(pet);
        List<PetResponseDto.PostInfo> postInfo = setPostInfo(posts);

        return new PetResponseDto(petInfo, postInfo, postPage);
    }
}
