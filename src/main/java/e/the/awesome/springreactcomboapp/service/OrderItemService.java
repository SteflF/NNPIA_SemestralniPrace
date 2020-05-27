package e.the.awesome.springreactcomboapp.service;

import e.the.awesome.springreactcomboapp.model.OrderItem;
import e.the.awesome.springreactcomboapp.model.OrderItemDto;

import java.util.List;

public interface OrderItemService {

    OrderItem save(OrderItemDto order);

    List<OrderItem> findAll();

    OrderItem findById(int id);

    OrderItemDto update(OrderItemDto order);

    List<OrderItem> findByOrderId(int id);

}
