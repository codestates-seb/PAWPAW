package animalsquad.server.domain.post.dto;

import animalsquad.server.domain.post.entity.VoteStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostLikesPostDto {

    @NotNull(message = "petId를 입력해주세요")
    private Long petId;

    @NotNull(message = "postId를 입력해주세요")
    private Long postId;

    private VoteStatus voteStatus;
}
