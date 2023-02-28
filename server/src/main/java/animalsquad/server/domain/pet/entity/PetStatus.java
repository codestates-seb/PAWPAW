package animalsquad.server.domain.pet.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PetStatus {
    PET_ACTIVE("활동중"),
    PET_SLEEP("휴면 상태"),
    PET_QUIT("탈퇴 상태");

    @Getter
    private final String description;
}
