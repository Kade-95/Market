import { locations } from './../locations.js';
import { coupons } from './../coupons.js';

export function Checkout() {
    const self = {};
    self.buyer = { state: Object.keys(locations)[0], deliveryType: 'Door delivery' };

    self.display = (items) => {
        self.items = items;
        self.page = kerdx.createElement({
            element: 'div', attributes: { id: 'checkout-page' }, children: [
                {
                    element: 'div', attributes: { id: 'checkout-address', class: 'checkout-section' }, children: [
                        { element: 'a', attributes: { id: 'checkout-address-title', class: 'checkout-section-title' }, text: 'Enter your address' },
                        {
                            element: 'span', attributes: { class: 'checkout-section-block' }, children: [
                                { element: 'label', text: 'Full Name' },
                                { element: 'input', attributes: { name: 'name', class: 'checkout-section-data' } }
                            ]
                        },
                        {
                            element: 'span', attributes: { class: 'checkout-section-block' }, children: [
                                { element: 'label', text: 'State' },
                                { element: 'select', attributes: { name: 'state', class: 'checkout-section-data' }, options: Object.keys(locations) }
                            ]
                        },
                        {
                            element: 'span', attributes: { class: 'checkout-section-block' }, children: [
                                { element: 'label', text: 'Address' },
                                { element: 'input', attributes: { name: 'address', class: 'checkout-section-data' } }
                            ]
                        }
                    ]
                },
                {
                    element: 'span', attributes: { class: 'checkout-section', id: 'checkout-delivery' }, children: [
                        {
                            element: 'a', attributes: { class: 'checkout-section-title' }, text: 'Delivery Type'
                        },
                        {
                            element: 'span', attributes: { class: 'checkout-section-block' }, children: [
                                { element: 'label', text: 'Type' },
                                { element: 'select', attributes: { name: 'deliveryType', class: 'checkout-section-data' }, options: ['Door delivery', 'Pickup Station'] }
                            ]
                        }
                    ]
                },
                {
                    element: 'span', attributes: { class: 'checkout-section', id: 'checkout-pickup' }, children: [
                        {
                            element: 'a', attributes: { class: 'checkout-section-title' }, text: 'Pickup Stations'
                        },
                        {
                            element: 'span', attributes: { class: 'checkout-section-block' }, children: [
                                { element: 'label', text: 'Station' },
                                { element: 'select', attributes: { name: 'pickupStation', class: 'checkout-section-data' }, options: locations.Lagos.stations }
                            ]
                        },
                    ]
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
                                            { element: 'a', attributes: { class: 'cart-item-data' }, text: count },
                                            {
                                                element: 'a', attributes: { class: 'cart-item-data' }, children: [
                                                    { element: 'img', attributes: { class: 'cart-item-image', src: items[name].image } },

                                                ]
                                            },
                                            { element: 'a', attributes: { class: 'cart-item-data' }, text: items[name].name },
                                            { element: 'a', attributes: { class: 'cart-item-data' }, text: items[name].count },
                                            { element: 'a', attributes: { class: 'cart-item-data' }, text: items[name].cost },
                                        ]
                                    }))
                                }
                                itemList.unshift(kerdx.createElement({
                                    element: 'span', attributes: { id: 'checkout-header' }, children: [
                                        { element: 'a', attributes: { class: 'cart-header-title' }, text: 'S/N' },
                                        { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Image' },
                                        { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Name' },
                                        { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Count' },
                                        { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Cost' }
                                    ]
                                }));
                                return itemList;
                            })()
                        },
                        {
                            element: 'span', attributes: { id: 'checkout-coupon-container' }, children: [
                                { element: 'input', attributes: { id: 'checkout-coupon-box', placeHolder: 'Coupon code' } },
                                { element: 'button', attributes: { id: 'checkout-coupon-button' }, text: 'Use Coupon' }
                            ]
                        },
                        {
                            element: 'span', attributes: { id: 'checkout-fees-container' }, children: [
                                {
                                    element: 'span', attributes: { class: 'checkout-fees' }, children: [
                                        { element: 'label', text: 'Items total Fee' },
                                        { element: 'a', attributes: { id: 'checkout-items-fee' }, text: `${kerdx.addCommaToMoney(self.getItemsTotal().toString())}(NGN)` }
                                    ]
                                },
                                {
                                    element: 'span', attributes: { class: 'checkout-fees' }, children: [
                                        { element: 'label', text: 'Delivery Fee' },
                                        { element: 'a', attributes: { id: 'checkout-delivery-fee' }, text: `${kerdx.addCommaToMoney(self.getDeliveryFee().toString())}(NGN)` }
                                    ]
                                },
                                {
                                    element: 'span', attributes: { class: 'checkout-fees' }, children: [
                                        { element: 'label', text: 'Total' },
                                        { element: 'a', attributes: { id: 'checkout-total' }, text: `${kerdx.addCommaToMoney(self.getTotal().toString())}(NGN)` }
                                    ]
                                }
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

        let sections = self.page.findAll('.checkout-section');
        let backButton = self.page.find('#checkout-back');
        let nextButton = self.page.find('#checkout-next');
        let finishButton = self.page.find('#checkout-finish');
        let useCoupon = self.page.find('#checkout-coupon-button');

        backButton.css({ visibility: 'hidden' });
        finishButton.css({ visibility: 'hidden' });

        let sectionNo = 0;
        sections[sectionNo].classList.add('active');

        let pageClicked;

        self.page.addEventListener('click', event => {
            pageClicked = event.target;
            if (pageClicked == backButton) {
                sections[sectionNo].classList.remove('active');
                sectionNo--;
                if (sectionNo < 0) sectionNo = 0;
                sections[sectionNo].classList.add('active');
            }
            else if (pageClicked == nextButton) {
                kerdx.object.copy(kerdx.jsonForm(sections[sectionNo]), self.buyer);

                if (sectionNo == 0) {
                    if (self.buyer.address == '') {
                        alert('You need to set your address');
                        return;
                    }
                }
                else if (sectionNo == 1) {
                    if (self.buyer.deliveryType == 'Door delivery') {
                        sections[sectionNo].classList.remove('active');
                        sectionNo++;
                    }
                }
                else if (sectionNo == 2) {
                    self.updateFees();
                }
                sections[sectionNo].classList.remove('active');
                sectionNo++;
                if (sectionNo > sections.length - 1) sectionNo = sections.length - 1;
                sections[sectionNo].classList.add('active');
            }
            else if (pageClicked == finishButton) {
                popUp.remove();
                self.printReceipt();
            }
            else if (pageClicked == useCoupon) {
                self.applyCoupon(self.page.find('#checkout-coupon-box').value);
            }

            if (sectionNo == sections.length - 1) {
                nextButton.css({ visibility: 'hidden' });
                finishButton.cssRemove(['visibility']);
            }
            else if (sectionNo == 0) {
                backButton.css({ visibility: 'hidden' });
                finishButton.css({ visibility: 'hidden' });
            }
            else {
                backButton.cssRemove(['visibility']);
                nextButton.cssRemove(['visibility']);
                finishButton.css({ visibility: 'hidden' });
            }
        });
    }

    self.getItemsTotal = () => {
        let total = 0;
        for (let name in self.items) {
            total += (self.items[name].price * self.items[name].count) * 1;
        }
        return total;
    }

    self.getTotal = () => {
        let deliveryFee = self.getDeliveryFee();
        let itemsTotal = self.getItemsTotal();

        self.total = deliveryFee + itemsTotal;
        return self.total;
    }

    self.getDeliveryFee = () => {
        let fee = 0;

        if (self.buyer.deliveryType == 'Door delivery') {
            fee = locations[self.buyer.state].price;
        }

        return fee;
    }

    self.applyCoupon = (name) => {
        if (coupons[name] == undefined) return;
        self.total = self.getTotal() * coupons[name].cut;
        self.page.find('#checkout-total').textContent = `${kerdx.addCommaToMoney(self.total.toString())}(NGN)`;
    }

    self.updateFees = () => {
        this.page.find('#checkout-items-fee').textContent = `${kerdx.addCommaToMoney(self.getItemsTotal().toString())}(NGN)`;

        this.page.find('#checkout-delivery-fee').textContent = `${kerdx.addCommaToMoney(self.getDeliveryFee().toString())}(NGN)`;

        this.page.find('#checkout-total').textContent = `${kerdx.addCommaToMoney(self.getTotal().toString())}(NGN)`;
    }

    self.printReceipt = () => {
        let reciept = kerdx.createElement({
            element: 'span', attributes: { id: 'checkout-receipt' }, children: [
                { element: 'a', attributes: { id: 'checkout-receipt-salute' }, text: `Hello ${self.buyer.name || 'User'},` },
                { element: 'a', attributes: { id: 'checkout-receipt-message' }, text: 'Your order is being processed and will be delivered shortly' },
                { element: 'a', attributes: { id: 'checkout-receipt-bye' }, text: 'Thanks so much for shopping with us.' },
                { element: 'button', attributes: { id: 'checkout-receipt-continue' }, text: 'Continue' }
            ]
        })

        let popUp = kerdx.popUp(reciept, { attributes: { style: { width: system.smallScreen.matches ? '70%' : '100%', height: '100%', justifySelf: 'flex-end' } }, title: 'Checking Out' });

        reciept.find('#checkout-receipt-continue').addEventListener('click', event=>{
            popUp.remove();
        });
    }
    return self;
}