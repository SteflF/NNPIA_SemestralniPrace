package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.ProductRepository;
import e.the.awesome.springreactcomboapp.model.Product;
import e.the.awesome.springreactcomboapp.model.ProductDto;
import e.the.awesome.springreactcomboapp.service.ProductService;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.ArrayList;
import java.util.List;

@Service(value = "productService")
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @Override
    public Product save(ProductDto product) {
        return null;
    }

    @Override
    public List<Product> findAll() {
        List<Product> products = new ArrayList<>();
        productRepository.findAll().iterator().forEachRemaining(products::add);
        return products;
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public Product findById(int id) {
        Optional<Product> product = productRepository.findById(id);

        return product.isPresent() ? product.get() : null;
    }

    @Override
    public Product findByName(String productName) {
        return null;
    }

    @Override
    public ProductDto update(ProductDto productDto) {
        return null;
    }
}
