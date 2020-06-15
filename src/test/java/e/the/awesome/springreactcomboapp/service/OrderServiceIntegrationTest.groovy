import e.the.awesome.springreactcomboapp.Creator
import e.the.awesome.springreactcomboapp.SpringReactComboAppApplication
import e.the.awesome.springreactcomboapp.dao.ProductRepository
import e.the.awesome.springreactcomboapp.dao.UserAddressRepository
import e.the.awesome.springreactcomboapp.dao.UserRepository
import e.the.awesome.springreactcomboapp.model.Order
import e.the.awesome.springreactcomboapp.model.OrderDto
import e.the.awesome.springreactcomboapp.model.OrderItemDto
import e.the.awesome.springreactcomboapp.model.Product
import e.the.awesome.springreactcomboapp.model.User
import e.the.awesome.springreactcomboapp.model.UserAddress
import e.the.awesome.springreactcomboapp.model.UserAddressDto
import e.the.awesome.springreactcomboapp.model.UserDto
import e.the.awesome.springreactcomboapp.service.OrderService
import org.junit.Assert
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(classes = SpringReactComboAppApplication.class)
public class OrderServiceIntegrationTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserAddressRepository userAddressRepository;

    @Autowired
    private ProductRepository productRepository;

    User PrepareData(){
        productRepository.save(new Product(name: "produkt1", category: "GPU", price: new BigDecimal(1800), description: "popis produkt", photo: "fotka"));
        return userRepository.save(new User(firstName: "Frantisek", lastName: "Stefl", email: "spam@spam.com", phoneNumber: "+420123456789", username: "frankie", password: "heslo", address: new UserAddress(city: "Pelhrimov", street: "Prikopy", psc: "394 89", country: "Czechia")));
    }

    //OPRAVIT neda se ulozit do db
    @Test
    void createOrderTest(){
        //User user = PrepareData();
        UserDto userDto = new UserDto(firstName: "Frantisek", lastName: "Stefl", email: "spam@spam.com", phoneNumber: "+420123456789", username: "frankie", password: "heslo");
        UserAddressDto userAddressDto = new UserAddressDto(city: "Pelhrimov", street: "Prikopy", psc: "394 70", country: "Czechia");
        OrderDto orderDto = new OrderDto(payment: "Kartou", state: "Vytvoreno", deliveryMethod: "Dobirka");
        orderDto.setUser(userDto);
        orderDto.setAddress(userAddressDto);
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