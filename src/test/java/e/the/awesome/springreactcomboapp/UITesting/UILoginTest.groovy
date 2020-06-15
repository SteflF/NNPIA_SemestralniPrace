package e.the.awesome.springreactcomboapp.UITesting

import e.the.awesome.springreactcomboapp.dao.UserRepository
import e.the.awesome.springreactcomboapp.model.User
import geb.Browser
import org.junit.jupiter.api.Test
import org.openqa.selenium.By
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

//FUNGUJE
@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT
)
class UILoginTest {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder bcryptEncoder;

  @Test
  void loginTest() {

    System.setProperty("webdriver.gecko.driver", "src\\test\\resources\\geckodriver.exe")

    userRepository.save(new User(firstName: "Franta", lastName: "Mlaticka", email: "spam@spam.com", username: "devglan", password: bcryptEncoder.encode("devglan"), address: null));

    Browser.drive {
      go 'http://localhost:3000/'
      assert title == "Login | UPCE"

      // a) typing text into input using GEB jQuery-like API
      $("input[name='username']").value("devglan")

      // a) typing text into input using core WebDriver API
      driver.findElement(By.name("password")).sendKeys("devglan")

      driver.findElement(By.xpath("//button[*[contains(text(),'Login')]]")).click()

      WebDriverWait wait = new WebDriverWait(driver, 10)
      wait.until(ExpectedConditions.titleIs("Products"))
    }
  }
}