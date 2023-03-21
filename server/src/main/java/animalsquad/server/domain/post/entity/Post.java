package animalsquad.server.domain.post.entity;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.global.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Post extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PET_ID")
    private Pet pet;

    @Column(length = 50, nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String contents;

    private int likesCnt;

    private int code;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostComment> postComments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostImage> postImages = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostLikes> postLikes = new ArrayList<>();

}
