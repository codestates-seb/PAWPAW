package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.address.entity.Address;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PetPatchDto {

    private long id;
    private String petName;
    private int age;
    private String gender;
    private int code;
    private String profileImage;

}
