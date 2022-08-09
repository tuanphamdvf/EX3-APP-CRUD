//----ROUTER----
//make  path routers
const routes = {
    404: {
        template: '/src/templates/404.html',
        title: '404 | ',
    },
    '/': {
        template: '/src/templates/dasdboard.html',
        title: 'Home | ',
    },
    product: {
        template: '/src/templates/product.html',
        title: 'Product | ',
    },
    add: {
        template: '/src/templates/addproduct.html',
        title: 'Add Product |',
    },
    edit: {
        template: '/src/templates/editproduct.html',
        title: 'Edit Product |',
    },
    delete: {
        template: '/src/templates/deleteproduct.html',
        title: 'Delete Product|',
    },
    filter: {
        template: '/src/templates/filterproduct.html',
        title: 'Search |',
    },
};
//router reload
function reloadRouter() {
    locationHandler();
    setTimeout(() => {
        window.location.reload();
    }, 0);
}
//get element route
const titleDashboard = document.getElementById('title__dashbroad');
const titleProduct = document.getElementById('title__product');

//then reload the page
const onclickElement = document.querySelector('.sidebar--item--wrapper');
onclickElement.addEventListener('click', reloadRouter);
//handle router
async function locationHandler() {
    var path = window.location.hash.replace('#', '');

    switch (path) {
        case '':
            titleDashboard.classList.add('active');
            break;
        case 'product':
            titleProduct.classList.add('active');
            titleDashboard.classList.remove('active');
    }
    if (path.length == 0) {
        path = '/';
    }
    const route = routes[path] || routes['404'];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById('main--page').innerHTML = html;
    document.title = route.title;
}
window.addEventListener('hashchange', locationHandler, false);
locationHandler();

//----HANDLER -----
//API fake
const productApi = 'http://localhost:3000/PRODUC_ITEM';
//get date current
var date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
if (month < 10) month = '0' + month;
if (day < 10) day = '0' + day;
let today = year + '-' + month + '-' + day;

// table element rendering
window.addEventListener('load', function () {
    const elementNewCustomer = document.getElementById('newCustomer');
    const elementProduct = document.getElementById('product__id');
    const oderElement = document.querySelector('.table3--wrapper--item');
    const productElement = document.querySelector('.table2--wrapper--item');
    const elementAddProduct = document.getElementById('addproduct__id');
    const elementRemoveProduct = document.querySelector('.popup--delete');
    const elementFilterProdcut = document.getElementById('product--filter__id');
    const searchProductElement = document.querySelector('.product--search--input');

    // handle render page
    if (elementProduct) {
        fetch(productApi)
            .then(function (response) {
                return response.json();
            })
            .then(function (productItem) {
                paging(elementProduct, productItem);
            });
        document.querySelector('.product--button--add').addEventListener('click', reloadRouter);
        document.querySelector('.product--button--filter').addEventListener('click', reloadRouter);
    } else if (elementNewCustomer) {
        renderNewCustomer(elementNewCustomer);
        renderOder(oderElement);
        renderProduct(productElement);
    } else if (elementAddProduct) {
        renderAddProduct(elementAddProduct);
        const elementDate = document.querySelector('.addproduct--input--date');
        elementDate.value = today;
        // Validate from add Product
        const saveProductButton = document.getElementById('create--product');
        const nameProductNew = document.getElementById('addproduct__name');
        const elementWaring = document.querySelector('.addproduct--name--warning');
        nameProductNew.onblur = () => {
            if (nameProductNew.value == '') {
                elementWaring.style.display = 'block';
            } else {
                elementWaring.style.display = 'none';
                saveProductButton.href = '/#product';
                saveProductButton.addEventListener('click', () => {
                    // reloadRouter();
                    handleOnclickAddproduct();
                });
            }
        };
        nameProductNew.onfocus = () => {
            elementWaring.style.display = 'none';
        };
        const backProductButton = document.getElementById('back--addproduct');
        backProductButton.addEventListener('click', reloadRouter);
    } else if (elementRemoveProduct) {
    } else if (elementFilterProdcut) {
        const elementButtonHideFilter = document.querySelector('.product--button--filter');
        elementButtonHideFilter.addEventListener('click', reloadRouter);
    } else {
        const html = (document.getElementById('loader').style.display = 'flex');
        window.location.reload();
    }
});
//----ERROR----
const hanleError = () => {
    setTimeout(() => {
        window.location.reload();
    }, 0);
};
