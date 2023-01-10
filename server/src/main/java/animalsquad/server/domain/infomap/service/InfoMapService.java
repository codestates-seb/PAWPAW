package animalsquad.server.domain.infomap.service;

import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapCategory;
import animalsquad.server.domain.infomap.repository.InfoMapRepository;
import animalsquad.server.global.auth.jwt.JwtTokenProvider;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class InfoMapService {

    private final JwtTokenProvider jwtTokenProvider;
    private final InfoMapRepository infoMapRepository;

    public List<InfoMap> findInfos(String token,String filter) {
        token = jwtTokenProvider.resolveToken(token);

        long petId = jwtTokenProvider.getPetId(token);

        List<InfoMap> infoMaps = new ArrayList<>();

        switch(filter) {
            case "NONE" : infoMaps = infoMapRepository.findInfoMaps(petId); break;
            case "PARK" : case "CAFE" : case "RESTAURANT" : case  "POOL" : case "CAMPING" : case "HOSPITAL" :
                InfoMapCategory category = InfoMapCategory.valueOf(filter);
                infoMaps = infoMapRepository.findInfoMapsWithFilter(petId, category);
                break;
            case "PICK" : break; // TODO 나의 장소
            default :
                throw new BusinessLogicException(ExceptionCode.FILTER_NAME_INCORRECT);

        }

//        if(filter.equals("none")) {
//            infoMaps = infoMapRepository.findInfoMaps(petId);
//        }/*else if (filter.equals("pick")) {
//            //
//        }*/ else if (filter.equals("PARK") || filter.equals("CAFE" || filter.equals("CAFE"))){
//            InfoMapCategory from = InfoMapCategory.valueOf(filter);
//            infoMaps = infoMapRepository.findInfoMapsWithFilter(petId, from);
//        }

        return infoMaps;
    }

    public InfoMap createMaps(InfoMap infoMap) {
        return infoMapRepository.save(infoMap);
    }
}
