package animalsquad.server.domain.infomap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class InfoMapsResponseDto {

    private long id;

    private String name;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String category;

}
