package animalsquad.server.domain.petmap.mapper;

import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.petmap.dto.MyPlaceDto;
import animalsquad.server.domain.petmap.entity.PetMap;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PetMapMapper {

    default PetMap myPlaceDtoToPetMap(MyPlaceDto addPlaceDto) {
        PetMap petMap = new PetMap();

        Pet pet = new Pet();
        pet.setId(addPlaceDto.getPetId());

        InfoMap infoMap = new InfoMap();
        infoMap.setId(addPlaceDto.getInfoMapId());

        petMap.setPet(pet);
        petMap.setInfoMap(infoMap);

        return petMap;
    }
}
