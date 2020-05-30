package e.the.awesome.springreactcomboapp.controller;

import e.the.awesome.springreactcomboapp.model.ApiResponse;
import e.the.awesome.springreactcomboapp.model.Order;
import e.the.awesome.springreactcomboapp.model.OrderDto;
import e.the.awesome.springreactcomboapp.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @GetMapping("/order/{id}")
    public ApiResponse<Order> getOrderById(@PathVariable int id){
        return new ApiResponse<>(HttpStatus.OK.value(), "Orders fetched successfully", orderService.findById(id));
    }

    @GetMapping("/orders/{id}")
    public ApiResponse<List<Order>> getOrdersByUserId(@PathVariable int id){
        return new ApiResponse<>(HttpStatus.OK.value(), "Orders fetched successfully", orderService.findByUserId(id));
    }

    @PostMapping("/order")
    public ApiResponse<Order> createOrder(@RequestBody OrderDto order){
        return new ApiResponse<>(HttpStatus.OK.value(), "Order created successfully", orderService.save(order));
    }
}
