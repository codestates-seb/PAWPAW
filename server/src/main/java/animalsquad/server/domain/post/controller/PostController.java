package animalsquad.server.domain.post.controller;

import animalsquad.server.domain.post.dto.PostDto;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.mapper.PostMapper;
import animalsquad.server.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping
@Validated
public class PostController {

    private final PostService postService;

    private final PostMapper mapper;

    @PostMapping("/posts")
    public ResponseEntity postPost(@Valid PostDto postDto) throws IllegalAccessException{
        Post post = postService.createPost(mapper.postToPost(postDto));
        return new ResponseEntity<PostDto>(postDto, HttpStatus.CREATED);
    }

    @PatchMapping("/posts/{post-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") long id,
                                    PostPatchDto postPatchDto) throws IllegalAccessException {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity getPost() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/posts/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") long id {
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/posts/{post-id}")
    public ResponseEntity getdetailPost() {
        return new ResponseEntity(HttpStatus.OK);

    }
}
