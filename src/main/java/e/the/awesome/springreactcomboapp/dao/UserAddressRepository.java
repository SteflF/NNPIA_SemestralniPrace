package e.the.awesome.springreactcomboapp.dao;

import e.the.awesome.springreactcomboapp.model.UserAddress;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAddressRepository extends CrudRepository<UserAddress, Integer> {
}
