package animalsquad.server.domain.petmap.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class MyPlaceDto {

    @Positive(message = "0보다 커야합니다.")
    private long petId;

    @Positive(message = "0보다 커야합니다.")
    private long infoMapId;
}
