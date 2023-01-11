package animalsquad.server.domain.petmap.controller;

import animalsquad.server.domain.petmap.dto.MyPlaceDto;
import animalsquad.server.domain.petmap.entity.PetMap;
import animalsquad.server.domain.petmap.mapper.PetMapMapper;
import animalsquad.server.domain.petmap.service.PetMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor

public class PetMapController {

    private final PetMapService petMapService;
    private final PetMapMapper mapper;

    @PostMapping("/maps/addplace")
    public ResponseEntity createPlace(@RequestBody MyPlaceDto addPlaceDto,
                                      @RequestHeader("Authorization") String token) {

        PetMap petMap = mapper.addPlaceDtoToPetMap(addPlaceDto);
        PetMap result = petMapService.addPlace(petMap, token);

        return new ResponseEntity(HttpStatus.CREATED);
    }
}
