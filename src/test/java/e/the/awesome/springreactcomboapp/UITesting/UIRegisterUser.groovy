
package e.the.awesome.springreactcomboapp.UITesting

import geb.Browser
import org.junit.jupiter.api.Test
import org.openqa.selenium.By
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT
)
class UIRegisterUser{

    @Test
    void userSuccessfulRegistrationTest() {

        System.setProperty("webdriver.gecko.driver", "src\\test\\resources\\geckodriver.exe")

        Browser.drive {
            go 'http://localhost:3000/registration'
            assert title == "Add user | UPCE"

            driver.findElement(By.name("username")).sendKeys("testUser")
            driver.findElement(By.name("password")).sendKeys("testUser")
            driver.findElement(By.name("firstName")).sendKeys("Test")
            driver.findElement(By.name("lastName")).sendKeys("Test")
            driver.findElement(By.name("email")).sendKeys("test@test.com")

            driver.findElement(By.xpath("//button[*[contains(text(),'Register')]]")).click()

            WebDriverWait wait = new WebDriverWait(driver, 10)
            wait.until(ExpectedConditions.titleIs("Login | UPCE"))

            $("input[name='username']").value("testUser")

            // a) typing text into input using core WebDriver API
            driver.findElement(By.name("password")).sendKeys("testUser")

            driver.findElement(By.xpath("//button[*[contains(text(),'Login')]]")).click()

            wait.until(ExpectedConditions.titleIs("Products"))
        }
    }
}