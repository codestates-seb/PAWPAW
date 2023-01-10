package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.address.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PetPostDto {

    @NotBlank(message = "아이디 입력해 주세요.")
    private String loginId;
    @NotBlank(message = "비밀번호를 입력해 주세요.")
    private String password;
    @NotBlank(message = "이름을 입력해 주세요.")
    private String petName;
    private int age;
    @NotBlank(message = "성별을 입력해 주세요.")
    private String gender;
    private int code;
    private String profileImage;

//    private MultipartFile profileImage;

}
