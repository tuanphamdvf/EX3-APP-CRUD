//---ROUTER--
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

//---HANDLER ----
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
    const elementPageSize = document.querySelector('.paging--short--number');
    const prePage = document.querySelector('.product--prePage');
    const nextPage = document.querySelector('.product--nextPage');
    const contentPageCount = document.getElementById('countpage');
    const loader = document.querySelector('.error--page');
    const submitAddProduct = document.getElementById('create--product');
    const elementAddProduct = document.getElementById('addproduct__id');
    const elementRemoveProduct = document.querySelector('.popup--delete');

    // handle render page
    if (elementProduct) {
        fetch(productApi)
            .then(function (response) {
                return response.json();
            })
            .then(function (productItem) {
                //handle pagging here
                // let totalProduct = productItem.length; // tổng số sản phẩm
                // let page_size = 10; // số sản phẩm 1 trang mặc định
                // let page_number = 1; // trang hiện tại mặc định
                // let fromItemNumber = 1; // giá trị bắt đầu của trang hiện tại mặc định
                // let toItemNumber = 10; // giá trị kết thúc của trang hiện tại mặc định
                // if (page_size > totalProduct) {
                //     toItemNumber = totalProduct;
                // }
                // let numberPage = countPage(productItem, page_size); // số page
                // // the previous page
                // prePage.onclick = function () {
                //     //Obtain the current value and handle
                //     if (page_number > 1) {
                //         fromItemNumber = (page_number - 2) * parseInt(page_size) + 1;
                //         toItemNumber = fromItemNumber + parseInt(page_size) - 1;
                //         page_number = page_number - 1;
                //         const newArrayProduct = paginate(productItem, page_size, page_number);
                //         elementProduct.innerHTML = '';
                //         contentPageCount.innerHTML = `${fromItemNumber}- ${toItemNumber} of ${totalProduct}`;
                //         renderProducttable(elementProduct, newArrayProduct);
                //     }
                // };
                // // manage page size change
                // elementPageSize.onchange = function () {
                //     //Obtain the current value and handle
                //     page_size = parseInt(elementPageSize.value); //
                //     numberPage = countPage(productItem, page_size); //
                //     fromItemNumber = (page_number - 1) * parseInt(page_size) + 1;
                //     toItemNumber = fromItemNumber + parseInt(page_size) - 1;

                //     elementProduct.innerHTML = '';
                //     // handle when you get to the last page
                //     if (totalProduct < page_size * page_number) {
                //         numberPage = countPage(productItem, page_size);
                //         page_number = Math.ceil(totalProduct / page_size);
                //         fromItemNumber = (page_number - 1) * parseInt(page_size) + 1;
                //     }
                //     if (toItemNumber > totalProduct) {
                //         toItemNumber = totalProduct;
                //     }
                //     const newArrayProduct = paginate(productItem, page_size, page_number);
                //     renderProducttable(elementProduct, newArrayProduct);
                //     contentPageCount.innerHTML = `${fromItemNumber}- ${toItemNumber} of ${totalProduct}`;
                // };
                // //next to the page
                // nextPage.onclick = function () {
                //     if (page_number < numberPage) {
                //         //Obtain the current value and handle
                //         fromItemNumber = page_number * parseInt(page_size) + 1;
                //         toItemNumber = fromItemNumber + parseInt(page_size) - 1;
                //         page_number = page_number + 1;
                //         // handle when you get to the last page
                //         if (toItemNumber > totalProduct) {
                //             toItemNumber = totalProduct;
                //         }
                //         const newArrayProduct = paginate(productItem, page_size, page_number);
                //         elementProduct.innerHTML = '';

                //         contentPageCount.innerHTML = `${fromItemNumber}- ${toItemNumber} of ${totalProduct}`;
                //         renderProducttable(elementProduct, newArrayProduct);
                //     }
                // };
                const newArrayProduct = paginate(productItem, page_size, page_number);
                contentPageCount.innerHTML = `${fromItemNumber}- ${toItemNumber} of ${totalProduct}`;
                renderProducttable(elementProduct, newArrayProduct);
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

        const saveProductButton = document.getElementById('create--product');
        saveProductButton.addEventListener('click', () => {
            // reloadRouter();

            handleOnclickAddproduct();
        });
        const backProductButton = document.getElementById('back--addproduct');
        backProductButton.addEventListener('click', reloadRouter);
    } else if (elementRemoveProduct) {
        console.log(elementRemoveProduct);
    } else {
        const html = (document.getElementById('loader').style.display = 'flex');
        window.location.reload();
    }
});
//--ERROR--
const hanleError = () => {
    setTimeout(() => {
        window.location.reload();
    }, 0);
};
