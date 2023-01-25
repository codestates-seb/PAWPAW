package animalsquad.server.domain.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostImagePostDto {

    @NotNull(message = "postId를 입력해주세요")
    private Long postId;

    private String imageUrl;
}
