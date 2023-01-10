package animalsquad.server.domain.infomap.repository;


import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InfoMapRepository extends JpaRepository<InfoMap, Long> {

    @Query("select im from InfoMap im where im.address.id in (select a.id from Address a join Pet p on a.id = p.address.id where p.id = :petId)")
    List<InfoMap> findInfoMaps(long petId);


    @Query("select im from InfoMap im where im.address.id in (select a.id from Address a join Pet p on a.id = p.address.id where p.id = :petId) and im.category = :from")
    List<InfoMap> findInfoMapsWithFilter(long petId, InfoMapCategory from);
}
