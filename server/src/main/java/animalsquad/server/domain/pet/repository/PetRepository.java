package animalsquad.server.domain.pet.repository;

import animalsquad.server.domain.pet.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    Optional<Pet> findByLoginId(String loginId);
    boolean existsByLoginId(String loginId);
}
