package animalsquad.server.domain.post.dto;

import animalsquad.server.domain.post.entity.VoteStatus;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostResponseDto {

    private long petId;

    private String title;

    private String contents;

    private VoteStatus voteStatus;

    @CreatedDate
    private LocalDateTime createdAt;
}
