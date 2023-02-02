package animalsquad.server.domain.address.service;

import animalsquad.server.domain.address.entity.Address;
import animalsquad.server.domain.address.repository.AddressRepository;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Address findAddressByCode(int code) {
        Optional<Address> optionalAddress = addressRepository.findByCode(code);
        Address address = optionalAddress.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));
        return address;

    }
}
