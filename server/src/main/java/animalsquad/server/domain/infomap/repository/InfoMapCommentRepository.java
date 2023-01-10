package animalsquad.server.domain.infomap.repository;


import animalsquad.server.domain.infomap.entity.InfoMapComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoMapCommentRepository extends JpaRepository<InfoMapComment, Long> {
}
