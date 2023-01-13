package animalsquad.server.domain.infomap.repository;


import animalsquad.server.domain.infomap.entity.InfoMapComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoMapCommentRepository extends JpaRepository<InfoMapComment, Long> {

    Page<InfoMapComment> findAllByInfoMap_Id(Pageable pageable,long infoMapId);
}
