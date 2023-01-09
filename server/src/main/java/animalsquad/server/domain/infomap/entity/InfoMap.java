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

    private BigDecimal latitude;
    private BigDecimal longitude;

    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ADDRESS_ID")
    private Address address;

    @OneToMany(mappedBy = "infoMap")
    private List<InfoMapComment> infoMapComments = new ArrayList<>();

    @OneToMany(mappedBy = "infoMap")
    private List<PetMap> petMaps = new ArrayList<>();

}
