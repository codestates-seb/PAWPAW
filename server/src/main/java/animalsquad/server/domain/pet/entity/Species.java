package animalsquad.server.domain.pet.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Species {
    DOG("강아지"),
    CAT("고양이");

    @Getter
    private final String description;

}
