package e.the.awesome.springreactcomboapp.service;

import e.the.awesome.springreactcomboapp.model.Product;
import e.the.awesome.springreactcomboapp.model.ProductDto;

import java.util.List;

public interface ProductService {
    Product save(ProductDto product);

    List<Product> findAll();

    void delete(int id);

    Product findById(int id);

    Product findByName(String productName);

    ProductDto update(ProductDto productDto);
}
