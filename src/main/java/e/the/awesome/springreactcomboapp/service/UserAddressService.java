package e.the.awesome.springreactcomboapp.service;

import e.the.awesome.springreactcomboapp.model.UserAddress;
import e.the.awesome.springreactcomboapp.model.UserAddressDto;

import java.util.List;

public interface UserAddressService {
    UserAddress save(UserAddressDto address);

    List<UserAddress> findAll();

    void delete(int id);

    UserAddress findById(int id);

    UserAddressDto update(int userId, UserAddressDto address);
}
