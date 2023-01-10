package animalsquad.server.domain.infomap.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

@Getter
public enum InfoMapCategory {
    CAFE("카페"),
    PARK("공원"),
    RESTAURANT("음식점"),
    POOL("수영장"),
    CAMPING("캠핑"),
    HOSPITAL("병원");

    @Getter
    private final String categoryName;

    InfoMapCategory(String name) {
        this.categoryName = name;
    }

    @JsonCreator
    public static InfoMapCategory from(String name) {
        for (InfoMapCategory value : InfoMapCategory.values()) {
            if(value.getCategoryName().equals(name)) {
                return value;
            }
        }

        return null;
    }



}
