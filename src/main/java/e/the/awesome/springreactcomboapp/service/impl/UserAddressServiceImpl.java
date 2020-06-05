package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.UserAddressRepository;
import e.the.awesome.springreactcomboapp.dao.UserRepository;
import e.the.awesome.springreactcomboapp.model.User;
import e.the.awesome.springreactcomboapp.model.UserAddress;
import e.the.awesome.springreactcomboapp.model.UserAddressDto;
import e.the.awesome.springreactcomboapp.service.UserAddressService;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service(value = "userAddressService")
public class UserAddressServiceImpl implements UserAddressService {

    private UserRepository userRepository;

    private UserAddressRepository userAddressRepository;

    public UserAddressServiceImpl(UserRepository userRepository, UserAddressRepository userAddressRepository){
        this.userRepository = userRepository;
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
    public UserAddressDto update(int userId, UserAddressDto address) {
        Optional<User> user = userRepository.findById(userId);

        if(user.isPresent()){
            if(user.get().getAddress() == null){
                UserAddress newUserAddress = new UserAddress();

                newUserAddress.setCity(address.getCity());
                newUserAddress.setStreet(address.getStreet());
                newUserAddress.setPsc(address.getPsc());
                newUserAddress.setCountry(address.getCountry());

                userAddressRepository.save(newUserAddress);
                user.get().setAddress(newUserAddress);
            }else{
                UserAddress userAddress = findById(user.get().getAddress().getId());

                BeanUtils.copyProperties(address, userAddress, "id", "user");
                userAddressRepository.save(userAddress);
            }

            user.get().setFirstName(address.getFirstName());
            user.get().setLastName(address.getLastName());

            userRepository.save(user.get());
        }
        else {
            throw new UnsupportedOperationException("Not allowed operation!");
        }

        return address;
    }
}
