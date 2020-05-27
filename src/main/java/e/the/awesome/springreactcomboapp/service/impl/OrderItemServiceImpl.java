package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.OrderItemRepository;
import e.the.awesome.springreactcomboapp.model.OrderDto;
import e.the.awesome.springreactcomboapp.model.OrderItem;
import e.the.awesome.springreactcomboapp.model.OrderItemDto;
import e.the.awesome.springreactcomboapp.service.OrderItemService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "orderItemService")
public class OrderItemServiceImpl implements OrderItemService {

    private OrderItemRepository orderItemRepository;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository){
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderItem save(OrderItemDto order) {
        return null;
    }

    @Override
    public List<OrderItem> findAll() {
        return null;
    }

    @Override
    public OrderItem findById(int id) {
        return null;
    }

    @Override
    public OrderItemDto update(OrderItemDto order) {
        return null;
    }

    @Override
    public List<OrderItem> findByOrderId(int id) {
        List<OrderItem> orderItems = new ArrayList<>();
        orderItemRepository.findAll().iterator().forEachRemaining(orderItems::add);

        for (OrderItem orderItem: orderItems) {
            if(orderItem.getOrder().getId() != id){
                orderItems.remove(orderItem);
            }
        }

        return orderItems;
    }

}
