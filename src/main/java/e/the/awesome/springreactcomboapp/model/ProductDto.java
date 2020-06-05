package e.the.awesome.springreactcomboapp.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class ProductDto {
    private int id;

    @NotBlank(message = "name is mandatory")
    private String name;

    @NotBlank(message = "price is mandatory")
    @Min(value = 1, message = "The price must at least 1!")
    @Max(value = 99999999, message = "The price should not be this high!")
    private BigDecimal price;

    @NotBlank(message = "description is mandatory")
    private String description;

    @NotBlank(message = "photo is mandatory")
    private String photo;

    @NotBlank(message = "category is mandatory")
    private String category;

    public ProductDto(){};

    public ProductDto(int id, String name, BigDecimal price, String description, String photo, String category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.photo = photo;
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
