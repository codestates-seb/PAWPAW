package animalsquad.server.domain.post.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
public class PostSearchDto {

    @Nullable
    private Integer code;

    @Nullable
    private String searchType;

    @Nullable
    private String searchContent;

    @Nullable
    private String sort;

}
