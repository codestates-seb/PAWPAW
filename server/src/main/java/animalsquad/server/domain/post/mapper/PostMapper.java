package animalsquad.server.domain.post.mapper;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.post.dto.*;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostComment;
import animalsquad.server.domain.post.entity.PostImage;
import animalsquad.server.global.audit.Auditable;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostMapper {

    default Post postDtoToPost(PostDto postDto) {
        Post post = new Post();
        Pet pet = new Pet();

        pet.setId(postDto.getPetId());
        post.setPet(pet);
        post.setTitle(postDto.getTitle());
        post.setContents(postDto.getContent());

        return post;
    }

    default Post patchDtoToPost(PostPatchDto postPatchDto) {
        Post post = new Post();

        post.setId(postPatchDto.getId());
        post.setTitle(postPatchDto.getTitle());
        post.setContents(postPatchDto.getContent());

        return post;
    }

//    default PostCommentPatchDto postCommentPatchToPost(PostCommentPatchDto postCommentPatchDto) {
//        Post post = new Post();
//        PostComment postComment = new PostComment();
//        PostCommentPatchDto postCommentPatchDto = new PostCommentPatchDto();
//
//        postCommentPatchDto.setCommentId(postComment.getId());
//        postCommentPatchDto.setContents(postComment.getContents());
//
//        return postCommentPatchDto;
//    }
//
//    default PostCommentResponseDto postCommentToResponseDto(PostCommentResponseDto postCommentResponseDto) {
//        PostComment postComment= new PostComment();
//        PostImage postImage = new PostImage();
//        PostCommentResponseDto postCommentResponseDto = new PostCommentResponseDto();
//
//        postCommentResponseDto.setPostId(postComment.getId());
//        postCommentResponseDto.setContents(postComment.getContents());
//        postCommentResponseDto.setCreatedAt(postComment.getCreatedAt());
//        postCommentResponseDto.setImageUrl(postImage.getImageUrl());
//
//        return postCommentResponseDto;
//    }
//
//    default PostCommentPostDto postCommentPostDto(PostCommentPostDto postCommentPostDto) {
//        Post post = new Post();
//        PostCommentPostDto postCommentPostDto = new PostCommentPostDto();
//
//        postCommentPostDto.setPostId(post.getId());
//        postCommentPostDto.setContents(post.getContents());
//
//        return postCommentPostDto;
//    }
}
