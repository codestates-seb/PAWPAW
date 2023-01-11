package animalsquad.server.domain.infomap.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InfoMapCommentPatchDto {

    private long commentId;

    @NotNull(message = "petId를 입력해주세요")
    private Long petId;

    @NotBlank(message = "내용을 입력해주세요")
    private String contents;
}
