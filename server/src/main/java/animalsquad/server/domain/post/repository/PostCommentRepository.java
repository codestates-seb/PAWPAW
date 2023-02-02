package animalsquad.server.domain.post.repository;

import animalsquad.server.domain.post.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
}
