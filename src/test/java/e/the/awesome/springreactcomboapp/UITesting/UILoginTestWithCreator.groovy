package e.the.awesome.springreactcomboapp.UITesting

import e.the.awesome.springreactcomboapp.Creator
import e.the.awesome.springreactcomboapp.model.Product
import geb.Browser
import org.junit.jupiter.api.Test
import org.openqa.selenium.By
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

//NEFUNGUJE ZE PRY SPATNE PRIHLASOVACI UDAJE
@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT
)
class UILoginTestWithCreator {

  @Autowired
  private Creator creator;

  @Test
  void loginTest() {

    System.setProperty("webdriver.gecko.driver", "src\\test\\resources\\geckodriver.exe")

    creator.saveEntity(new Product(name: "A produkt", price: new BigDecimal(1800), category: "GPU", photo: "https://picsum.photos/200", description: "Jednoduchy popis"));

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
      wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h4[text()='A produkt']")))

    }
  }
}