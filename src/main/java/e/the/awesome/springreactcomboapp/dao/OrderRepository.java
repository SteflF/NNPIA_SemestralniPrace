package e.the.awesome.springreactcomboapp.dao;

import e.the.awesome.springreactcomboapp.model.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer> {
    List<Order> findByUserId(Integer id);
}
