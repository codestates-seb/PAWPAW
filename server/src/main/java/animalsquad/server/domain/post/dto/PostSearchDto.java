package animalsquad.server.domain.post.dto;

import lombok.Getter;

@Getter
public class PostSearchDto {

    private Integer code;
    private String searchType;
    private String searchContent;
    private String sort;

}
