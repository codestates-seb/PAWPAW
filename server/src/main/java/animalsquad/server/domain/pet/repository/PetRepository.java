package animalsquad.server.domain.pet.repository;

import animalsquad.server.domain.pet.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    Optional<Pet> findByLoginId(String loginId);

    boolean existsByLoginId(String loginId);

    @Query(value = "select * from pet join address on address.id = pet.address_id where address.code in (:code) and pet.id <> :id and pet.pet_status = 'PET_ACTIVE' order by rand() limit 7", nativeQuery = true)
    List<Pet> findFriends(List<Integer> code,long id);
}
