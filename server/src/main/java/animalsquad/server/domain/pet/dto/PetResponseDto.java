package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.pet.entity.Gender;
import animalsquad.server.domain.pet.entity.Species;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
