package animalsquad.server.global.auth.jwt;

import animalsquad.server.global.auth.userdetails.PetDetailsService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    private final PetDetailsService petDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request); // Authorization 헤더에서 Bearer 제거한 token 획득

        //토큰에 값이 있고 유효한 토큰일 때
        if (token != null && jwtTokenProvider.validateToken(token)) {

            /**
             *로그아웃 된 토큰인지 확인한다.
             *로그아웃 된 토큰은 redis 에 (AccessToken : logout) 의 형태로 저장되어 있음
             */
            String isLogout = (String) redisTemplate.opsForValue().get(token);
            //로그아웃 되지 않은 토큰이면 시큐리티 컨텍스트에 authentication 등록
            if (ObjectUtils.isEmpty(isLogout)) {
                Claims claims = jwtTokenProvider.parseClaims(token);
                setAuthenticationToContext(claims);
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer")
                || request.getRequestURI().substring(request.getRequestURI().lastIndexOf("/") + 1).equals("reissue");
    }

    private String resolveToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (StringUtils.hasText(token) && token.startsWith("Bearer")) {
            return token.substring(7);
        }

        return null;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String loginId = (String) claims.get("sub");
        List<GrantedAuthority> authorities = ((List<String>) claims.get("roles")).stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        UserDetails userDetails = petDetailsService.loadUserByUsername(loginId);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);

    }
}
