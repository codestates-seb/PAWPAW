package animalsquad.server.domain.pet.dto;

import animalsquad.server.domain.pet.entity.Gender;
import animalsquad.server.domain.pet.entity.Species;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class PetPatchDto {

    private long id;
    private String petName;
    private Integer age;
    private Gender gender;
    private Species species;
    private Integer code;
    private MultipartFile profileImage;

}
