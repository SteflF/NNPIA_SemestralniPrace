package e.the.awesome.springreactcomboapp.model;

import java.util.List;

public class OrderPagingDto {
    private List<OrderDto> orders;
    private int count;

    public OrderPagingDto(){}

    public OrderPagingDto(List<OrderDto> orders, int count) {
        this.orders = orders;
        this.count = count;
    }

    public List<OrderDto> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderDto> orders) {
        this.orders = orders;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
