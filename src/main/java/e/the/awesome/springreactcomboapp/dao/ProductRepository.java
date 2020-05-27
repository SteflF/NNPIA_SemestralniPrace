package e.the.awesome.springreactcomboapp.dao;

import e.the.awesome.springreactcomboapp.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Integer> {
    Product findByName(String name);

    Page<Product> findByCategoryStartsWithIgnoreCase(@Param("category") String category, Pageable pageable);

    Page<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(@Param("name") String name, @Param("description") String description, Pageable pageable);
}
