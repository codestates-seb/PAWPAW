package animalsquad.server.domain.address.entity;

import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.global.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Address extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private Integer code;
    private String name;
    @OneToOne(mappedBy = "address")
    private Pet pet;
    @OneToMany(mappedBy = "address")
    private List<InfoMap> infoMaps = new ArrayList<>();

}
