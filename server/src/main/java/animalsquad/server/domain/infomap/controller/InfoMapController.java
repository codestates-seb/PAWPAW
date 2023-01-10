package animalsquad.server.domain.infomap.controller;


import animalsquad.server.domain.infomap.dto.InfoMapCommentPostDto;
import animalsquad.server.domain.infomap.dto.InfoMapPostDto;
import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapComment;
import animalsquad.server.domain.infomap.mapper.InfoMapMapper;
import animalsquad.server.domain.infomap.service.InfoMapCommentService;
import animalsquad.server.domain.infomap.service.InfoMapService;
import animalsquad.server.domain.pet.entity.Pet;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/maps")
@RequiredArgsConstructor
public class InfoMapController {

    private final InfoMapService infoMapService;
    private final InfoMapCommentService infoMapCommentService;
    private final InfoMapMapper mapper;

    @GetMapping
    public ResponseEntity getMaps(@RequestHeader("Authorization") String token, @RequestParam(defaultValue = "none") String filter) {

        List<InfoMap> infos = infoMapService.findInfos(token,filter.toUpperCase());
        return new ResponseEntity(mapper.infoMapsToResponseDto(infos), HttpStatus.OK);
    }

    //테스트용 post
    @PostMapping
    public ResponseEntity postMaps(@RequestBody InfoMapPostDto infoMapPostDto) {
        InfoMap infoMap = mapper.postDtoToInfoMap(infoMapPostDto);

        infoMapService.createMaps(infoMap);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/review")
    private ResponseEntity postContent(@RequestBody InfoMapCommentPostDto infoMapCommentPostDto,
                                       @RequestHeader("Authorization") String token) {
        InfoMapComment infoMapComment = mapper.infoMapCommentPostToInfoMap(infoMapCommentPostDto);
        InfoMapComment comment = infoMapCommentService.createComment(infoMapComment, token);

        return new ResponseEntity(HttpStatus.CREATED);
    }
}
