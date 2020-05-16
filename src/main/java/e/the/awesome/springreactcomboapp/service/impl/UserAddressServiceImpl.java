package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.UserAddressRepository;
import e.the.awesome.springreactcomboapp.model.UserAddress;
import e.the.awesome.springreactcomboapp.model.UserAddressDto;
import e.the.awesome.springreactcomboapp.service.UserAddressService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service(value = "userAddressService")
public class UserAddressServiceImpl implements UserAddressService {

    private UserAddressRepository userAddressRepository;

    public UserAddressServiceImpl(UserAddressRepository userAddressRepository){
        this.userAddressRepository = userAddressRepository;
    }

    @Override
    public UserAddress save(UserAddressDto address) {
        UserAddress newUserAddress = new UserAddress();

        newUserAddress.setCity(address.getCity());
        newUserAddress.setCountry(address.getCountry());
        newUserAddress.setPsc(address.getPsc());
        newUserAddress.setStreet(address.getStreet());

        return userAddressRepository.save(newUserAddress);
    }

    @Override
    public List<UserAddress> findAll() {
        return null;
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public UserAddress findById(int id) {
        Optional<UserAddress> address = userAddressRepository.findById(id);
        return address.isPresent() ? address.get() : null;

    }

    @Override
    public UserAddressDto update(UserAddressDto address) {
        UserAddress userAddress = findById(address.getId());

        if(userAddress != null){
            BeanUtils.copyProperties(address, userAddress, "id", "user");
            userAddressRepository.save(userAddress);
        }

        return address;
    }
}
