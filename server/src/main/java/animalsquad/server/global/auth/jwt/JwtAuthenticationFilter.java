package animalsquad.server.global.auth.jwt;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.global.auth.dto.AuthRequestDto;
import animalsquad.server.global.auth.dto.AuthResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 로그인 처리 필터
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        AuthRequestDto.LoginDto loginDto = objectMapper.readValue(request.getInputStream(), AuthRequestDto.LoginDto.class);

        //인증 전의 토큰
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        Pet pet = (Pet) authResult.getPrincipal();

        AuthResponseDto.TokenInfo tokenInfo = delegateToken(pet);

        response.setHeader("Authorization", "Bearer " + tokenInfo.getAccessToken());
        response.setHeader("Refresh", tokenInfo.getRefreshToken());

        //유저 인증이 완료되면 AccessToken, RefreshToken 헤더에 입력하고 redis에 Refresh token을 저장한다.
        redisTemplate.opsForValue().set("RT:" + pet.getLoginId(),tokenInfo.getRefreshToken(),tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);


        this.getSuccessHandler().onAuthenticationSuccess(request,response,authResult);
    }

    //AccessToken, Refresh Token 생성 메서드
    //나중에 Profile Image 등 필요한 정보 있으면 변경 가능성 있음
    private AuthResponseDto.TokenInfo delegateToken(Pet pet) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("petId", pet.getId());
        claims.put("roles", pet.getRoles());
        claims.put("petName",pet.getPetName());
        claims.put("code",pet.getAddress().getCode());

        String subject = pet.getLoginId();
        return jwtTokenProvider.generateToken(claims, subject);
    }
}
