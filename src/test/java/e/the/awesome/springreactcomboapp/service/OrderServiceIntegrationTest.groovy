import e.the.awesome.springreactcomboapp.Creator
import e.the.awesome.springreactcomboapp.SpringReactComboAppApplication
import e.the.awesome.springreactcomboapp.model.Order
import e.the.awesome.springreactcomboapp.model.OrderDto
import e.the.awesome.springreactcomboapp.model.OrderItemDto
import e.the.awesome.springreactcomboapp.model.User
import e.the.awesome.springreactcomboapp.model.UserAddress
import e.the.awesome.springreactcomboapp.model.UserDto
import e.the.awesome.springreactcomboapp.service.OrderService
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(classes = SpringReactComboAppApplication.class)
public class OrderServiceIntegrationTest {

    @Autowired
    private Creator creator;

    @Autowired
    private OrderService orderService;

    User PrepareData(){
        UserAddress address = new UserAddress(city: "Pelhrimov", street: "Prikopy", psc: "394 89", country: "Czechia");
        return creator.saveEntity(new User(firstName: "Frantisek", lastName: "Stefl", email: "spam@spam.com", phoneNumber: "+420123456789", address: address));
    }

    //OPRAVIT
    @Test
    void createOrderTest(){
        User user = PrepareData();
        UserDto userDto = new UserDto(id: user.getId());
        OrderDto orderDto = new OrderDto(id: 1, payment: "Kartou", state: "Vytvoreno", deliveryMethod: "Dobirka");
        orderDto.setUser(userDto);
        List<OrderItemDto> orderItems = new ArrayList<>();
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(1);
        orderItems.add(orderItemDto);
        orderDto.setProducts(orderItems);

        Order order = orderService.save(orderDto);

        Assert.assertEquals(order.user.id, userDto.id);
        Assert.assertEquals(order.deliveryMethod, orderDto.deliveryMethod);
        Assert.assertEquals(order.state, orderDto.state);
        Assert.assertEquals(order.payment, orderDto.payment);
    }
}