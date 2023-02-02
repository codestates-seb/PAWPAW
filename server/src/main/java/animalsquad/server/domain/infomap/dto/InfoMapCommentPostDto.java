package animalsquad.server.domain.infomap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InfoMapCommentPostDto {

    @NotNull(message = "petId를 입력해주세요")
    private Long petId;

    @NotNull(message = "infoMapId를 입력해주세요")
    private Long infoMapId;

    @NotEmpty(message = "내용을 입력해주세요")
    private String contents;
}
