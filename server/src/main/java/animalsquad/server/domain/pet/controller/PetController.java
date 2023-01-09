package animalsquad.server.domain.pet.controller;

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
    public ResponseEntity postPet(@Valid @RequestBody PetPostDto petPostDto) {
        Pet pet = petService.createPet(mapper.petPostToPet(petPostDto));

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/test")
    public ResponseEntity test() {
        return ResponseEntity.ok().body("test");
    }

    @GetMapping("/hell")
    public ResponseEntity hell() {
        return ResponseEntity.ok().body("hell");
    }
}
