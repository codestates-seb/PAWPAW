package animalsquad.server.domain.infomap.dto;

import animalsquad.server.domain.infomap.entity.InfoMapCategory;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class InfoMapPostDto {

    private String name;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private InfoMapCategory category;

    private long addressId;
}
