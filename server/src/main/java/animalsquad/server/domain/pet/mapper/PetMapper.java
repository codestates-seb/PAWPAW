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

//    @Mapping(target = "address", source = "address.code")
    Pet petPostToPet(PetPostDto petPostDto);
    Pet petPatchToPet(PetPatchDto petPatchDto);
//    @Mapping(target = "address", source = "address.code")
    PetResponseDto petToPetResponseDto(Pet pet);
//    @Mapping(target = "address", source = "address.code")
    List<PetResponseDto> petsToPetResponses(List<Pet> pets);

//    default Pet petPostToPet1(PetPostDto petPostDto) {
//        int code = petPostDto.getCode(); //ADDress -> code
//        Address address = new Address();
//        address.setCode(code);
//
//        Pet = new Pet();
//        pet.set~~
//
//
//        //Pet등록하실 때
//        createPet(Pet pet) {
//            int code = pet.getAddress().getCode();
//            Address findAddress = addressRepository.findByCode(code); //네임, 코드랑
//            pet.setAddress(findAddress);
//
//            petRepository.save(pet);
//        }
//
//    }
}
