package animalsquad.server.domain.post.repository;

import animalsquad.server.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

//    Optional<Post> findByPetId(String petId);
    Page<Post> findAllByPet_Id(Pageable pageable, long petId);
}
