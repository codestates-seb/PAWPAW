package animalsquad.server.domain.post.mapper;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.post.dto.PostDetailsResponseDto;
import animalsquad.server.domain.post.dto.PostDto;
import animalsquad.server.domain.post.dto.PostPatchDto;
import animalsquad.server.domain.post.dto.PostsResponseDto;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostImage;
import animalsquad.server.domain.post.entity.PostLikes;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

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


    default PostsResponseDto postsToPostsResponseDto(Page<Post> posts, List<Pet> friends) {
        List<Post> contents = posts.getContent();

        List<PostsResponseDto.PostResponseDto> responseDtos = contents.stream()
                .map(content -> {
                    PostsResponseDto.PostResponseDto postResponseDto = new PostsResponseDto.PostResponseDto();
                    postResponseDto.setId(content.getId());
                    postResponseDto.setTitle(content.getTitle());
                    postResponseDto.setContent(content.getContents());
                    postResponseDto.setCreatedAt(content.getCreatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd")));
                    postResponseDto.setPetId(content.getPet().getId());
                    postResponseDto.setPetName(content.getPet().getPetName());
                    postResponseDto.setLikesCnt(content.getLikesCnt());
                    postResponseDto.setCommentCnt(content.getPostComments().size());
                    postResponseDto.setCode(content.getCode());
                    postResponseDto.setPetStatus(content.getPet().getPetStatus());

                    return postResponseDto;
                }).collect(Collectors.toList());

        List<PostsResponseDto.FriendsDto> friendsDtos = friends.stream()
                .map(friend -> {
                    PostsResponseDto.FriendsDto friendsDto = new PostsResponseDto.FriendsDto();
                    friendsDto.setPetId(friend.getId());
                    friendsDto.setProfileImageUrl(friend.getProfileImage());
                    friendsDto.setPetName(friend.getPetName());
                    friendsDto.setPetAge(friend.getAge());
                    friendsDto.setGender(friend.getGender());
                    friendsDto.setAddressName(friend.getAddress().getName());

                    return friendsDto;
                }).collect(Collectors.toList());

        return new PostsResponseDto(friendsDtos,responseDtos, posts);
    }

    default PostDetailsResponseDto postToPostDetailsDto(Post post, long petId) {
        PostDetailsResponseDto.PostResponseDto postResponseDto = new PostDetailsResponseDto.PostResponseDto();
        postResponseDto.setAuthorId(post.getPet().getId());
        postResponseDto.setPostId(post.getId());
        postResponseDto.setTitle(post.getTitle());
        postResponseDto.setContent(post.getContents());
        List<String> images = post.getPostImages().stream()
                .map(PostImage::getImageUrl)
                .collect(Collectors.toList());
        postResponseDto.setImageUrl(images);
        postResponseDto.setPetName(post.getPet().getPetName());
        postResponseDto.setPetStatus(post.getPet().getPetStatus());
        postResponseDto.setCreatedAt(post.getCreatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd")));
        postResponseDto.setLikesCnt(post.getLikesCnt());
        List<PostLikes> postLikes = post.getPostLikes();
        postResponseDto.setLikeActive(postLikes.stream()
                .anyMatch(postLike -> postLike.getPet().getId() == petId));

        List<PostDetailsResponseDto.CommentDto> commentDto = post.getPostComments().stream()
                .map(postComment -> {
                    PostDetailsResponseDto.CommentDto comment = new PostDetailsResponseDto.CommentDto();
                    Pet pet = postComment.getPet();
                    comment.setCommentId(postComment.getId());
                    comment.setPetId(pet.getId());
                    comment.setPetName(pet.getPetName());
                    comment.setPetStatus(pet.getPetStatus());
                    comment.setContent(postComment.getContents());
                    comment.setProfileImageUrl(pet.getProfileImage());
                    comment.setCreatedAt(postComment.getCreatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd")));
                    return comment;
                }).collect(Collectors.toList());
        return new PostDetailsResponseDto(postResponseDto,commentDto);
    }


}
