package animalsquad.server.domain.infomap.dto;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.infomap.entity.InfoMapCategory;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
public class InfoMapPostDto {
    private String name;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private InfoMapCategory category;

    private String imageUrl;

    private String mapAddress;

    private long addressId;


    private String operationTime;

    private String tel;

    private String homepage;

}
