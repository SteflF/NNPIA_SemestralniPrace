package e.the.awesome.springreactcomboapp.service;

import e.the.awesome.springreactcomboapp.model.Product;
import e.the.awesome.springreactcomboapp.model.ProductDto;
import e.the.awesome.springreactcomboapp.model.ProductPagingDto;

public interface ProductService {
    Product save(ProductDto newProduct);

    ProductPagingDto findAll(int pageNumber, int pageSize, String sortBy, Boolean sortAsc);

    ProductPagingDto findByCategory(String category, int pageNumber, int pageSize, String sortBy, Boolean sortAsc);

    ProductPagingDto findBySearchString(String searchString, int pageNumber, int pageSize, String sortBy, Boolean sortAsc);

    void delete(int id);

    Product findById(int id);

    Product findByName(String productName);

    ProductDto update(int productId, ProductDto product);
}
