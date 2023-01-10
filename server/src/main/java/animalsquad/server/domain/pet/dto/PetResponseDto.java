package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.address.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PetResponseDto {
    private String petName;
    private int code;
    private String profileImage;
    private int age;
    private String gender;
}
