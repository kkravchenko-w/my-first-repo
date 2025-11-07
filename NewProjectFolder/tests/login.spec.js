
const { test, expect } = require('@playwright/test');

test.describe('Sauc Demo login', () => {

    test('successful login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');

        await page.locator('[placeholder="Password"]').fill('secret_sauce');

        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

});

test.describe('login blocked user', () => {

    test('login blocked show error msg', async ({page}) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('locked_out_user');

        await page.locator('[placeholder="Password"]').fill('secret_sauce');

        await page.locator('[data-test="login-button"]').click();

        await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
    });

});
