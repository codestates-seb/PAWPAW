package animalsquad.server.domain.infomap.service;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.address.repository.AddressRepository;
import animalsquad.server.domain.infomap.entity.InfoMap;
import animalsquad.server.domain.infomap.entity.InfoMapCategory;
import animalsquad.server.domain.infomap.repository.InfoMapRepository;
import animalsquad.server.global.s3.service.FileUploadService;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class InfoMapService {

    private final InfoMapRepository infoMapRepository;
    private final AddressRepository addressRepository;
    private final FileUploadService fileUploadService;
    private static final String folderName = "map";

    public List<InfoMap> findInfos(int code, String filter) {
        Optional<Address> address = addressRepository.findByCode(code);
        address.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));

        List<InfoMap> infoMaps = new ArrayList<>();

        switch (filter) {
            case "NONE":
                infoMaps = infoMapRepository.findInfoMaps(code);
                break;
            case "PARK":
            case "CAFE":
            case "RESTAURANT":
            case "POOL":
            case "CAMPING":
            case "HOSPITAL":
                InfoMapCategory category = InfoMapCategory.valueOf(filter);
                infoMaps = infoMapRepository.findInfoMapsWithFilter(code, category);
                break;
            default:
                throw new BusinessLogicException(ExceptionCode.FILTER_NAME_INCORRECT);
        }
        return infoMaps;
    }

    public List<InfoMap> findMyPicks(long id) {
        return infoMapRepository.findInfoMapsMyPick(id);
    }

    public InfoMap findMapDetails(long infoMapId) {
        return findVerifiedInfoMap(infoMapId);
    }

    public InfoMap createMaps(InfoMap infoMap, MultipartFile file) throws IllegalAccessException {
        Optional<Address> optionalAddress = addressRepository.findByCode(infoMap.getAddress().getCode());
        Address address = optionalAddress.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));

        infoMap.setAddress(address);
        String imageUrl = fileUploadService.uploadImage(file, folderName);

        infoMap.setImageUrl(imageUrl);

        return infoMapRepository.save(infoMap);
    }

    public InfoMap findVerifiedInfoMap(long id) {
        Optional<InfoMap> optionalInfoMap = infoMapRepository.findById(id);
        return optionalInfoMap.orElseThrow(() -> new BusinessLogicException(ExceptionCode.INFO_MAP_NOT_FOUND));
    }
}
