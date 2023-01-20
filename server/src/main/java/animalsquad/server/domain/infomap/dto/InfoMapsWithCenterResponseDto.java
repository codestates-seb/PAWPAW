package animalsquad.server.domain.infomap.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class InfoMapsWithCenterResponseDto {

    private Center center;
    private List<InfoMapsResponseDto> maps;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Center {
        private BigDecimal centerLatitude;
        private BigDecimal centerLongitude;
    }
}
