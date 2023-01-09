package animalsquad.server.domain.pet.entity;


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
public class Pet extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long petId;

    private String loginId;
    private String password;
    private String petName;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}
