export function Item(details) {
    const self = details || {};

    self.create = () => {
        self.element = kerdx.createElement({
            element: 'span', attributes: { class: 'single-item', 'data-name': self.name }, children: [
                { element: 'img', attributes: { class: 'single-item-image', src: self.image } },
                {
                    element: 'span', attributes: { class: 'single-item-details' }, children: [
                        { element: 'span', attributes: { class: 'single-item-name' }, text: self.name },
                        {
                            element: 'span', attributes: { class: 'single-item-other-details' }, children: [
                                { element: 'a', attributes: { class: 'single-item-price' }, text: `#${self.price}` },
                                { element: 'a', attributes: { class: 'single-item-quantity' }, text: `${self.quantity}(qty)` }
                            ]
                        }
                    ]
                },
                {
                    element: 'span', attributes: { class: 'single-item-controls' }, children: [
                        {
                            element: 'i', attributes: { class: 'fas fa-minus single-item-remove' }
                        },
                        { element: 'a', attributes: { class: 'single-item-count' }, text: '0' },
                        {
                            element: 'i', attributes: { class: 'fas fa-plus single-item-add' }
                        }
                    ]
                }
            ]
        });

        self.element.addEventListener('click', event => {
            if (event.target.classList.contains('single-item-add')) {
                self.addToCart();
            }
            else if (event.target.classList.contains('single-item-remove')) {
                self.removeFromCart();
            }
            else {
                self.display();
            }
        });

        return self.element;
    }

    self.addToCart = (count = 1) => {
        let currentQuantity = Math.floor(self.element.find('.single-item-count').textContent);
        if (self.quantity > currentQuantity) {
            currentQuantity = currentQuantity + count;
            self.element.find('.single-item-count').textContent = currentQuantity;
            cart.add(self.name, count);
        }
        return currentQuantity;
    }

    self.removeFromCart = (count = 1) => {
        let currentQuantity = Math.floor(self.element.find('.single-item-count').textContent);
        if (0 < currentQuantity) {
            currentQuantity = currentQuantity - count;
            self.element.find('.single-item-count').textContent = currentQuantity;
            cart.reduce(self.name, count);
        }
        return currentQuantity;
    }

    self.display = () => {
        self.page = kerdx.createElement({
            element: 'div', attributes: { class: 'single-item-page' }, children: [
                self.element.cloneNode(true),
                {
                    element: 'span', attributes: { class: 'single-item-description-container' }, children: [
                        { element: 'a', attributes: { class: 'single-item-name' }, text: 'Description' },
                        {
                            element: 'span', attributes: { class: 'single-item-description' }, children: (() => {
                                let descriptionList = [];
                                for (let desc of self.description || []) {
                                    descriptionList.push(kerdx.createElement({
                                        element: 'span', attributes: { class: 'single-item-description-block' }, children: [
                                            { element: 'i', attributes: { class: 'fas fa-arrow-right' } },
                                            { element: 'a', attributes: { class: 'single-item-description-value' }, text: desc }
                                        ]
                                    }))
                                }
                                return descriptionList;
                            })()
                        }
                    ]
                }
            ]
        });

        let popUp = kerdx.popUp(self.page, { attributes: { style: { width: system.smallScreen.matches ? '70%' : '100%', height: '100%', justifySelf: 'flex-end' } }, title: `Item: ${self.name}` });

        self.page.addEventListener('click', event => {
            if (event.target.classList.contains('single-item-add')) {
                self.page.find('.single-item-count').textContent = self.addToCart();
            }
            else if (event.target.classList.contains('single-item-remove')) {
                self.page.find('.single-item-count').textContent = self.removeFromCart();
            }
        });
    }

    return self;
}