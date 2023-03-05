package animalsquad.server.domain.post.service;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.service.PetService;
import animalsquad.server.domain.post.dto.PostSearchDto;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostImage;
import animalsquad.server.domain.post.repository.PostRepository;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PetService petService;
    private final PostImageService postImageService;

    public Post createPost(Post post, List<MultipartFile> files, long id) {
        long petId = post.getPet().getId();

        if (petId != id) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }

        Pet pet = petService.findPet(petId);

        post.setPet(pet);
        post.setTitle(post.getTitle());
        post.setContents(post.getContents());
        post.setCode(pet.getAddress().getCode());

        if (files != null) {
            for (MultipartFile file : files) {
                if (file != null && !file.isEmpty()) {
                    postImageService.uploadImage(post, file);
                }
            }
        }
        return postRepository.save(post);
    }

    public Post updatePost(Post post, List<MultipartFile> files, long petId, Integer isDelete) {

        Post findPost = findVerifiedPost(post.getId());

        if (petId != findPost.getPet().getId()) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }

        Optional.ofNullable(post.getTitle())
                .ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(post.getContents())
                .ifPresent(content -> findPost.setContents(content));

        if (isDelete == 1) {
            List<PostImage> images = findPost.getPostImages();
            for (PostImage image : images) {
                postImageService.deleteImage(image);
            }
            if (files != null && !files.isEmpty()) {
                List<PostImage> postImages = postImageService.updateImage(post, files);
            }
        }
        Post savedPost = postRepository.save(findPost);

        return savedPost;
    }

//    public Page<Post> findPosts(int page, int size) {
//        return postRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
//    }

    public Page<Post> findPosts(int page, int size, PostSearchDto postSearchDto) {
        PageRequest pageRequest = PageRequest.of(page, size);
        String sort = postSearchDto.getSort();
        if(sort != null && sort.equals("Likes")) {
            return postRepository.getPostsSortByLikes(postSearchDto, pageRequest);
        }else {
            return postRepository.getPostsSortByNewest(postSearchDto, pageRequest);
        }
    }

    public Post findPost(long postId) {
        return findVerifiedPost(postId);
    }

    public void deletePost(long petId, long postId) {
        Post findPost = findVerifiedPost(postId);
        if (petId != findPost.getPet().getId()) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_AND_ID_NOT_MATCH);
        }

        postRepository.deleteById(postId);
    }

    public Post findVerifiedPost(long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);

        return optionalPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }
}



