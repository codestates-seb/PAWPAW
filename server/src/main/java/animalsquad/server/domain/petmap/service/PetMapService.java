package animalsquad.server.domain.petmap.service;

import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.service.InfoMapService;
import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.service.PetService;
import animalsquad.server.domain.petmap.entity.PetMap;
import animalsquad.server.domain.petmap.repository.PetMapRepository;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PetMapService {

    private final PetMapRepository petMapRepository;
    private final InfoMapService infoMapService;
    private final PetService petService;

    public PetMap addPlace(PetMap petMap, long petId) {


        verifyAuthority(petId,petMap.getPet().getId());

        InfoMap infoMap = infoMapService.findVerifiedInfoMap(petMap.getInfoMap().getId());
        Pet pet = petService.findPet(petMap.getPet().getId());

        findExistsPlace(infoMap, pet);

        petMap.setInfoMap(infoMap);
        petMap.setPet(pet);

        return petMapRepository.save(petMap);
    }

    public void deletePlace(PetMap petMap, long petId) {

        verifyAuthority(petId,petMap.getPet().getId());

        InfoMap infoMap = infoMapService.findVerifiedInfoMap(petMap.getInfoMap().getId());
        Pet pet = petService.findPet(petMap.getPet().getId());

        PetMap findPetMap = findVerifiedPetMap(infoMap, pet);
        petMapRepository.delete(findPetMap);

    }

    public void findExistsPlace(InfoMap infoMap, Pet pet) {
        Optional<PetMap> optionalPetMap = petMapRepository.findByPet_IdAndInfoMap_Id(pet.getId(), infoMap.getId());

        if (optionalPetMap.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EXISTS_MY_PLACE);
        }
    }

    public PetMap findVerifiedPetMap(InfoMap infoMap, Pet pet) {
        return petMapRepository.findByPet_IdAndInfoMap_Id(pet.getId(), infoMap.getId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MY_PLACE_NOT_FOUND));
    }

    private void verifyAuthority(long principalId, long compareId) {
        if (principalId != compareId) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }
    }
}
