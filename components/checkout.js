export function Checkout() {
    const self = {};
    self.display = (items) => {
        self.page = kerdx.createElement({
            element: 'div', attributes: { id: 'checkout-page' }, children: [
                {
                    element: 'span', attributes: { class: 'checkout-section', id: 'checkout-section-address' }, children: []
                },
                {
                    element: 'span', attributes: { class: 'checkout-section', id: 'checkout-section-price' }, children: [
                        { element: 'a', attributes: { class: 'checkout-section-title' }, text: 'Items in cart' },
                        {
                            element: 'span', attributes: { id: 'checkout-items-container' }, children: (() => {
                                let itemList = [];
                                let count = 0;
                                for (let name in items) {
                                    count++;
                                    itemList.push(kerdx.createElement({
                                        element: 'span', attributes: { class: 'checkout-item' }, children: [
                                            { element: 'a', attributes: { class: 'cart-item-sn' }, text: count },
                                            { element: 'img', attributes: { class: 'cart-item-image', src: items[name].image } },
                                            { element: 'a', attributes: { class: 'cart-item-name' }, text: items[name].name },
                                            { element: 'a', attributes: { class: 'cart-item-cost' }, text: items[name].cost },
                                        ]
                                    }))
                                }
                                return itemList;
                            })()
                        },
                        {
                            element: 'span', attributes: { class: '', id: 'checkout-coupon-container' }, children: [
                                { element: 'input', attributes: { id: 'checkout-coupon-box', placeHolder: 'Coupon code' } },
                                { element: 'button', attributes: { id: 'checkout-coupon-button' }, text: 'Use Coupon' }
                            ]
                        },
                        {
                            element: 'span', attributes: { id: 'checkout-total-container' }, children: [
                                { element: 'label', attributes: { id: '' }, text: 'Total' },
                                { element: 'a', attributes: { id: 'checkout-total' }, text: `${self.getTotal(items)}(NGN)` }
                            ]
                        }
                    ]
                },
                {
                    element: 'span', attributes: { id: 'checkout-buttons' }, children: [
                        { element: 'button', attributes: { id: 'checkout-back', class: 'checkout-single-button' }, text: 'Back' },
                        { element: 'button', attributes: { id: 'checkout-finish', class: 'checkout-single-button' }, text: 'Finish' },
                        { element: 'button', attributes: { id: 'checkout-next', class: 'checkout-single-button' }, text: 'Next' }
                    ]
                }
            ]
        });

        let popUp = kerdx.popUp(self.page, { attributes: { style: { width: system.smallScreen.matches ? '70%' : '100%', height: '100%', justifySelf: 'flex-end' } }, title: 'Checking Out' });

    }

    self.getTotal = (items) => {
        let total = 0;
        for (let name in items) {
            total += (items[name].price * items[name].count) * 1;
        }
        return total;
    }

    return self;
}