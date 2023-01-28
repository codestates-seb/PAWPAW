package animalsquad.server.domain.infomap.dto;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.infomap.entity.InfoMapCategory;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
public class InfoMapPostDto {
    @NotBlank(message = "장소 이름을 입력해 주세요")
    private String name;
    @NotNull(message = "지역코드를 입력해 주세요")
    private Integer code;

    @NotNull(message = "카테고리를 선택해 주세요")
    private InfoMapCategory category;

    private String homepage;

    private MultipartFile file;
    @NotBlank(message = "주소를 입력해 주세요")
    private String mapAddress;

    @NotNull(message = "위도를 입력해 주세요")
    private BigDecimal latitude;
    @NotNull(message = "경도를 입력해 주세요")
    private BigDecimal longitude;

    private String operationTime;

    private String tel;

}
