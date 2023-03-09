package animalsquad.server.domain.post.dto;

import animalsquad.server.domain.pet.entity.Gender;
import animalsquad.server.domain.pet.entity.PetStatus;
import animalsquad.server.global.dto.PageInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
public class PostsResponseDto {

    private List<FriendsDto> friends;
    private List<PostResponseDto> posts;
    private PageInfo pageInfo;

    public PostsResponseDto(List<FriendsDto> friendsDto, List<PostResponseDto> postResponseDtos, Page page) {
        this.friends = friendsDto;
        this.posts = postResponseDtos;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }

    @Getter
    @Setter
    public static class PostResponseDto {
        private long id;
        private String title;
        private String content;
        private String createdAt;
        private long petId;
        private String petName;
        private PetStatus petStatus;
        private int likesCnt;
        private int commentCnt;
        private int code;
    }

    @Getter
    @Setter
    public static class FriendsDto {
        private long petId;
        private String profileImageUrl;
        private String petName;
        private int petAge;
        private Gender gender;
        private String addressName;
    }
}
