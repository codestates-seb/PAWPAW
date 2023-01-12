package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.pet.entity.Gender;
import animalsquad.server.domain.pet.entity.Species;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PetPatchDto {

    private long id;
    private String petName;
    private int age;
    private Gender gender;
    private Species species;
    private int code;
    private String profileImage;

}
