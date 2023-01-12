package animalsquad.server.domain.infomap.controller;


import animalsquad.server.domain.infomap.dto.InfoMapCommentPatchDto;
import animalsquad.server.domain.infomap.dto.InfoMapCommentPostDto;
import animalsquad.server.domain.infomap.dto.InfoMapPostDto;
import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapComment;
import animalsquad.server.domain.infomap.mapper.InfoMapCommentsMapper;
import animalsquad.server.domain.infomap.mapper.InfoMapMapper;
import animalsquad.server.domain.infomap.service.InfoMapCommentService;
import animalsquad.server.domain.infomap.service.InfoMapService;
import animalsquad.server.global.auth.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/maps")
@RequiredArgsConstructor
public class InfoMapController {

    private final InfoMapService infoMapService;
    private final InfoMapCommentService infoMapCommentService;
    private final InfoMapMapper infoMapMapper;
    private final InfoMapCommentsMapper infoMapCommentsMapper;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/{code}")
    public ResponseEntity getMaps(@PathVariable("code") int code,
                                  @RequestParam(defaultValue = "none") String filter) {

        List<InfoMap> infos = infoMapService.findInfos(code, filter.toUpperCase());
        return new ResponseEntity(infoMapMapper.infoMapsToResponseDto(infos), HttpStatus.OK);
    }

    @GetMapping("/mypick")
    public ResponseEntity getMyPick(@RequestHeader("Authorization") String token) {
        List<InfoMap> infos = infoMapService.findMyPicks(token);
        return new ResponseEntity(infoMapMapper.infoMapsToResponseDto(infos), HttpStatus.OK);
    }

    //테스트용 post
    @PostMapping
    public ResponseEntity postMaps(InfoMapPostDto infoMapPostDto) {
        InfoMap infoMap = infoMapMapper.postDtoToInfoMap(infoMapPostDto);

        infoMapService.createMaps(infoMap);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/review")
    public ResponseEntity postContent(@RequestBody @Valid InfoMapCommentPostDto infoMapCommentPostDto,
                                      @RequestHeader("Authorization") String token) {
        InfoMapComment comment = infoMapCommentService.createComment(infoMapCommentsMapper.infoMapCommentPostToInfoMap(infoMapCommentPostDto), token);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/review/{review-id}")
    public ResponseEntity patchContent(@RequestBody @Valid InfoMapCommentPatchDto infoMapCommentPatchDto,
                                       @RequestHeader("Authorization") String token,
                                       @PathVariable("review-id") long commentId) {
        infoMapCommentPatchDto.setCommentId(commentId);
        InfoMapComment infoMapComment1 = infoMapCommentService.updateComment(infoMapCommentsMapper.infoMapCommentPatchToInfoMap(infoMapCommentPatchDto), token);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/review/{review-id}")
    public ResponseEntity deleteContent(@PathVariable("review-id") long commentId, @RequestHeader("Authorization") String token) {
        infoMapCommentService.deleteComment(commentId, token);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/details/{info-map-id}")
    public ResponseEntity getInfoMapDetails(@PathVariable("info-map-id") long infoMapId,
                                            @Positive @RequestParam(defaultValue = "1") int page,
                                            @Positive @RequestParam(defaultValue = "15") int size,
                                            @RequestHeader("Authorization") String token) {
        InfoMap infoMap = infoMapService.findMapDetails(infoMapId);
        long petId = jwtTokenProvider.getPetId(token);
        Page<InfoMapComment> pagedComment = infoMapCommentService.findAllWithInfoMapId(page - 1, size, infoMapId);

        return new ResponseEntity<>(infoMapMapper.infoMapsToDetailsResponseDto(infoMap,pagedComment,petId),HttpStatus.OK);
    }


}
