package animalsquad.server.domain.infomap.dto;

import animalsquad.server.global.dto.PageInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class InfoMapDetailsResponseDto {

    private Details details;
    private List<Reviews> reviews;
    private PageInfo pageInfo;


    public InfoMapDetailsResponseDto(Details details, List<Reviews> reviews, Page page) {
        this.details = details;
        this.reviews = reviews;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }

    @Getter
    @Setter
    public static class Details {
        private String infoUrl;
        private String name;
        private String mapAddress;
        private String category;
        private boolean isMyPick;
        private String operationTime;
        private String tel;
        private String homepage;
    }

    @Getter
    @Setter
    public static class Reviews {
        private long petId;
        private long commentId;
        private String profileImage;
        private String petName;
        private String contents;
        private String createdAt;
    }
}
