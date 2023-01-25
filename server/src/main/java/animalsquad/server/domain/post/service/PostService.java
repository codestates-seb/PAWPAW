package animalsquad.server.domain.post.service;

import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public Post createPost(Post post, long postId) throws IllegalAccessException {
        verifyPostId(post.getId());
        post.setTitle(post.getTitle());
        post.setContents(post.getContents());

        return PostRepository.save(post);
    }

    public Post updatePost(Post post, long postId) {
        Post findPost = findVerifiedPost(post.getId());

        Optional.ofNullable(post.getId())
                .ifPresent(name -> findPost.setId(name));
        Optional.ofNullable(post.getTitle())
                .ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(post.getContents())
                .ifPresent(content -> findPost.setContents(content));

        Post savedPost = postRepository.save(findPost);

        return savedPost;
    }

    public Post findPost(long postId) {
        return findVerifiedPost(postId);
    }

    public List<Post> findPosts() {
        return null;
    }

    public void deletePost(long postId) {
        post

    }
}

