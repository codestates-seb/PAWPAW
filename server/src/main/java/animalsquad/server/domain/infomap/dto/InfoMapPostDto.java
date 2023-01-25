package animalsquad.server.domain.infomap.dto;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.infomap.entity.InfoMapCategory;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
public class InfoMapPostDto {
    private String name;

    private int code;

    private InfoMapCategory category;

    private String homepage;

    private MultipartFile file;

    private String mapAddress;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String operationTime;

    private String tel;

}
