package animalsquad.server.domain.petmap.repository;

import animalsquad.server.domain.petmap.entity.PetMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PetMapRepository extends JpaRepository<PetMap, Long> {

    Optional<PetMap> findByPet_IdAndInfoMap_Id(long petId, long infoMapId);
}
