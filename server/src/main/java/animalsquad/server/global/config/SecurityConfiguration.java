package animalsquad.server.global.config;

import animalsquad.server.global.auth.handler.PetAccessDeniedHandler;
import animalsquad.server.global.auth.handler.PetAuthenticationEntryPoint;
import animalsquad.server.global.auth.handler.PetAuthenticationFailureHandler;
import animalsquad.server.global.auth.handler.PetAuthenticationSuccessHandler;
import animalsquad.server.global.auth.jwt.JwtAuthenticationFilter;
import animalsquad.server.global.auth.jwt.JwtExceptionFilter;
import animalsquad.server.global.auth.jwt.JwtTokenProvider;
import animalsquad.server.global.auth.jwt.JwtVerificationFilter;
import animalsquad.server.global.auth.userdetails.PetDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    private final PetDetailsService petDetailsService;

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors(Customizer.withDefaults())
                //JWT 방식을 사용하기 때문에 세션을 서버에 생성하지 않는다.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable() //http basic auth 기반 인증방식을 사용하지 않음
                .logout().disable() // AuthController 에서 logout처리하기 때문에 logout filter 사용하지 않음
                .exceptionHandling()
                .authenticationEntryPoint(new PetAuthenticationEntryPoint())
                .accessDeniedHandler(new PetAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
//                        .antMatchers("/login").permitAll()
                                .antMatchers("/pets/test").hasRole("USER") //권한 테스트용
                                .antMatchers("/pets/hell").hasRole("ADMIN") //권한 테스트용
                                .antMatchers("/logout").hasRole("USER")
                                .antMatchers("/pets/signup").permitAll()
                                .antMatchers("/reissue").permitAll()
                                .antMatchers("/pets/signup").permitAll()
//                                .antMatchers("/api/v1/upload").permitAll()
                                .anyRequest().hasRole("USER")

                );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "PUT", "DELETE", "HEAD"));
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider, redisTemplate);
//            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new PetAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new PetAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenProvider, redisTemplate,petDetailsService);

            JwtExceptionFilter jwtExceptionFilter = new JwtExceptionFilter();
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterBefore(jwtExceptionFilter, JwtVerificationFilter.class);
        }
    }

}
