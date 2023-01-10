package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.address.entity.Address;
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
    private Address address;
    private String profileImage;
    private int age;
    private String gender;
}
