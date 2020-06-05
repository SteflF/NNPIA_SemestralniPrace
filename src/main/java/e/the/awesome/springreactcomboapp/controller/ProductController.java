package e.the.awesome.springreactcomboapp.controller;

import e.the.awesome.springreactcomboapp.model.ApiResponse;
import e.the.awesome.springreactcomboapp.model.Product;
import e.the.awesome.springreactcomboapp.model.ProductDto;
import e.the.awesome.springreactcomboapp.model.ProductPagingDto;
import e.the.awesome.springreactcomboapp.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/products")
    public ApiResponse<ProductPagingDto> getProducts(@RequestParam(defaultValue = "0") int pageNumber,
                                                     @RequestParam(defaultValue = "3") int pageSize,
                                                     @RequestParam(defaultValue = "name") String sortBy,
                                                     @RequestParam(defaultValue = "true") Boolean sortAsc){
        return new ApiResponse<>(HttpStatus.OK.value(), "Products fetched successfully.", productService.findAll(pageNumber, pageSize, sortBy, sortAsc));
    }

    @GetMapping("/products/{category}")
    public ApiResponse<ProductPagingDto> getProductsByCategory(@PathVariable String category,
                                                               @RequestParam(defaultValue = "0") int pageNumber,
                                                               @RequestParam(defaultValue = "1") int pageSize,
                                                               @RequestParam(defaultValue = "name") String sortBy,
                                                               @RequestParam(defaultValue = "true") Boolean sortAsc){
        return new ApiResponse<>(HttpStatus.OK.value(), "Products by category fetched successfully.", productService.findByCategory(category ,pageNumber, pageSize, sortBy, sortAsc));
    }

    @GetMapping("/products/search")
    public ApiResponse<ProductPagingDto> getProductsBySearchString(@RequestParam String searchString,
                                                                   @RequestParam(defaultValue = "0") int pageNumber,
                                                                   @RequestParam(defaultValue = "3") int pageSize,
                                                                   @RequestParam(defaultValue = "name") String sortBy,
                                                                   @RequestParam(defaultValue = "true") Boolean sortAsc){
        return new ApiResponse<>(HttpStatus.OK.value(), "Products by searchString fetched successfully.", productService.findBySearchString(searchString ,pageNumber, pageSize, sortBy, sortAsc));
    }

    @GetMapping("/product/{id}")
    public ApiResponse<Product> getProduct(@PathVariable int id){
        return new ApiResponse<>(HttpStatus.OK.value(), "Product fetched successfully.", productService.findById(id));
    }

    @PostMapping("/product")
    public ApiResponse<Product> createProduct(@RequestBody ProductDto product){
        return new ApiResponse<>(HttpStatus.OK.value(), "Product created successfully.", productService.save(product));
    }

    @PutMapping("/product/{id}")
    public ApiResponse<ProductDto> editProduct(@PathVariable int id, @RequestBody ProductDto product){
        return new ApiResponse<>(HttpStatus.OK.value(), "Product edited successfully.", productService.update(id, product));
    }

    @DeleteMapping("/product/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable int id){
        productService.delete(id);
        return new ApiResponse<>(HttpStatus.OK.value(), "Product deleted successfully.", null);
    }
}
