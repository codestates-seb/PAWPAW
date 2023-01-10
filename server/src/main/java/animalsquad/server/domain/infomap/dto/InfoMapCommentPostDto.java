package animalsquad.server.domain.infomap.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InfoMapCommentPostDto {

    private long petId;
    private long infoMapId;
    private String content;
}
