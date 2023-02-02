package animalsquad.server.domain.post.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostCommentResponseDto {

    private long postId;
    private String contents;
    private String imageUrl;
    @CreatedDate
    private LocalDateTime createdAt;


}
