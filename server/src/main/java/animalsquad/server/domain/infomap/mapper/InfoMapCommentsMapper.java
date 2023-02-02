package animalsquad.server.domain.infomap.mapper;

import animalsquad.server.domain.infomap.dto.InfoMapCommentPatchDto;
import animalsquad.server.domain.infomap.dto.InfoMapCommentPostDto;
import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapComment;
import animalsquad.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InfoMapCommentsMapper {

    default InfoMapComment infoMapCommentPostToInfoMap(InfoMapCommentPostDto infoMapCommentPostDto) {
        InfoMapComment infoMapComment = new InfoMapComment();
        Pet pet = new Pet();
        pet.setId(infoMapCommentPostDto.getPetId());
        InfoMap infoMap = new InfoMap();
        infoMap.setId(infoMapCommentPostDto.getInfoMapId());

        infoMapComment.setContents(infoMapCommentPostDto.getContents());
        infoMapComment.setInfoMap(infoMap);
        infoMapComment.setPet(pet);

        return infoMapComment;
    }


    default InfoMapComment infoMapCommentPatchToInfoMap(InfoMapCommentPatchDto infoMapCommentPatchDto) {
        InfoMapComment infoMapComment = new InfoMapComment();
        Pet pet = new Pet();
        pet.setId(infoMapCommentPatchDto.getPetId());
        infoMapComment.setContents(infoMapCommentPatchDto.getContents());
        infoMapComment.setPet(pet);
        infoMapComment.setId(infoMapCommentPatchDto.getCommentId());

        return infoMapComment;
    }
}
