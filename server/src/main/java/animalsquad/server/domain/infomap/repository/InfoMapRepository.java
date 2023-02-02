package animalsquad.server.domain.infomap.repository;


import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InfoMapRepository extends JpaRepository<InfoMap, Long> {

    @Query("select im from InfoMap im where im.address.code = :code")
    List<InfoMap> findInfoMaps(int code);

    @Query("select im from InfoMap im where im.address.code = :code and im.category = :from")
    List<InfoMap> findInfoMapsWithFilter(int code, InfoMapCategory from);

    @Query("select im from InfoMap im join fetch PetMap pm on im.id = pm.infoMap.id where pm.pet.id = :petId")
    List<InfoMap> findInfoMapsMyPick(long petId);
}
