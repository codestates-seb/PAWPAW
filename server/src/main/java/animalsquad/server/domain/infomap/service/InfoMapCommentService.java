package animalsquad.server.domain.infomap.service;

import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapComment;
import animalsquad.server.domain.infomap.repository.InfoMapCommentRepository;
import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.service.PetService;
import animalsquad.server.global.auth.jwt.JwtTokenProvider;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class InfoMapCommentService {

    private final JwtTokenProvider jwtTokenProvider;
    private final InfoMapCommentRepository infoMapCommentRepository;
    private final InfoMapService infoMapService;
    private final PetService petService;



    public InfoMapComment createComment(InfoMapComment infoMapComment, String token) {

        long petId = jwtTokenProvider.getPetId(token);
        if(petId != infoMapComment.getPet().getId()) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }

        InfoMap infoMap = infoMapService.findVerifiedInfoMap(infoMapComment.getInfoMap().getId());
        Pet pet = petService.findPet(infoMapComment.getPet().getId());

        infoMapComment.setPet(pet);
        infoMapComment.setInfoMap(infoMap);

        return infoMapCommentRepository.save(infoMapComment);
    }
}
