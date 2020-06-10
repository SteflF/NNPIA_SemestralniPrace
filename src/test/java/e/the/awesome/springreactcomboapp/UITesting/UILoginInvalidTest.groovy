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
class UILoginInvalidTest{

    @Test
    void invalidLoginTest(){
        System.setProperty("webdriver.gecko.driver", "src\\test\\resources\\geckodriver.exe")

        Browser.drive {
            go 'http://localhost:3000/'
            assert title == "Login | UPCE"

            $("input[name='username']").value("devglan")

            driver.findElement(By.name("password")).sendKeys("nespravneHeslo")

            driver.findElement(By.xpath("//button[*[contains(text(),'Login')]]")).click()

            WebDriverWait wait = new WebDriverWait(driver, 10);

            assert title == "Login | UPCE"
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h4[contains(text(),'Bad credentials')]")))
        }
    }
}