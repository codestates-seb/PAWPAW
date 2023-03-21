package animalsquad.server.domain.post.dto;

import animalsquad.server.domain.pet.entity.PetStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostDetailsResponseDto {

    private PostResponseDto post;
    private List<CommentDto> comments;

    public PostDetailsResponseDto(PostResponseDto postResponseDto, List<CommentDto> comments) {
        this.post = postResponseDto;
        this.comments = comments;
    }


    @Getter
    @Setter
    public static class PostResponseDto {
        private long authorId;
        private long postId;
        private String title;
        private String content;
        private List<String> imageUrl;
        private String petName;
        private PetStatus petStatus;
        private int likesCnt;
        private String createdAt;
        private boolean isLikeActive;
    }
    @Getter
    @Setter
    public static class CommentDto {
        private long commentId;
        private long petId;
        private String petName;
        private PetStatus petStatus;
        private String content;
        private String profileImageUrl;
        private String createdAt;
    }
}
