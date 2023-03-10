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
public class PostLikesDto {

    @NotNull(message = "petId를 입력해주세요")
    private Long petId;

    private int status;
}
