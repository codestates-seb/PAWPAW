package animalsquad.server.domain.petmap.controller;

import animalsquad.server.domain.petmap.dto.MyPlaceDto;
import animalsquad.server.domain.petmap.entity.PetMap;
import animalsquad.server.domain.petmap.mapper.PetMapMapper;
import animalsquad.server.domain.petmap.service.PetMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor

public class PetMapController {

    private final PetMapService petMapService;
    private final PetMapMapper mapper;

    @PostMapping("/maps/addplace")
    public ResponseEntity createPlace(@RequestBody MyPlaceDto addPlaceDto,
                                      @RequestHeader("Authorization") String token) {

        PetMap petMap = mapper.myPlaceDtoToPetMap(addPlaceDto);
        PetMap result = petMapService.addPlace(petMap, token);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @DeleteMapping("/maps/cancel")
    public ResponseEntity deletePlace(@RequestBody MyPlaceDto deletePlaceDto,
                                      @RequestHeader("Authorization") String token) {

        PetMap petMap = mapper.myPlaceDtoToPetMap(deletePlaceDto);
        petMapService.deletePlace(petMap,token);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
