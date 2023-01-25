package animalsquad.server.domain.post.controller;

import animalsquad.server.domain.post.dto.PostDto;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.mapper.PostMapper;
import animalsquad.server.domain.post.service.PostService;
import animalsquad.server.global.auth.userdetails.PetDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    private final PostMapper mapper;

    @PostMapping
    public ResponseEntity postPost(@Valid PostDto postDto,
                                   @AuthenticationPrincipal PetDetailsService.PetDetails principal) throws IllegalAccessException {

        long petId = principal.getId();
        Post post = postService.createPost(mapper.postDtoToPost(postDto), postDto.getFile(), petId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

//    @PatchMapping("/{post-id}")
//    public ResponseEntity patchPost(@PathVariable("post-id") long id,
//                                    PostPatchDto postPatchDto) throws IllegalAccessException {
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @GetMapping("/posts")
//    public ResponseEntity getPost() {
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @DeleteMapping("/posts/{post-id}")
//    public ResponseEntity deletePost(@PathVariable("post-id") long id {
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
//    }
//
//    @GetMapping("/posts/{post-id}")
//    public ResponseEntity getdetailPost() {
//        return new ResponseEntity(HttpStatus.OK);
//
//    }
}
