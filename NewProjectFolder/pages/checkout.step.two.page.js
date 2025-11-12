export class CheckoutStepTwoPage {

    constructor(page) {
        this.page = page;

        this.summaryInfo = page.locator('.summary_info');
        this.priceTotal = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}