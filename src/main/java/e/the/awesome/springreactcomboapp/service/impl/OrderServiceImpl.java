package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.OrderRepository;
import e.the.awesome.springreactcomboapp.dao.UserRepository;
import e.the.awesome.springreactcomboapp.model.Order;
import e.the.awesome.springreactcomboapp.model.OrderDto;
import e.the.awesome.springreactcomboapp.model.User;
import e.the.awesome.springreactcomboapp.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service(value = "orderService")
public class OrderServiceImpl implements OrderService {

    private UserRepository userRepository;

    private OrderRepository orderRepository;

    public OrderServiceImpl(UserRepository userRepository, OrderRepository orderRepository){
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public Order save(OrderDto orderDto) {
        Order newOrder = new Order();
        Optional<User> optionalUser = userRepository.findById(orderDto.getUserId());

        newOrder.setUser(optionalUser.isPresent() ? optionalUser.get() : null);
        newOrder.setPayment(orderDto.getPayment());
        newOrder.setState(orderDto.getState());
        newOrder.setDeliveryMethod(orderDto.getDeliveryMethod());

        return orderRepository.save(newOrder);
    }

    @Override
    public List<Order> findAll() {
        List<Order> orders = new ArrayList<>();
        orderRepository.findAll().iterator().forEachRemaining(orders::add);
        return orders;
    }

    @Override
    public Order findById(int id) {
        Optional<Order> order = orderRepository.findById(id);

        return order.isPresent() ? order.get() : null;
    }

    @Override
    public OrderDto update(OrderDto order) {
        return null;
    }

    @Override
    public List<Order> findByUserId(int id) {
        List<Order> orders = new ArrayList<>();
        orderRepository.findAll().iterator().forEachRemaining(orders::add);

        for (Order order: orders) {
            if(order.getUser().getId() != id){
                orders.remove(order);
            }
        }

        return orders;
    }
}
