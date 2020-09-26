window.system = {};
import { Kerdx, Database } from 'https://kade-95.github.io/kerdx/index.js';
import { Item } from './components/item.js';
import { data } from './data.js';
import { Cart } from './components/cart.js';

window.kerdx = new Kerdx();
window.storage = new Database('Market');
window.database = data;
window.cart = new Cart();

const self = {};

system.smallScreen = window.matchMedia("(min-width: 700px)");
self.home = () => {
    storage.find({ collection: 'items', many: true }).then(storedItems => {
        cart.init(storedItems);
        let main = document.body.makeElement({
            element: 'main', attributes: { id: 'body-main' }, children: [
                {
                    element: 'div', attributes: { id: 'body-items' }, children: (() => {
                        let itemsList = [];
                        for (let item of database) {
                            let found = kerdx.array.find(storedItems, s => {
                                return s.name == item.name;
                            });

                            if(found != undefined) item.count = found.count;
                            itemsList.push(new Item(item).create())
                        }
                        return itemsList;
                    })()
                }
            ]
        });
    });
}

self.render = () => {
    let header = document.body.makeElement({
        element: 'header', attributes: { id: 'body-header' }, children: [
            { element: 'span', attributes: { id: 'app-name' }, text: 'Market' },
            {
                element: 'span', attributes: { id: 'body-header-controls' }, children: [
                    { element: 'input', attributes: { placeHolder: 'Search...', id: 'search-box' } },
                    { element: 'i', attributes: { class: 'fas fa-shopping-cart', id: 'body-header-cart' } },
                    { element: 'i', attributes: { class: 'fas fa-cog', id: 'body-header-settings' } }
                ]
            }
        ]
    });

    header.addEventListener('click', event => {
        if (event.target.id == 'body-header-cart') {
            cart.display();
        }
    });

    header.find('#search-box').onChanged(value => {
        let itemsList = document.body.findAll('.single-item');
        for (let item of itemsList) {
            if (item.dataset.name.toLowerCase().includes(value.toLowerCase())) {
                item.cssRemove(['display']);
            }
            else {
                item.css({ display: 'none' });
            }
        }
    });

    self.route();
}

self.route = () => {
    let { pathname } = location;
    pathname = pathname.replace('/Market', '');

    document.body.removeChildren({ except: ['#body-header'] });
    let active = document.body.find('.active.body-nav-link');
    if (active) active.removeClass('active');
    if (pathname == '/') {
        self.home();
    }
}

document.addEventListener('DOMContentLoaded', event => {
    self.render();
    kerdx.api.makeWebapp(event => {
        self.route();
    });
});