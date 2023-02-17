package animalsquad.server.global.auth.service;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.repository.PetRepository;
import animalsquad.server.global.auth.dto.AuthRequestDto;
import animalsquad.server.global.auth.dto.AuthResponseDto;
import animalsquad.server.global.auth.jwt.JwtTokenProvider;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    private final PetRepository petRepository;

    public void reIssue(AuthRequestDto.ReIssue reIssue, HttpServletResponse response) {
        //Refresh Token 검증
        if (!jwtTokenProvider.validateToken(reIssue.getRefreshToken())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }

        String accessToken = jwtTokenProvider.resolveToken(reIssue.getAccessToken());

        //AccessToken으로 Authentication 생성
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        //redis에 저장된 Refresh token 획득
        String refreshToken = (String) redisTemplate.opsForValue().get("RT:" + authentication.getName());

        if (ObjectUtils.isEmpty(refreshToken)) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND);
        }

        //redis에 저장된 값과 request dto refresh token 과 비교
        if (!refreshToken.equals(reIssue.getRefreshToken())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }

        Pet pet = findVerifiedPet(authentication.getName());

        //토큰 재발급
        AuthResponseDto.TokenInfo tokenInfo = doGenerateToken(pet);

        redisTemplate.opsForValue().set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

//        response.setHeader("Authorization", "Bearer " + tokenInfo.getAccessToken());
//        response.setHeader("Refresh", tokenInfo.getRefreshToken());
        setToken(response, tokenInfo);
    }

    public void logout(AuthRequestDto.Logout logout) {
        String accessToken = jwtTokenProvider.resolveToken(logout.getAccessToken());

        if (!jwtTokenProvider.validateToken(accessToken)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            redisTemplate.delete("RT:" + authentication.getName());
        }

        Long expiration = jwtTokenProvider.getExpiration(accessToken);

        //redis에 (AccessToken : 남은 시간) 저장
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

    }

    public Pet findVerifiedPet(String loginId) {
        Optional<Pet> member = petRepository.findByLoginId(loginId);

        return member.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));
    }

    public AuthResponseDto.TokenInfo doGenerateToken(Pet pet) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("petId", pet.getId());
        claims.put("roles", pet.getRoles());
        claims.put("petName", pet.getPetName());
        claims.put("code", pet.getAddress().getCode());

        String subject = pet.getLoginId();
        AuthResponseDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(claims, subject);

        return tokenInfo;
    }

    public void setToken(HttpServletResponse response, AuthResponseDto.TokenInfo tokenInfo) {
        response.setHeader("Authorization", "Bearer " + tokenInfo.getAccessToken());
        response.setHeader("Refresh", tokenInfo.getRefreshToken());
    }

}