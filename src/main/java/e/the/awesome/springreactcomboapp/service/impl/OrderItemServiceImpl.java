package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.OrderItemRepository;
import e.the.awesome.springreactcomboapp.model.*;
import e.the.awesome.springreactcomboapp.service.OrderItemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "orderItemService")
public class OrderItemServiceImpl implements OrderItemService {

    private OrderItemRepository orderItemRepository;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository){
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderItem save(OrderItemDto orderItemDto) { return null; }

    @Override
    public List<OrderItem> findAll() {
        return null;
    }

    @Override
    public OrderItem findById(int id) { return null; }

    @Override
    public OrderItemDto update(OrderItemDto order) {
        return null;
    }

    @Override
    public List<OrderItem> findByOrderId(int id) {
        return orderItemRepository.findByOrderId(id);
    }
}
