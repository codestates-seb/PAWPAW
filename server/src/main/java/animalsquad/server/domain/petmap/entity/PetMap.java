package animalsquad.server.domain.petmap.entity;

import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.global.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(name = "myPlace", columnNames = {"PET_ID", "INFO_MAP_ID"}))
public class PetMap extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PET_ID")
    private Pet pet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "INFO_MAP_ID")
    private InfoMap infoMap;

}
