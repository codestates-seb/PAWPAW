package animalsquad.server.domain.pet.repository;

import animalsquad.server.domain.pet.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PetRepository extends JpaRepository<Pet, Long> {

    Optional<Pet> findByLoginId(String loginId);
}
