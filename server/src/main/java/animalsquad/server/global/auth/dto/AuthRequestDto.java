package animalsquad.server.global.auth.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class AuthRequestDto {

    @Getter
    @Setter
    public static class LoginDto {
        @NotBlank(message = "아이디는 필수 입력값입니다.")
        private String loginId;

        @NotBlank(message = "비밀번호는 필수 입력값입니다.")
        private String password;

    }

    @Getter
    @Setter
    public static class ReIssue {
        @NotBlank(message = "accessToken 을 입력해주세요.")
        private String accessToken;

        @NotBlank(message = "refreshToken 을 입력해주세요.")
        private String refreshToken;
    }

    @Getter
    @Setter
    public static class Logout {
        @NotBlank(message = "accessToken 을 입력해주세요.")
        private String accessToken;

        @NotBlank(message = "refreshToken 을 입력해주세요.")
        private String refreshToken;
    }

}
