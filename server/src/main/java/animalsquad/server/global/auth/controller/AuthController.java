package animalsquad.server.global.auth.controller;

import animalsquad.server.global.auth.dto.AuthRequestDto;
import animalsquad.server.global.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;


/**
 * 토큰 재발급, 로그아웃 처리 컨트롤러
 */
@RestController
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final AuthService authService;

    @PostMapping("/reissue")
    public ResponseEntity reissue(@RequestBody @Valid AuthRequestDto.ReIssue reIssue) {
        authService.reIssue(reIssue);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestBody @Valid AuthRequestDto.Logout logout) {
        authService.logout(logout);

        return new ResponseEntity(HttpStatus.OK);
    }

}
