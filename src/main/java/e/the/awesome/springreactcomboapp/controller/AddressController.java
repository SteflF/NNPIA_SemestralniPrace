package e.the.awesome.springreactcomboapp.controller;

import e.the.awesome.springreactcomboapp.model.ApiResponse;
import e.the.awesome.springreactcomboapp.model.UserAddress;
import e.the.awesome.springreactcomboapp.model.UserAddressDto;
import e.the.awesome.springreactcomboapp.service.UserAddressService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class AddressController {

    private final UserAddressService userAddressService;

    public AddressController(UserAddressService userAddressService){
        this.userAddressService = userAddressService;
    }

    @GetMapping("/user/address/{id}")
    public ApiResponse<UserAddress> getAddress(@PathVariable int id){
        return new ApiResponse<>(HttpStatus.OK.value(), "User address fetched successfully.", userAddressService.findById(id));
    }

    @PutMapping("/user/address/{id}")
    public ApiResponse<UserAddress> updateAddress(@RequestBody UserAddressDto address){
        return new ApiResponse<>(HttpStatus.OK.value(), "Address updated successfully.", userAddressService.update(address));
    }

    @PostMapping("/user/address")
    public ApiResponse<UserAddress> createAddress(@RequestBody UserAddressDto address){
        return new ApiResponse<>(HttpStatus.OK.value(), "Address created successfully.", userAddressService.save(address));
    }
}
