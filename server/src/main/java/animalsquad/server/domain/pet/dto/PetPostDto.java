package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.pet.entity.Gender;
import animalsquad.server.domain.pet.entity.Species;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PetPostDto {

    @NotBlank(message = "아이디 입력해 주세요.")
    @Pattern(regexp = "^([a-zA-Z0-9]*)$", message = "아이디는 영문, 숫자만 사용 가능합니다.")
    private String loginId;
    @NotBlank(message = "비밀번호를 입력해 주세요.")
    private String password;
    @NotBlank(message = "이름을 입력해 주세요.")
    private String petName;
    @NotNull
    private int age;
    @NotNull
    private Gender gender;
    @NotNull
    private Species species;
    @NotNull
    private int code;
    private MultipartFile profileImage;

}
