package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.OrderItemRepository;
import e.the.awesome.springreactcomboapp.dao.OrderRepository;
import e.the.awesome.springreactcomboapp.dao.ProductRepository;
import e.the.awesome.springreactcomboapp.model.*;
import e.the.awesome.springreactcomboapp.service.OrderItemService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service(value = "orderItemService")
public class OrderItemServiceImpl implements OrderItemService {

    private OrderRepository orderRepository;

    private OrderItemRepository orderItemRepository;

    private ProductRepository productRepository;

    public OrderItemServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository){
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }

    @Override
    public OrderItem save(OrderItemDto orderItemDto) {
        OrderItem newOrderItem = new OrderItem();
        Optional<Order> order = orderRepository.findById(orderItemDto.getOrderId());
        Optional<Product> product = productRepository.findById(orderItemDto.getProductId());

        newOrderItem.setProduct(product.isPresent() ? product.get() : null);
        newOrderItem.setOrder(order.isPresent() ? order.get() : null);
        newOrderItem.setPrice(orderItemDto.getPrice());
        newOrderItem.setCount(orderItemDto.getCount());

        return orderItemRepository.save(newOrderItem);
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
