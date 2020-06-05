package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.ProductRepository;
import e.the.awesome.springreactcomboapp.model.Product;
import e.the.awesome.springreactcomboapp.model.ProductDto;
import e.the.awesome.springreactcomboapp.model.ProductPagingDto;
import e.the.awesome.springreactcomboapp.service.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service(value = "productService")
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @Override
    public ProductPagingDto findAll(int pageNumber, int pageSize, String sortBy, Boolean sortAsc) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, sortAsc ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);

        Page<Product> pagedProducts = productRepository.findAll(paging);

        if (pagedProducts.hasContent()){
            return new ProductPagingDto(pagedProducts.getContent().stream().map(i -> new ProductDto(i.getId(), i.getName(), i.getPrice(), i.getDescription(), i.getPhoto(), i.getCategory())).collect(Collectors.toList()), (int) pagedProducts.getTotalElements());
        }else{
            return new ProductPagingDto();
        }
    }

    @Override
    public ProductPagingDto findByCategory(String category, int pageNumber, int pageSize, String sortBy, Boolean sortAsc) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, sortAsc ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);

        Page<Product> pagedProducts = productRepository.findByCategoryStartsWithIgnoreCase(category, paging);

        if (pagedProducts.hasContent()){
            return new ProductPagingDto(pagedProducts.getContent().stream().map(i -> new ProductDto(i.getId(), i.getName(), i.getPrice(), i.getDescription(), i.getPhoto(), i.getCategory())).collect(Collectors.toList()), (int) pagedProducts.getTotalElements());
        }else{
            return new ProductPagingDto();
        }
    }

    @Override
    public ProductPagingDto findBySearchString(String searchString, int pageNumber, int pageSize, String sortBy, Boolean sortAsc) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, sortAsc ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);

        Page<Product> pagedProducts = productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(searchString, searchString, paging);

        if (pagedProducts.hasContent()){
            return new ProductPagingDto(pagedProducts.getContent().stream().map(i -> new ProductDto(i.getId(), i.getName(), i.getPrice(), i.getDescription(), i.getPhoto(), i.getCategory())).collect(Collectors.toList()), (int) pagedProducts.getTotalElements());
        }else{
            return new ProductPagingDto();
        }
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
    public Product save(ProductDto newProduct) {
        Product product = new Product();

        product.setName(newProduct.getName());
        product.setPrice(newProduct.getPrice());
        product.setCategory(newProduct.getCategory());
        product.setPhoto(newProduct.getPhoto());
        product.setDescription(newProduct.getDescription());

        return productRepository.save(product);
    }

    @Override
    public ProductDto update(int productId, ProductDto productDto) {
        Optional<Product> product = productRepository.findById(productId);

        if(product.isPresent()){
            BeanUtils.copyProperties(productDto, product.get(), "id");

            productRepository.save(product.get());

            return productDto;
        }else{
            return null;
        }
    }
}
