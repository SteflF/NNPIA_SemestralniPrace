package e.the.awesome.springreactcomboapp.controller;

import e.the.awesome.springreactcomboapp.Creator;
import e.the.awesome.springreactcomboapp.SpringReactComboAppApplication;
import e.the.awesome.springreactcomboapp.dao.UserRepository;
import e.the.awesome.springreactcomboapp.model.ApiResponse;
import e.the.awesome.springreactcomboapp.model.AuthToken;
import e.the.awesome.springreactcomboapp.model.LoginUser;
import e.the.awesome.springreactcomboapp.model.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.hamcrest.Matchers.is;

//FUNGUJE
@SpringBootTest(classes = {SpringReactComboAppApplication.class})
public class AuthenticationControllerTest {

    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Test
    void loginTest(){
        userRepository.save(new User("jmeno", "prijmeni", "spam@spam.com", "","testUser", bCryptPasswordEncoder.encode("password"),null));

        LoginUser loginUser = new LoginUser();
        loginUser.setUsername("testUser");
        loginUser.setPassword("password");

        ApiResponse<AuthToken> tokenApiResponse = authenticationController.generateToken(loginUser);
        AuthToken responseToken = (AuthToken) tokenApiResponse.getResult();

        Assert.assertEquals(responseToken.getUsername(), "testUser");
        Assert.assertThat(tokenApiResponse.getStatus(), is(200));
    }
}
