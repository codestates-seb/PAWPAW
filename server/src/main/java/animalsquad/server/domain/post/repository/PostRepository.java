package animalsquad.server.domain.post.repository;

import animalsquad.server.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

//    Optional<Post> findByPetId(String petId);
}
