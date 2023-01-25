package animalsquad.server.domain.petmap.controller;

import animalsquad.server.domain.petmap.dto.MyPlaceDto;
import animalsquad.server.domain.petmap.entity.PetMap;
import animalsquad.server.domain.petmap.mapper.PetMapMapper;
import animalsquad.server.domain.petmap.service.PetMapService;
import animalsquad.server.global.auth.userdetails.PetDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
public class PetMapController {

    private final PetMapService petMapService;
    private final PetMapMapper mapper;

    @PostMapping("/maps/addplace")
    public ResponseEntity createPlace(@Valid @RequestBody MyPlaceDto addPlaceDto,
                                      @AuthenticationPrincipal PetDetailsService.PetDetails principal) {

        long petId = principal.getId();
        PetMap petMap = mapper.myPlaceDtoToPetMap(addPlaceDto);
        PetMap result = petMapService.addPlace(petMap, petId);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @DeleteMapping("/maps/cancel")
    public ResponseEntity deletePlace(@Valid @RequestBody MyPlaceDto deletePlaceDto,
                                      @AuthenticationPrincipal PetDetailsService.PetDetails principal) {

        PetMap petMap = mapper.myPlaceDtoToPetMap(deletePlaceDto);
        long petId = principal.getId();
        petMapService.deletePlace(petMap,petId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
