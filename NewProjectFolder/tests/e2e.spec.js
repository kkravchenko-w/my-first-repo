import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutStepOnePage } from '../pages/checkout.step.one.page';
import { CheckoutStepTwoPage } from '../pages/checkout.step.two.page';
import { CheckoutCompletePage } from '../pages/checkout.complete.page';

test('Buy the most expensive item @ui', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    expect(await inventoryPage.getPageTitle()).toBe('Products');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await inventoryPage.sortPriceHighToLow();
    const itemName = await inventoryPage.getFirstItemName();
    await inventoryPage.addFirstItemFromListToCart();
    await inventoryPage.openCart();

    expect(await cartPage.getFirstItemName()).toBe(itemName);
    await cartPage.goToCheckout();

    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOnePage.goContinue();

    await checkoutStepTwoPage.finishCheckout();

    expect(await checkoutCompletePage.getComplitionMessage()).toBe('Thank you for your order!');
})