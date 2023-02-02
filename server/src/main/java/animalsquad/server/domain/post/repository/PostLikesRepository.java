package animalsquad.server.domain.post.repository;

import animalsquad.server.domain.post.entity.PostLikes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikesRepository extends JpaRepository<PostLikes, Long> {

    Optional<PostLikes> findByPet_IdAndPost_Id(long petId, long postId);
}
