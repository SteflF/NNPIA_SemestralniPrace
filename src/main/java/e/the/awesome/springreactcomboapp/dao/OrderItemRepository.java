package e.the.awesome.springreactcomboapp.dao;

import e.the.awesome.springreactcomboapp.model.OrderItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends CrudRepository<OrderItem, Integer>{
    List<OrderItem> findByOrderId(Integer id);
}
