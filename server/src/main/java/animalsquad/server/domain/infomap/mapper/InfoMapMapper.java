package animalsquad.server.domain.infomap.mapper;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.infomap.dto.InfoMapDetailsResponseDto;
import animalsquad.server.domain.infomap.dto.InfoMapPostDto;
import animalsquad.server.domain.infomap.dto.InfoMapsResponseDto;
import animalsquad.server.domain.infomap.dto.InfoMapsWithCenterResponseDto;
import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapComment;
import animalsquad.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface InfoMapMapper {

    default InfoMap postDtoToInfoMap(InfoMapPostDto infoMapPostDto) {
        InfoMap infoMap = new InfoMap();
        Address address = new Address();
        address.setCode(infoMapPostDto.getCode());

        infoMap.setCategory(infoMapPostDto.getCategory());
        infoMap.setHomepage(infoMapPostDto.getHomepage());
//        infoMap.setImageUrl(infoMapPostDto.getImageUrl());
        infoMap.setLatitude(infoMapPostDto.getLatitude());
        infoMap.setLongitude(infoMapPostDto.getLongitude());
        infoMap.setMapAddress(infoMapPostDto.getMapAddress());
        infoMap.setName(infoMapPostDto.getName());
        infoMap.setOperationTime(infoMapPostDto.getOperationTime());
        infoMap.setTel(infoMapPostDto.getTel());
        infoMap.setAddress(address);

        return infoMap;
    }

    default List<InfoMapsResponseDto> infoMapsToResponseDto(List<InfoMap> infoMaps) {
        return infoMaps.stream()
                .map(infoMap -> {
                    InfoMapsResponseDto infoMapsResponseDto = new InfoMapsResponseDto();
                    infoMapsResponseDto.setName(infoMap.getName());
                    infoMapsResponseDto.setCategory(infoMap.getCategory().getCategoryName());
                    infoMapsResponseDto.setLongitude(infoMap.getLongitude());
                    infoMapsResponseDto.setLatitude(infoMap.getLatitude());
                    infoMapsResponseDto.setId(infoMap.getId());
                    infoMapsResponseDto.setCode(infoMap.getAddress().getCode());

                    return infoMapsResponseDto;
                }).collect(Collectors.toList());
    }

    default InfoMapsWithCenterResponseDto infoMapsToWithCenterResponseDto(List<InfoMapsResponseDto> responseDtos, Address address) {
        InfoMapsWithCenterResponseDto.Center center = new InfoMapsWithCenterResponseDto.Center(address.getLatitude(),address.getLongitude());

        return new InfoMapsWithCenterResponseDto(center, responseDtos);
    }

    default InfoMapDetailsResponseDto.Details setDetails(InfoMap infoMap, long petId) {
        InfoMapDetailsResponseDto.Details details = new InfoMapDetailsResponseDto.Details();
        details.setInfoUrl(infoMap.getImageUrl());
        details.setCategory(infoMap.getCategory().getCategoryName());
        details.setName(infoMap.getName());
        details.setOperationTime(infoMap.getOperationTime());
        details.setTel(infoMap.getTel());
        details.setMapAddress(infoMap.getMapAddress());
        details.setMyPick(infoMap.getPetMaps().stream()
                .anyMatch(petMap -> {
                    return petMap.getPet().getId() == petId;
                }));
        details.setHomepage(infoMap.getHomepage());

        return details;
    }

    default List<InfoMapDetailsResponseDto.Reviews> setReviews(List<InfoMapComment> comments) {
        return comments.stream()
                .map(comment -> {
                    InfoMapDetailsResponseDto.Reviews reviews = new InfoMapDetailsResponseDto.Reviews();
                    Pet pet = comment.getPet();
                    reviews.setPetId(pet.getId());
                    reviews.setProfileImage(pet.getProfileImage());
                    reviews.setPetName(pet.getPetName());
                    reviews.setContents(comment.getContents());
                    reviews.setCreatedAt(comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd")));
                    reviews.setCommentId(comment.getId());

                    return reviews;
                }).collect(Collectors.toList());
    }


    default InfoMapDetailsResponseDto infoMapsToDetailsResponseDto(InfoMap infoMap, Page<InfoMapComment> pagedComments, long petId) {
        List<InfoMapComment> comments = pagedComments.getContent();
        InfoMapDetailsResponseDto.Details details = setDetails(infoMap, petId);
        List<InfoMapDetailsResponseDto.Reviews> reviews = setReviews(comments);

        return new InfoMapDetailsResponseDto(details, reviews, pagedComments);
    }
}
