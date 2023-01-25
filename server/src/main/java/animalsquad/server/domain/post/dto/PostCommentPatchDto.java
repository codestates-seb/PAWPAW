package animalsquad.server.domain.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentPatchDto {

    private Long commentId;

    @NotNull(message = "내용을 입력해주세요")
    private String contents;
}
