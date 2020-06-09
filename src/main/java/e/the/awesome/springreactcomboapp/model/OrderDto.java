package e.the.awesome.springreactcomboapp.model;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class OrderDto {

    private int id;

    private UserDto user;

    private List<OrderItemDto> products;

    private UserAddressDto address;

    @NotBlank(message = "payment is mandatory")
    private String payment;

    @NotBlank(message = "state is mandatory")
    private String state;

    @NotBlank(message = "deliveryMethod is mandatory")
    private String deliveryMethod;

    public OrderDto(){}

    public OrderDto(int id, String payment, String state, String deliveryMethod) {
        this.id = id;
        this.payment = payment;
        this.state = state;
        this.deliveryMethod = deliveryMethod;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<OrderItemDto> getProducts() {
        return products;
    }

    public void setProducts(List<OrderItemDto> products) {
        this.products = products;
    }

    public UserAddressDto getAddress() {
        return address;
    }

    public void setAddress(UserAddressDto address) {
        this.address = address;
    }

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }
}
