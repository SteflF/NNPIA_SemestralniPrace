package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.*;
import e.the.awesome.springreactcomboapp.model.*;
import e.the.awesome.springreactcomboapp.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service(value = "orderService")
public class OrderServiceImpl implements OrderService {

    private final OrderItemRepository orderItemRepository;

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final UserAddressServiceImpl userAddressService;

    private final UserServiceImpl userService;

    private final UserRepository userRepository;

    public OrderServiceImpl(OrderItemRepository orderItemRepository,
                            OrderRepository orderRepository,
                            ProductRepository productRepository,
                            UserAddressServiceImpl userAddressService,
                            UserServiceImpl userService,
                            UserRepository userRepository){
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userAddressService = userAddressService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @Override
    public Order save(OrderDto orderDto) {
        Order newOrder = new Order();
        User user = new User();
        Optional<User> optionalUser = userRepository.findById(orderDto.getUser().getId());

        if(!optionalUser.isPresent()){
            UserAddressDto newAddress = orderDto.getAddress();

            UserAddress userAddress = userAddressService.save(newAddress);

            UserDto newUser = orderDto.getUser();
            newUser.setUserAddressId(userAddress.getId());

            user = userService.save(newUser);
        }

        newOrder.setUser(optionalUser.isPresent() ? optionalUser.get() : user);
        newOrder.setPayment(orderDto.getPayment());
        newOrder.setState(orderDto.getState());
        newOrder.setDeliveryMethod(orderDto.getDeliveryMethod());

        newOrder = orderRepository.save(newOrder);

        Optional<Product> product;
        for (OrderItemDto item: orderDto.getProducts()) {
             if(item.getId() == 0){
                 throw new UnsupportedOperationException("Id is not implemented!");
             }else {
                 product = productRepository.findById(item.getId());
             }

             OrderItem orderItem = new OrderItem();

             orderItem.setProduct(product.orElse(null));
             orderItem.setOrder(newOrder);
             orderItem.setPrice(product.get().getPrice());
             orderItem.setCount(item.getCount());

             orderItemRepository.save(orderItem);
        }

        return newOrder;
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
        return orderRepository.findByUserId(id);
    }
}
