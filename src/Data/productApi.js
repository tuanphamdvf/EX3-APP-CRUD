const productApi = 'http://localhost:3000/PRODUC_ITEM';
fetch(productApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (productItem) {});
