import { Checkout } from './checkout.js';
let checkout = new Checkout();
export function Cart() {
    const self = { items: {} };

    self.add = (name, count = 1) => {
        if (self.items[name] == undefined) {
            let item = kerdx.array.find(database, (content) => {
                return content.name == name;
            });
            self.items[name] = item;
            self.items[name].count = Math.floor(count);
        }
        else {
            self.items[name].count += Math.floor(count);
        }
        self.items[name].cost = self.items[name].price * self.items[name].count;
        storage.save({ collection: 'items', query: { name, count: self.items[name].count }, check: { name } }).then(saved => {
            console.log(saved);
        });
    }

    self.reduce = (name, count = 1) => {
        if (self.items[name] != undefined) {
            self.items[name].count -= Math.floor(count);
            self.items[name].cost = self.items[name].price * self.items[name].count;
            if (self.items[name].count == 0) {
                self.remove(name);
            }
            else {
                storage.save({ collection: 'items', query: { name, count: self.items[name].count }, check: { name: name } });
            }
        }
    }

    self.remove = (name) => {
        delete self.items[name];
        storage.delete({ collection: 'items', query: { name: name } });
    }

    self.clear = () => {
        for (let name in self.items) {
            self.items[name].removeFromCart(self.items[name].count);
            delete self.items[name];
        }
        storage.emptyCollection('items');
    }

    self.showEmpty = () => {
        let empty = kerdx.createElement({
            element: 'span', attributes: { id: 'empty-cart' }, text: 'Cart is Epmty. Please keep shopping'
        });
        return empty;
    }

    self.getTotal = () => {
        let total = 0;
        for (let name in self.items) {
            total += (self.items[name].price * self.items[name].count) * 1;
        }
        return total;
    }

    self.updateTotal = () => {
        self.page.find('#cart-total').textContent = `${kerdx.addCommaToMoney(self.getTotal().toString())}(NGN)`;
    }

    self.display = () => {
        let count = 0;
        self.page = kerdx.createElement({
            element: 'div', attributes: { id: 'cart-page' }, children: [
                {
                    element: 'div', attributes: { id: 'cart-items-container', style: { gridTemplateRows: `repeat(${Object.keys(self.items).length}, max-content)` } }, children: (() => {
                        let itemList = [];
                        for (let name in self.items) {
                            itemList.push(kerdx.createElement({
                                element: 'span', attributes: { class: 'cart-item', 'data-name': name }, children: [
                                    { element: 'a', attributes: { class: 'cart-item-data' }, text: count },
                                    {
                                        element: 'a', attributes: { class: 'cart-item-data' }, children: [
                                            { element: 'img', attributes: { class: 'cart-item-image', src: self.items[name].image } },

                                        ]
                                    },
                                    { element: 'a', attributes: { class: 'cart-item-data' }, text: self.items[name].name },
                                    { element: 'a', attributes: { class: 'cart-item-data cart-item-count' }, text: self.items[name].count },
                                    { element: 'a', attributes: { class: 'cart-item-data cart-item-cost' }, text: self.items[name].cost },
                                    { element: 'i', attributes: { class: 'fas fa-arrow-up cart-item-add cart-item-data' } },
                                    { element: 'i', attributes: { class: 'fas fa-arrow-down cart-item-reduce cart-item-data' } },
                                    { element: 'i', attributes: { class: 'fas fa-times cart-item-remove cart-item-data' } }
                                ]
                            }));
                            count++;
                        }
                        if (count == 0) {
                            itemList.push(self.showEmpty());
                        }
                        else {
                            itemList.unshift(kerdx.createElement({
                                element: 'span', attributes: { id: 'cart-header' }, children: [
                                    { element: 'a', attributes: { class: 'cart-header-title' }, text: 'S/N' },
                                    { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Image' },
                                    { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Name' },
                                    { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Count' },
                                    { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Cost' },
                                    { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Add' },
                                    { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Reduce' },
                                    { element: 'a', attributes: { class: 'cart-header-title' }, text: 'Remove' },
                                ]
                            }));
                        }
                        return itemList;
                    })()
                },
                {
                    element: 'span', attributes: { id: 'cart-total-container' }, children: [
                        { element: 'label', attributes: {}, text: 'Total: ' },
                        { element: 'a', attributes: { id: 'cart-total' }, text: `${kerdx.addCommaToMoney(self.getTotal().toString())}(NGN)` }
                    ]
                },
                {
                    element: 'span', attributes: { id: 'cart-buttons' }, children: [
                        { element: 'button', attributes: { id: 'cart-clear', class: 'cart-single-button' }, text: 'Clear' },
                        { element: 'button', attributes: { id: 'cart-continue', class: 'cart-single-button' }, text: 'Continue' },
                        { element: 'button', attributes: { id: 'cart-checkout', class: 'cart-single-button' }, text: 'Checkout' }
                    ]
                }
            ]
        });

        let popUp = kerdx.popUp(self.page, { attributes: { style: { width: system.smallScreen.matches ? '70%' : '100%', height: '100%', justifySelf: 'flex-end' } }, title: 'My Cart' });

        self.page.addEventListener('click', event => {
            if (event.target.classList.contains('cart-item-add')) {
                let singleItem = event.target.getParents('.cart-item');
                let name = singleItem.dataset.name;
                let item = kerdx.array.find(database, (content) => {
                    return content.name == name;
                });

                item.addToCart(1);
                singleItem.find('.cart-item-count').textContent = self.items[name].count;
                singleItem.find('.cart-item-cost').textContent = self.items[name].count * self.items[name].price;
                self.updateTotal();
            }
            else if (event.target.classList.contains('cart-item-reduce')) {
                let singleItem = event.target.getParents('.cart-item');
                let name = singleItem.dataset.name;
                let item = kerdx.array.find(database, (content) => {
                    return content.name == name;
                });

                item.removeFromCart(1);

                if (Object.keys(self.items).length == 0) {
                    self.page.replaceWith(self.display());
                }
                else if (self.items[name].count == 0) {
                    singleItem.remove();
                }
                else {
                    singleItem.find('.cart-item-count').textContent = self.items[name].count;
                    singleItem.find('.cart-item-cost').textContent = self.items[name].count * self.items[name].price;
                }
                self.updateTotal();
            }
            else if (event.target.classList.contains('cart-item-remove')) {
                let singleItem = event.target.getParents('.cart-item');
                let name = singleItem.dataset.name;
                let item = kerdx.array.find(database, (content) => {
                    return content.name == name;
                });

                item.removeFromCart(self.items[singleItem.dataset.name].count);
                singleItem.remove();

                if (Object.keys(self.items).length == 0) {
                    popUp.remove();
                    self.page.replaceWith(self.display());
                }
                self.updateTotal();
            }
            else if (event.target.id == 'cart-clear') {
                self.clear();
                popUp.remove();
                self.page.replaceWith(self.display());
                self.updateTotal();
            }
            else if (event.target.id == 'cart-continue') {
                popUp.remove();
            }
            else if (event.target.id == 'cart-checkout') {
                if (Object.keys(self.items).length == 0) {
                    alert('You have no item in Cart. Keep shopping');
                    return;
                }
                popUp.remove();
                checkout.display(self.items);
            }
        });
    }

    self.init = (storedItems) => {
        for (let i = 0; i < storedItems.length; i++) {
            let item = kerdx.array.find(database, (content) => {
                return content.name == storedItems[i].name;
            });
            item.count = storedItems[i].count;
            item.cost = item.price * item.count;
            self.items[item.name] = item;
        }
    }

    return self;
}