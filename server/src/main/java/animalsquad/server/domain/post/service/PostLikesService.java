package animalsquad.server.domain.post.service;

import animalsquad.server.domain.pet.entity.Pet;
import animalsquad.server.domain.pet.service.PetService;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostLikes;
import animalsquad.server.domain.post.repository.PostLikesRepository;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostLikesService {

    private final PostLikesRepository likesRepository;
    private final PetService petService;
    private final PostService postService;

    public PostLikes postLikes(PostLikes postLikes, long petId) {
        if (petId != postLikes.getPet().getId()) {
            throw new BusinessLogicException(ExceptionCode.PET_NOT_FOUND);
        }

        Pet pet = petService.findPet(postLikes.getPet().getId());
        Post post = postService.findVerifiedPost(postLikes.getPost().getId());


        if (postLikes.getStatus() == 0) {
            PostLikes findPostLikes = findVerifiedPostLikes(pet.getId(), postLikes.getPost().getId());
            post.setLikesCnt(post.getLikesCnt() - 1);
            likesRepository.delete(findPostLikes);
        }else {
            findExistsPostLikes(pet.getId(),post.getId());
            postLikes.setPet(pet);
            postLikes.setPost(post);
            post.setLikesCnt(post.getLikesCnt() + 1);
            likesRepository.save(postLikes);
        }

        return postLikes;
    }


    private PostLikes findVerifiedPostLikes(long petId, long postId) {
        Optional<PostLikes> optionalPostLikes = likesRepository.findByPet_IdAndPost_Id(petId, postId);

        return optionalPostLikes.orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKES_NOT_FOUND));
    }

    private void findExistsPostLikes(long petId, long postId) {
        Optional<PostLikes> optionalPostLikes = likesRepository.findByPet_IdAndPost_Id(petId, postId);
        if(optionalPostLikes.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKED);
        }

    }
}
