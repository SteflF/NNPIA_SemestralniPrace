package e.the.awesome.springreactcomboapp.service;

import e.the.awesome.springreactcomboapp.model.Order;
import e.the.awesome.springreactcomboapp.model.OrderDto;
import e.the.awesome.springreactcomboapp.model.OrderPagingDto;

import java.util.List;

public interface OrderService {

    Order save(OrderDto order);

    List<Order> findAll();

    Order findById(int id);

    OrderDto update(OrderDto order);

    OrderPagingDto findByUserId(int id, int pageNumber, int pageSize, String sortBy, boolean sortAsc);

}
