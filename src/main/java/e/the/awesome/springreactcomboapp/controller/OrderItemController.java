package e.the.awesome.springreactcomboapp.controller;

import e.the.awesome.springreactcomboapp.model.ApiResponse;
import e.the.awesome.springreactcomboapp.model.OrderItem;
import e.the.awesome.springreactcomboapp.service.OrderItemService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class OrderItemController {

    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService){
        this.orderItemService = orderItemService;
    }

    @GetMapping("/orderitems/{id}")
    public ApiResponse<List<OrderItem>> getOrderItemsByUserId(@PathVariable int id){
        return new ApiResponse<>(HttpStatus.OK.value(), "OrderItems fetched successfully", orderItemService.findByOrderId(id));
    }

}
