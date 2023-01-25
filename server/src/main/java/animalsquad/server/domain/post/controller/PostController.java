package animalsquad.server.domain.post.controller;

import animalsquad.server.domain.post.dto.*;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.domain.post.entity.PostComment;
import animalsquad.server.domain.post.entity.PostLikes;
import animalsquad.server.domain.post.mapper.PostCommentMapper;
import animalsquad.server.domain.post.mapper.PostLikesMapper;
import animalsquad.server.domain.post.mapper.PostMapper;
import animalsquad.server.domain.post.service.PostCommentService;
import animalsquad.server.domain.post.service.PostLikesService;
import animalsquad.server.domain.post.service.PostService;
import animalsquad.server.global.auth.userdetails.PetDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final PostCommentService postCommentService;

    private final PostLikesService likesService;

    private final PostMapper mapper;

    private final PostCommentMapper commentMapper;
    private final PostLikesMapper likesMapper;


    @PostMapping
    public ResponseEntity postPost(@Valid PostDto postDto,
                                   @AuthenticationPrincipal PetDetailsService.PetDetails principal) throws IllegalAccessException {

        long petId = principal.getId();
        Post post = postService.createPost(mapper.postDtoToPost(postDto), postDto.getFile(), petId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") long id, PostPatchDto postPatchDto,
                                    @AuthenticationPrincipal PetDetailsService.PetDetails principal) throws IllegalAccessException {
        postPatchDto.setId(id);

        Post post = mapper.patchDtoToPost(postPatchDto);
        long petId = principal.getId();
        postService.updatePost(post, postPatchDto.getFile(), petId);


        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity getPosts(@Positive @RequestParam(defaultValue = "1") int page,
                                   @Positive @RequestParam(defaultValue = "15") int size) {

        Page<Post> posts = postService.findPosts(page - 1, size);
        PostsResponseDto postsResponseDto = mapper.postsToPostsResponseDto(posts);
        return new ResponseEntity(postsResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") long postId,
                                  @AuthenticationPrincipal PetDetailsService.PetDetails principal) {

        Post post = postService.findPost(postId);
        long petId = principal.getId();
        PostDetailsResponseDto postDetailsResponseDto = mapper.postToPostDetailsDto(post, petId);

        return new ResponseEntity(postDetailsResponseDto, HttpStatus.OK);

    }

    //
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") long id,
                                     @AuthenticationPrincipal PetDetailsService.PetDetails principal) {
        long petId = principal.getId();
        postService.deletePost(petId, id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/comment")
    public ResponseEntity postComment(@Valid @RequestBody PostCommentPostDto commentPostDto,
                                      @AuthenticationPrincipal PetDetailsService.PetDetails principal) {
        PostComment postComment = commentMapper.postCommentPostDtoToPost(commentPostDto);
        long id = principal.getId();
        PostComment comment = postCommentService.createComment(postComment, id);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/comment/{post-comment-id}")
    public ResponseEntity patchComment(@PathVariable("post-comment-id") long commentId,
                                       @RequestBody PostCommentPatchDto commentPatchDto,
                                       @AuthenticationPrincipal PetDetailsService.PetDetails principal) {
        commentPatchDto.setCommentId(commentId);

        PostComment postComment = commentMapper.postCommentPatchToPost(commentPatchDto);
        long petId = principal.getId();
        PostComment result = postCommentService.updateComment(postComment, petId);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/comment/{post-comment-id}")
    public ResponseEntity deleteComment(@PathVariable("post-comment-id") long commentId,
                                        @AuthenticationPrincipal PetDetailsService.PetDetails principal) {
        long petId = principal.getId();
        postCommentService.deleteComment(commentId, petId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/likes/{post-id}")
    public ResponseEntity postLike(@PathVariable("post-id") long postId,
                                   @Valid @RequestBody PostLikesDto postLikesDto,
                                   @AuthenticationPrincipal PetDetailsService.PetDetails principal) {
        PostLikes postLikes = likesMapper.postLikesDtoToPostLikes(postLikesDto, postId);
        long id = principal.getId();
        PostLikes result = likesService.postLikes(postLikes, id);

        return new ResponseEntity(HttpStatus.OK);
    }
}
