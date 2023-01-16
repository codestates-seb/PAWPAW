package animalsquad.server.domain.pet.mapper;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.pet.dto.PetPatchDto;
import animalsquad.server.domain.pet.dto.PetPostDto;
import animalsquad.server.domain.pet.dto.PetResponseDto;
import animalsquad.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PetMapper {

    default Pet petPostToPet(PetPostDto petPostDto) {
        int code = petPostDto.getCode();
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
        int code = petPatchDto.getCode();
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

    default PetResponseDto petToPetResponseDto(Pet pet) {
        int code = pet.getAddress().getCode();

        PetResponseDto responseDto = new PetResponseDto();

        responseDto.setPetName(pet.getPetName());
        responseDto.setCode(code);
        responseDto.setProfileImage(pet.getProfileImage());
        responseDto.setAge(pet.getAge());
        responseDto.setGender(pet.getGender());
        responseDto.setSpecies(pet.getSpecies());

        return responseDto;

    }
}
