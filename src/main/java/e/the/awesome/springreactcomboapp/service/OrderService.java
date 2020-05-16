package e.the.awesome.springreactcomboapp.service;

import e.the.awesome.springreactcomboapp.model.Order;
import e.the.awesome.springreactcomboapp.model.OrderDto;

import java.util.List;

public interface OrderService {

    Order save(OrderDto order);

    List<Order> findAll();

    Order findById(int id);

    OrderDto update(OrderDto order);

    List<Order> findByUserId(int id);

}
