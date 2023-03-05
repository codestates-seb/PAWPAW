package animalsquad.server.domain.post.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
public class PostSearchDto {

    @Nullable
    private Integer code;

    /**
     * SearchType: author, title, content
     */
    @Nullable
    private String searchType;

    /**
     * SearchType 값이 있으면 searchContent 필수
     */
    @Nullable
    private String searchContent;

//    /**
//     * 기본값: id,
//     * 옵션: likes, comments
//     */
//    @NotEmpty
//    private String sort;

}
