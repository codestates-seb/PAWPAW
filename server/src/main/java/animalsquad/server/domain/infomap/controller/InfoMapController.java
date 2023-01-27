package animalsquad.server.domain.infomap.controller;


import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.address.service.AddressService;
import animalsquad.server.domain.infomap.dto.InfoMapCommentPatchDto;
import animalsquad.server.domain.infomap.dto.InfoMapCommentPostDto;
import animalsquad.server.domain.infomap.dto.InfoMapPostDto;
import animalsquad.server.domain.infomap.dto.InfoMapsResponseDto;
import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapComment;
import animalsquad.server.domain.infomap.mapper.InfoMapCommentsMapper;
import animalsquad.server.domain.infomap.mapper.InfoMapMapper;
import animalsquad.server.domain.infomap.service.InfoMapCommentService;
import animalsquad.server.domain.infomap.service.InfoMapService;
import animalsquad.server.global.auth.userdetails.PetDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final AddressService addressService;

    @GetMapping("/{code}")
    public ResponseEntity getMaps(@PathVariable("code") int code,
                                  @RequestParam(defaultValue = "none") String filter) {
        filter = filter.toUpperCase();
        List<InfoMap> infos = infoMapService.findInfos(code, filter);
        List<InfoMapsResponseDto> infoMapsResponseDtos = infoMapMapper.infoMapsToResponseDto(infos);
        if (filter.equals("NONE")) {
            Address address = addressService.findAddressByCode(code);
            return new ResponseEntity(infoMapMapper.infoMapsToWithCenterResponseDto(infoMapsResponseDtos, address), HttpStatus.OK);
        }
        return new ResponseEntity(infoMapsResponseDtos, HttpStatus.OK);
    }

    @GetMapping("/mypick")
    public ResponseEntity getMyPick(@AuthenticationPrincipal PetDetailsService.PetDetails principal) {
        long id = principal.getId();
        List<InfoMap> infos = infoMapService.findMyPicks(id);
        return new ResponseEntity(infoMapMapper.infoMapsToResponseDto(infos), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postMaps(InfoMapPostDto infoMapPostDto) throws IllegalAccessException {
        InfoMap infoMap = infoMapMapper.postDtoToInfoMap(infoMapPostDto);

        infoMapService.createMaps(infoMap, infoMapPostDto.getFile());

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/admin/{info-map-id}")
    public ResponseEntity patchMapImage(@PathVariable("info-map-id") long mapId, MultipartFile file) throws IllegalAccessException {
        infoMapService.imageUpload(mapId, file);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/review")
    public ResponseEntity postContent(@RequestBody @Valid InfoMapCommentPostDto infoMapCommentPostDto,
                                      @AuthenticationPrincipal PetDetailsService.PetDetails principal) {
        long petId = principal.getId();
        InfoMapComment comment = infoMapCommentService.createComment(infoMapCommentsMapper.infoMapCommentPostToInfoMap(infoMapCommentPostDto), petId);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/review/{review-id}")
    public ResponseEntity patchContent(@RequestBody @Valid InfoMapCommentPatchDto infoMapCommentPatchDto,
                                       @AuthenticationPrincipal PetDetailsService.PetDetails principal,
                                       @PathVariable("review-id") long commentId) {
        infoMapCommentPatchDto.setCommentId(commentId);
        long petId = principal.getId();
        InfoMapComment infoMapComment1 = infoMapCommentService.updateComment(infoMapCommentsMapper.infoMapCommentPatchToInfoMap(infoMapCommentPatchDto), petId);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/review/{review-id}")
    public ResponseEntity deleteContent(@PathVariable("review-id") long commentId,
                                        @AuthenticationPrincipal PetDetailsService.PetDetails principal) {
        long petId = principal.getId();
        infoMapCommentService.deleteComment(commentId, petId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/details/{info-map-id}")
    public ResponseEntity getInfoMapDetails(@PathVariable("info-map-id") long infoMapId,
                                            @Positive @RequestParam(defaultValue = "1") int page,
                                            @Positive @RequestParam(defaultValue = "15") int size,
                                            @AuthenticationPrincipal PetDetailsService.PetDetails principal) {
        InfoMap infoMap = infoMapService.findMapDetails(infoMapId);
        long petId = principal.getId();
        Page<InfoMapComment> pagedComment = infoMapCommentService.findAllWithInfoMapId(page - 1, size, infoMapId);

        return new ResponseEntity<>(infoMapMapper.infoMapsToDetailsResponseDto(infoMap, pagedComment, petId), HttpStatus.OK);
    }
}
