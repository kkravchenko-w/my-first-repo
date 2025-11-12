export class CartPage {

    constructor(page) {
        this.page = page;

        this.cartList = page.locator('[data-test="cart-list"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.firstItem = page.locator('[data-test="inventory-item-name"]');
    }

    async getFirstItemName() {
        return this.firstItem.textContent();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async goBackToShopping() {
        await this.continueShoppingButton.click();
    }
}