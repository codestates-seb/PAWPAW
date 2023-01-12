package animalsquad.server.domain.pet.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Gender {
    MALE("수컷"),
    FEMALE("암컷");

    @Getter
    private final String description;

}
