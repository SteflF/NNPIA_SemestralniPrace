package e.the.awesome.springreactcomboapp.dao;

import e.the.awesome.springreactcomboapp.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends PagingAndSortingRepository<Order, Integer> {
    Page<Order> findByUserId(@Param("user_id") Integer id, Pageable pageable);
}
