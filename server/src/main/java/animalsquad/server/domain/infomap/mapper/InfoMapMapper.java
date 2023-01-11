package animalsquad.server.domain.infomap.mapper;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.infomap.dto.InfoMapPostDto;
import animalsquad.server.domain.infomap.dto.InfoMapsResponseDto;
import animalsquad.server.domain.infomap.entity.InfoMap;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface InfoMapMapper {

    default InfoMap postDtoToInfoMap(InfoMapPostDto infoMapPostDto) {
        InfoMap infoMap = new InfoMap();
        Address address = new Address();

        address.setId(infoMapPostDto.getAddressId());
        infoMap.setName(infoMapPostDto.getName());
        infoMap.setLatitude(infoMapPostDto.getLatitude());
        infoMap.setLongitude(infoMapPostDto.getLongitude());
        infoMap.setCategory(infoMapPostDto.getCategory());

        return infoMap;
    }

    default List<InfoMapsResponseDto> infoMapsToResponseDto(List<InfoMap>infoMaps) {
        return infoMaps.stream()
                .map(infoMap -> {
                    InfoMapsResponseDto infoMapsResponseDto = new InfoMapsResponseDto();
                    infoMapsResponseDto.setName(infoMap.getName());
                    infoMapsResponseDto.setCategory(infoMap.getCategory().getCategoryName());
                    infoMapsResponseDto.setLongitude(infoMap.getLongitude());
                    infoMapsResponseDto.setLatitude(infoMap.getLatitude());
                    infoMapsResponseDto.setId(infoMap.getId());

                    return infoMapsResponseDto;
                }).collect(Collectors.toList());
    }


}
