package animalsquad.server.domain.infomap.entity;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.petmap.entity.PetMap;
import animalsquad.server.global.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class InfoMap extends Auditable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Column(precision = 8, scale = 6)
    private BigDecimal latitude;
    @Column(precision = 9, scale = 6)
    private BigDecimal longitude;
    @Enumerated(EnumType.STRING)
    private InfoMapCategory category;

    @Column(name = "IMAGEURL")
    private String imageUrl;

    private String mapAddress;
    private String operationTime;
    private String tel;
    private String homepage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ADDRESS_ID")
    private Address address;

    @OneToMany(mappedBy = "infoMap")
    private List<InfoMapComment> infoMapComments = new ArrayList<>();

    @OneToMany(mappedBy = "infoMap")
    private List<PetMap> petMaps = new ArrayList<>();

}
