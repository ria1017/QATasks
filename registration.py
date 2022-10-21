from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def test_something():
    driver = webdriver.Chrome(executable_path='/Users/valeriiasobakar/Downloads/chromedriver')
    driver.get('https://guest:welcome2qauto@qauto2.forstudy.space/')
    driver.maximize_window()

    #Sign up
    driver.find_element(By.CSS_SELECTOR, 'body > app-root > app-global-layout > div > div > div > app-guest-layout > div > app-home > section > div > div > div.col-12.col-lg-4 > div > button').click()
    driver.find_element(By.CSS_SELECTOR, '#signupName').send_keys('Ben')
    driver.find_element(By.CSS_SELECTOR, '#signupLastName').send_keys('Benich')
    driver.find_element(By.CSS_SELECTOR, '#signupEmail').send_keys('superFancyNewEmail@1gmail.com')
    driver.find_element(By.CSS_SELECTOR, '#signupPassword').send_keys('12345678Sl')
    driver.find_element(By.CSS_SELECTOR, '#signupRepeatPassword').send_keys('12345678Sl')
    driver.find_element(By.CSS_SELECTOR, 'body > ngb-modal-window > div > div > app-signup-modal > div.modal-footer > button').click()
    time.sleep(5)
    buttonTitle = driver.find_element(By.CSS_SELECTOR, "#userNavDropdown").text
    assert buttonTitle == "My profile"

    #Logout
    driver.find_element(By.CSS_SELECTOR,'body > app-root > app-global-layout > div > div > div > app-panel-layout > div > div > div > div.col-3.d-none.d-lg-block.sidebar-wrapper > nav > a.btn.btn-link.text-danger.btn-sidebar.sidebar_btn').click()
    time.sleep(3)
    signInButton = driver.find_element(By.CSS_SELECTOR, 'button.btn.btn-outline-white.header_signin')
    assert signInButton.text == 'Sign In'

    #Login
    signInButton.click()
    driver.find_element(By.CSS_SELECTOR, '#signinEmail').send_keys('valeriia123@gmail.com')
    driver.find_element(By.CSS_SELECTOR, '#signinPassword').send_keys('12345678Sl')
    driver.find_element(By.CSS_SELECTOR, 'body > ngb-modal-window > div > div > app-signin-modal > div.modal-footer.d-flex.justify-content-between > button.btn.btn-primary').click()
    time.sleep(3)
    buttonTitle = driver.find_element(By.CSS_SELECTOR, "#userNavDropdown").text
    assert buttonTitle == "My profile"
    time.sleep(3)















