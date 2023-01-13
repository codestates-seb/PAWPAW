package animalsquad.server.domain.infomap.service;

import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapCategory;
import animalsquad.server.domain.infomap.repository.InfoMapRepository;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class InfoMapService {

//    private final JwtTokenProvider jwtTokenProvider;
    private final InfoMapRepository infoMapRepository;

    public List<InfoMap> findInfos(int code, String filter) {

        List<InfoMap> infoMaps = new ArrayList<>();

        switch(filter) {
            case "NONE" : infoMaps = infoMapRepository.findInfoMaps(code); break;
            case "PARK" : case "CAFE" : case "RESTAURANT" : case  "POOL" : case "CAMPING" : case "HOSPITAL" :
                InfoMapCategory category = InfoMapCategory.valueOf(filter);
                infoMaps = infoMapRepository.findInfoMapsWithFilter(code, category);
                break;
            default :
                throw new BusinessLogicException(ExceptionCode.FILTER_NAME_INCORRECT);
        }
        return infoMaps;
    }

    public List<InfoMap> findMyPicks(long id) {
        return infoMapRepository.findInfoMapsMyPick(id);
    }
    public InfoMap findMapDetails(long infoMapId){
        return findVerifiedInfoMap(infoMapId);
    }

    public InfoMap createMaps(InfoMap infoMap) {
        return infoMapRepository.save(infoMap);
    }

    public InfoMap findVerifiedInfoMap(long id) {
        Optional<InfoMap> optionalInfoMap = infoMapRepository.findById(id);
        return optionalInfoMap.orElseThrow(() -> new BusinessLogicException(ExceptionCode.INFO_MAP_NOT_FOUND));
    }
}
