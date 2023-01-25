package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.infomap.dto.InfoMapDetailsResponseDto;
import animalsquad.server.domain.infomap.entity.InfoMapComment;
import animalsquad.server.domain.pet.entity.Gender;
import animalsquad.server.domain.pet.entity.Species;
import animalsquad.server.global.dto.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetResponseDto {
    private PetInfo petInfo;
    private List<MyPosts> myPosts;
    private PageInfo pageInfo;

    public PetResponseDto(PetInfo petInfo, List<MyPosts> myPosts, Page page) {
        this.petInfo = petInfo;
        this.myPosts = myPosts;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
    @Getter
    @Setter
    public static class PetInfo {
        private String petName;
        private int code;
        private String profileImage;
        private int age;
        private Gender gender;
        private Species species;
    }

    @Getter
    @Setter
    public static class MyPosts {
        private long postId;
        private String petName;
        private String title;
        private String contents;
        private String createdAt;
        private int likesCnt;

    }

}
