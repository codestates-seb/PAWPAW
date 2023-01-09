package animalsquad.server.domain.pet.mapper;

import animalsquad.server.domain.pet.dto.PetPostDto;
import animalsquad.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PetMapper {

    Pet petPostToPet(PetPostDto petPostDto);
}
