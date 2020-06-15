package e.the.awesome.springreactcomboapp.UITesting

import e.the.awesome.springreactcomboapp.Creator
import e.the.awesome.springreactcomboapp.dao.UserRepository
import e.the.awesome.springreactcomboapp.model.Product
import e.the.awesome.springreactcomboapp.model.User
import e.the.awesome.springreactcomboapp.model.UserAddress
import e.the.awesome.springreactcomboapp.model.UserDto
import e.the.awesome.springreactcomboapp.service.UserService
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
class UILoginTestWithCreator {

  @Autowired
  private Creator creator;

  @Autowired
  private BCryptPasswordEncoder bcryptEncoder;

  @Autowired
  private UserRepository userRepository;

  @Test
  void loginTest() {

    System.setProperty("webdriver.gecko.driver", "src\\test\\resources\\geckodriver.exe")
    creator.saveEntity(new Product(name: "A produkt", price: new BigDecimal(1800), category: "GPU", photo: "https://picsum.photos/200", description: "Jednoduchy popis"));

    //creator.saveEntity(new User(firstName: "Franta", lastName: "Mlaticka", email: "spam@spam.com", username: "devglan", password: bcryptEncoder.encode("devglan"), address: null));

    userRepository.save(new User(firstName: "Franta", lastName: "Mlaticka", email: "spam@spam.com", username: "devglan", password: bcryptEncoder.encode("devglan"), address: null));

    Browser.drive {
      go 'http://localhost:3000/'
      assert title == "Login | UPCE"

      // a) typing text into input using GEB jQuery-like API
      $("input[name='username']").value("devglan")

      // a) typing text into input using core WebDriver API
      driver.findElement(By.name("password")).sendKeys("devglan")

      driver.findElement(By.xpath("//button[*[contains(text(),'Login')]]")).click()

      WebDriverWait wait = new WebDriverWait(driver, 10);
      wait.until(ExpectedConditions.titleIs("Products"))

      wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h1[text()='Simple Shop']")))
      wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h4/a[text()='A produkt']")))

    }
  }
}