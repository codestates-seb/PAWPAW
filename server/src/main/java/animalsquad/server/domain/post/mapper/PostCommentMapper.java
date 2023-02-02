package animalsquad.server.domain.post.mapper;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.post.dto.PostCommentPatchDto;
import animalsquad.server.domain.post.dto.PostCommentPostDto;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostComment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostCommentMapper {

    default PostComment postCommentPostDtoToPost(PostCommentPostDto postCommentPostDto) {
        Post post = new Post();
        Pet pet = new Pet();

        PostComment postComment = new PostComment();

        pet.setId(postCommentPostDto.getPetId());
        post.setId(postCommentPostDto.getPostId());

        postComment.setPet(pet);
        postComment.setPost(post);
        postComment.setContents(postCommentPostDto.getContents());
        return postComment;
    }

    default PostComment postCommentPatchToPost(PostCommentPatchDto postCommentPatchDto) {
        Pet pet = new Pet();
        PostComment postComment = new PostComment();

        pet.setId(postCommentPatchDto.getPetId());

        postComment.setPet(pet);
        postComment.setId(postCommentPatchDto.getCommentId());
        postComment.setContents(postCommentPatchDto.getContents());

        return postComment;
    }

}
