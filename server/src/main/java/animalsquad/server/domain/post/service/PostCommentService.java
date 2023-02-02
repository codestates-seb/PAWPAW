package animalsquad.server.domain.post.service;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.service.PetService;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostComment;
import animalsquad.server.domain.post.repository.PostCommentRepository;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostCommentService {

    private final PostCommentRepository postCommentRepository;
    private final PostService postService;
    private final PetService petService;

    public PostComment createComment(PostComment comment, long id) {
        long postId = comment.getPost().getId();
        long petId = comment.getPet().getId();

        if (id != petId) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }

        Pet pet = petService.findPet(petId);
        Post post = postService.findVerifiedPost(postId);

        comment.setPost(post);
        comment.setPet(pet);

        return postCommentRepository.save(comment);
    }

    public PostComment updateComment(PostComment comment, long id) {
        long petId = comment.getPet().getId();
        if (petId != id) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }

        long commentId = comment.getId();
        PostComment findComment = findVerifiedPostComment(commentId);

        Optional.ofNullable(comment.getContents())
                .ifPresent(findComment::setContents);

        PostComment result = postCommentRepository.save(findComment);

        return result;
    }

    public void deleteComment(long commentId, long petId) {
        PostComment findComment = findVerifiedPostComment(commentId);

        if(findComment.getPet().getId() != petId) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }

        postCommentRepository.delete(findComment);
    }

    public PostComment findVerifiedPostComment(long id) {
        return postCommentRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_COMMENT_NOT_FOUND));
    }
}
