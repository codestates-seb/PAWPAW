package animalsquad.server.global.auth.userdetails;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.repository.PetRepository;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PetDetailsService implements UserDetailsService {

    private final PetRepository petRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Pet> optionalPet = petRepository.findByLoginId(username);

        Pet pet = optionalPet.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));

        return new PetDetails(pet);
    }

    private final class PetDetails extends Pet implements UserDetails {
        PetDetails(Pet pet) {
            setPetId(pet.getPetId());
            setLoginId(pet.getLoginId());
            setPassword(pet.getPassword());
            setRoles(pet.getRoles());
            setPetName(pet.getPetName());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return this.getRoles().stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        }

        @Override
        public String getUsername() {
            return getLoginId();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
