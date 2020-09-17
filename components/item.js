export function Item(details) {
    const self = details || {};

    self.create = () => {
        self.element = kerdx.createElement({
            element: 'span', attributes: { class: 'single-item', 'data-name': self.name }, children: [
                { element: 'img', attributes: { class: 'single-item-image', src: self.image } },
                {
                    element: 'span', attributes: { class: 'single-item-details' }, children: [
                        { element: 'a', attributes: { class: 'single-item-name' }, text: self.name },
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
        });

        return self.element;
    }

    self.addToCart = (count = 1) => {
        let currentQuantity = Math.floor(self.element.find('.single-item-count').textContent);
        if (self.quantity > currentQuantity) {
            self.element.find('.single-item-count').textContent = currentQuantity + count;
            cart.add(self.name, count);
        }
    }

    self.removeFromCart = (count = 1) => {
        let currentQuantity = Math.floor(self.element.find('.single-item-count').textContent);
        if (0 < currentQuantity) {
            self.element.find('.single-item-count').textContent = currentQuantity - count;
            cart.reduce(self.name, count);
        }
    }

    return self;
}