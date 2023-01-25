package animalsquad.server.domain.pet.entity;


import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.infomap.entity.InfoMapComment;
import animalsquad.server.domain.pet.repository.PetRepository;
import animalsquad.server.domain.petmap.entity.PetMap;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostComment;
import animalsquad.server.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.websocket.OnOpen;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Pet extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String loginId;
    @Column(nullable = false)
    private String password;
    @Column(length = 30, nullable = false)
    private String petName;
    private Integer age;
    @Column(length = 6)
    @Enumerated(EnumType.STRING)    // 실제 DB에 varchar 타입의 컬럼 생상
    private Gender gender;
    @Column(length = 3)
    @Enumerated(EnumType.STRING)
    private Species species;
    private String profileImage;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ADDRESS_ID")
    private Address address;

    @OneToMany(mappedBy = "pet")
    private List<InfoMapComment> infoMapComments = new ArrayList<>();

    @OneToMany(mappedBy = "pet")
    private List<PetMap> petMaps = new ArrayList<>();

    @OneToMany(mappedBy = "pet")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "pet")
    private List<PostComment> postComments = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}
