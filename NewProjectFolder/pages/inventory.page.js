export class InventoryPage {

    constructor(page) {
        this.page = page;
        
        this.pageTitle = page.locator('[data-test="title"]');
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
        this.inventoryList = page.locator('[data-test="inventory-list"]');

        //Add To Cart Buttons
        this.fleeceJacket = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        this.backpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.boltTShirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        this.tShirtRed = page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
        this.bikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.onesie = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');

        this.sort = page.locator('[data-test="product-sort-container"]');
    }

    async getPageTitle() {
        return this.pageTitle.textContent();
    }

    async sortPriceHighToLow() {
        await this.sort.selectOption('hilo');
    }

    async getFirstItemName() {
        this.firstItem = this.page.locator('[data-test="inventory-item-name"]').first();
        const itemName = await this.firstItem.textContent();
        return itemName;
    }

    async addFirstItemFromListToCart() {
        await this.page.locator("//div[@data-test='inventory-item'][1]//button").click();
    }

    async addItemToCart(itemName) {
        await this[itemName].click();
    }

    async openCart() {
        await this.shoppingCart.click();
    }
}