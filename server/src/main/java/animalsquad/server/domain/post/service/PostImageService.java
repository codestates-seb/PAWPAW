package animalsquad.server.domain.post.service;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostImage;
import animalsquad.server.domain.post.repository.PostImageRepository;
import animalsquad.server.global.s3.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class PostImageService {

    private final FileUploadService fileUploadService;
    private final PostImageRepository postImageRepository;

    private static final String folderName = "post";

    public PostImage uploadImage(Post post, MultipartFile file) throws IllegalAccessException {
        String imageUrl = fileUploadService.uploadImage(file, folderName);
        PostImage postImage = new PostImage();
        postImage.setImageUrl(imageUrl);
        postImage.setPost(post);
        postImage.setOriginalFileName(file.getOriginalFilename());

        PostImage result = postImageRepository.save(postImage);

        return result;
    }
}
