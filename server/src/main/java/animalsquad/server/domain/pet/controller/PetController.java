package animalsquad.server.domain.pet.controller;

import animalsquad.server.domain.pet.dto.PetPatchDto;
import animalsquad.server.domain.pet.dto.PetPostDto;
import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.mapper.PetMapper;
import animalsquad.server.domain.pet.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pets")
@Validated
public class PetController {

    private final PetService petService;
    private final PetMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity postPet(@Valid PetPostDto petPostDto) throws IllegalAccessException {
        Pet pet = petService.createPet(mapper.petPostToPet(petPostDto), petPostDto.getProfileImage());

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/check/{login-id}")
    public ResponseEntity<Boolean> checkPet(@PathVariable ("login-id") String loginId) {
        Boolean result = petService.checkLoginId(loginId);

        return new ResponseEntity(result, HttpStatus.OK);
    }
    @PatchMapping("/{pet-id}")
    public ResponseEntity patchPet(@PathVariable("pet-id") long id,
                                    PetPatchDto petPatchDto) {
        petPatchDto.setId(id);

        Pet pet = petService.updatePet(mapper.petPatchToPet(petPatchDto), petPatchDto.getProfileImage());

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{pet-id}")
    public ResponseEntity getPet(@PathVariable("pet-id") long id) {
        Pet response = petService.findPet(id);

        return new ResponseEntity(mapper.petToPetResponseDto(response),HttpStatus.OK);
    }

    @DeleteMapping("/{pet-id}")
    public ResponseEntity deletePet(@PathVariable("pet-id") long id) {
        petService.deletePet(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
