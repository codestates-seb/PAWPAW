package animalsquad.server.domain.post.mapper;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.post.dto.PostLikesDto;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostLikes;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostLikesMapper {

    default PostLikes postLikesDtoToPostLikes(PostLikesDto postLikesDto,long postId) {
        PostLikes postLikes = new PostLikes();
        Pet pet = new Pet();
        pet.setId(postLikesDto.getPetId());

        Post post = new Post();
        post.setId(postId);

        postLikes.setPet(pet);
        postLikes.setPost(post);
        postLikes.setStatus(postLikesDto.getStatus());

        return postLikes;
    }
}
