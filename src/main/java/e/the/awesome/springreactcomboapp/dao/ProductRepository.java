package e.the.awesome.springreactcomboapp.dao;

import e.the.awesome.springreactcomboapp.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {
    Product findByName(String name);
}
