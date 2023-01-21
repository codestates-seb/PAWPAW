package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.infomap.dto.InfoMapDetailsResponseDto;
import animalsquad.server.domain.pet.entity.Gender;
import animalsquad.server.domain.pet.entity.Species;
import animalsquad.server.global.dto.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PetResponseDto {
    private String petName;
    private int code;
    private String profileImage;
    private int age;
    private Gender gender;
    private Species species;
//    private List<Post> posts;
//    private PageInfo pageInfo;
}
