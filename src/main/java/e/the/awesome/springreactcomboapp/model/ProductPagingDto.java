package e.the.awesome.springreactcomboapp.model;

import java.util.List;

public class ProductPagingDto {
    private List<ProductDto> products;
    private int count;

    public ProductPagingDto(List<ProductDto> products, int count){
        this.products = products;
        this.count = count;
    }

    public ProductPagingDto(){

    }

    public List<ProductDto> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDto> products) {
        this.products = products;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
