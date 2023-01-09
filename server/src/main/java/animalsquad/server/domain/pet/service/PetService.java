package animalsquad.server.domain.pet.service;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.repository.PetRepository;
import animalsquad.server.global.enums.Role;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final PasswordEncoder passwordEncoder;


    public Pet createPet(Pet pet) {
        verifyExistsId(pet.getLoginId());
        pet.setPassword(passwordEncoder.encode(pet.getPassword()));
        pet.setRoles(Collections.singletonList(Role.ROLE_USER.name()));

        return petRepository.save(pet);
    }

    private void verifyExistsId(String loginId) {
        Optional<Pet> pet = petRepository.findByLoginId(loginId);

        if (pet.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.PET_EXISTS);
        }
    }
}
