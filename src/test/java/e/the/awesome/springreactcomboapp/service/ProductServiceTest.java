package e.the.awesome.springreactcomboapp.service;

import e.the.awesome.springreactcomboapp.SpringReactComboAppApplication;
import e.the.awesome.springreactcomboapp.dao.ProductRepository;
import e.the.awesome.springreactcomboapp.model.Product;
import e.the.awesome.springreactcomboapp.model.ProductDto;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.util.Optional;

@SpringBootTest(classes = {SpringReactComboAppApplication.class})
public class ProductServiceTest {

    @MockBean
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    //VSE OK
    @Test
    void findProductByIdTest(){
        Product mockProduct = new Product();

        mockProduct.setName("Test Produkt");
        mockProduct.setPrice(new BigDecimal(1800.89));
        mockProduct.setCategory("CPU");
        mockProduct.setPhoto("Test foto");
        mockProduct.setDescription("Test popis produktu");

        Mockito.when(productRepository.findById(1)).thenReturn(Optional.of(mockProduct));

        Product product = productService.findById(1);

        Assert.assertEquals(product.getName(), mockProduct.getName());
        Assert.assertEquals(product.getPrice(), mockProduct.getPrice());
        Assert.assertEquals(product.getCategory(), mockProduct.getCategory());
        Assert.assertEquals(product.getPhoto(), mockProduct.getPhoto());
        Assert.assertEquals(product.getDescription(), mockProduct.getDescription());
    }

    @Test
    void updateNonExistingProduct(){
        ProductDto productDto = new ProductDto();

        productDto.setId(1);
        productDto.setName("Test produkt");
        productDto.setPrice(new BigDecimal(1800));
        productDto.setCategory("GPU");
        productDto.setPhoto("Test foto");
        productDto.setDescription("Test popis");

        ProductDto updatedProduct = productService.update(1, productDto);

        Assert.assertNull(updatedProduct);
    }
}
