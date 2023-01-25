package animalsquad.server.domain.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostPatchDto {

    private long id;
    private String title;
    private String content;

    private List<MultipartFile> file;

}
