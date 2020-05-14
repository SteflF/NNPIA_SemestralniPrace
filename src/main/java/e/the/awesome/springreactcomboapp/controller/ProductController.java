package e.the.awesome.springreactcomboapp.controller;

import e.the.awesome.springreactcomboapp.model.ApiResponse;
import e.the.awesome.springreactcomboapp.model.Product;
import e.the.awesome.springreactcomboapp.model.ProductDto;
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
    public ApiResponse<List<Product>> getProducts(){
        return new ApiResponse<>(HttpStatus.OK.value(), "Products fetched successfully.", productService.findAll());
    }

    @GetMapping("/product/{id}")
    public ApiResponse<Product> getProduct(@PathVariable int id){
        return new ApiResponse<>(HttpStatus.OK.value(), "Product fetched successfully.", productService.findById(id));
    }

    @PostMapping("product/{id}")
    public ApiResponse<Product> createProduct(@RequestBody ProductDto product){
        return new ApiResponse<>(HttpStatus.OK.value(), "Product created successfully.", productService.save(product));
    }

    @PutMapping("product/{id}")
    public ApiResponse<ProductDto> editProduct(@RequestBody ProductDto product){
        return new ApiResponse<>(HttpStatus.OK.value(), "Product edited successfully.", productService.update(product));
    }

    @DeleteMapping("product/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable int id){
        productService.delete(id);
        return new ApiResponse<>(HttpStatus.OK.value(), "Product deleted successfully.", null);
    }
}
