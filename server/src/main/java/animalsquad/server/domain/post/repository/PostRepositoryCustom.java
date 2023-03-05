package animalsquad.server.domain.post.repository;

import animalsquad.server.domain.post.dto.PostSearchDto;
import animalsquad.server.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {

//    Page<Post> getPostsSortByNewest(PostSearchDto postSearchDto, Pageable pageable);
//    Page<Post> getPostsSortByLikes(PostSearchDto postSearchDto, Pageable pageable);

    Page<Post> getPosts(PostSearchDto postSearchDto, Pageable pageable, String sort);
}
