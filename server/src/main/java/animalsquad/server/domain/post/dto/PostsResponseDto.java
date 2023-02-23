package animalsquad.server.domain.post.dto;

import animalsquad.server.global.dto.PageInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
public class PostsResponseDto {

    private List<PostResponseDto> posts;
    private PageInfo pageInfo;

    public PostsResponseDto(List<PostResponseDto> postResponseDtos, Page page) {
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
        private int likesCnt;
    }
}
