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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
        if (petId != infoMapComment.getPet().getId()) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }

        InfoMap infoMap = infoMapService.findVerifiedInfoMap(infoMapComment.getInfoMap().getId());
        Pet pet = petService.findPet(infoMapComment.getPet().getId(), token);

        infoMapComment.setPet(pet);
        infoMapComment.setInfoMap(infoMap);

        return infoMapCommentRepository.save(infoMapComment);
    }

    public InfoMapComment updateComment(InfoMapComment infoMapComment, String token) {
        long petId = jwtTokenProvider.getPetId(token);

        if (petId != infoMapComment.getPet().getId()) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }

        InfoMapComment findComment = findVerifiedComment(infoMapComment.getId());

        if (petId != findComment.getPet().getId()) {
            throw new BusinessLogicException(ExceptionCode.NOT_HAVE_PERMISSION_TO_EDIT);
        }


        Optional.ofNullable(infoMapComment.getContents())
                .ifPresent(findComment::setContents);

        return findComment;
    }

    public void deleteComment(long id, String token) {
        long petId = jwtTokenProvider.getPetId(token);

        InfoMapComment findComment = findVerifiedComment(id);

        if (petId != findComment.getPet().getId()) {
            throw new BusinessLogicException(ExceptionCode.NOT_HAVE_PERMISSION_TO_EDIT);
        }

        infoMapCommentRepository.deleteById(id);
    }

    public Page<InfoMapComment> findAllWithInfoMapId(int page, int size, long infoMapId) {
        return infoMapCommentRepository.findAllByInfoMap_Id(PageRequest.of(page,size, Sort.by("id")),infoMapId);
    }

    public InfoMapComment findVerifiedComment(long id) {
        return infoMapCommentRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.INFO_MAP_COMMENT_NOT_FOUND));
    }


}
