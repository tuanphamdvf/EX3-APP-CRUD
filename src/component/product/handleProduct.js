//---- RENDER FROM ADDPRODUCT----
function renderAddProduct(elementAdd) {
    elementAdd.innerHTML = `<div id ="from-1" class="addproduct--header">
        <span class="addproduct--header--title">Thêm mới sản phẩm
        </span>
        <div class="addproduct--action">
            <a class="addproduct--save" id="create--product">Lưu lại</a>
            <a href="/#product" class="addproduct--back" id ="back--addproduct">Quay lại</a>
        </div>
    </div>
    <div class="wrapper--gribsytem">
        <div class="addproduct--content">
            <div class="addproduct--name">
                <input class="addproduct--input--name" placeholder=" Tên sản phẩm" id="addproduct__name" />
                <span class = "addproduct--name--warning">Bạn cần nhập tên sản phẩm !</span>
            </div>
            <div class="addproduct--number"> <input type="number" placeholder="cái"  class="addproduct--input--number"
                    id="addproduct__number" /><span class="addproduct--number--after">Số lượng</span></div>
            <div class="addproduct--group">
                <select class="addproduct--input--group" id="addproduct__group">
                    <option value="Mới tạo" disabled selected hidden>Loại SP</option>
                    <option>Chuột </option>
                    <option>Bàn phím</option>
                    <option>Ghế công thái học</option>
                    <option>Hub</option>
                    <option>Mới tạo</option>
                </select>
            </div>
            <div class="addproduct--status">
                <select class="addproduct--input--status" id="addproduct__status">
                    <option value="" disabled selected hidden> Trạng thái</option>
                    <option>Còn hàng </option>
                    <option>Đã hết</option>
                </select>
            </div>
            <div class="addproduct--date"> <input type="date" class="addproduct--input--date" /><span
                    class="addproduct--number--date" id="addproduct__date">Ngày tạo </span></div>
            <div class="addproduct--price"> <input type="number" placeholder="VND" class="addproduct--input--price"
                    id="addproduct__price"/><span  class="addproduct--number--price">Giá bán</span></div>
        </div>
    </div>`;
}
// ---- ADD PRODUCT ----
//Function - add one product to the last array
function addProductJson(data, callback) {
    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(productApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

// Function -obtain input product value
function handleOnclickAddproduct() {
    const nameNewProduct = document.getElementById('addproduct__name').value;
    const groupNewProduct = document.getElementById('addproduct__group').value;
    const elementDateValue = document.querySelector('.addproduct--input--date').value;
    let valuePrice = 0;
    let valueNumber = 0;
    let status = 'Hết hàng';
    //Check input
    const numberNewProduct = document.getElementById('addproduct__number');
    if (numberNewProduct.value != '') {
        valueNumber = numberNewProduct.value;
        status = 'Còn hàng';
    }
    const priceNewProduct = document.getElementById('addproduct__price');
    if (priceNewProduct.value != '') {
        valuePrice = priceNewProduct.value;
    }
    let itemData = {
        name: nameNewProduct,
        number: valueNumber,
        createDate: elementDateValue,
        group: groupNewProduct,
        price: valuePrice,
        status: status,
    };
    if (!nameNewProduct) {
        elementWaring.style.display = 'block';
    } else {
        addProductJson(itemData);
    }
}
//----DELETE PRODUCT----
//function:  When using onclick, remove one product.
function handleDeleteProduct(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(productApi + '/' + id, options).then(function (response) {
        return response.json();
    });
}
// Display popup delete
function showPopupDelete(id) {
    const buttonHandleDelete = document.querySelector('.popup--delete--' + id);
    buttonHandleDelete.style.display = 'flex';
}
function hidePopupDeleteProduct(id) {
    const buttonHandleDelete = document.querySelector('.popup--delete--' + id);
    buttonHandleDelete.style.display = 'none';
}
//----FILLTER----

window.addEventListener('load', () => {
    const elementFilterProdcut = document.getElementById('product--filter__id');
    const filterValue = document.getElementById('filter__id');

    if (filterValue) {
        fetch(productApi)
            .then(function (response) {
                return response.json();
            })
            .then(function (productItem) {
                paging(elementFilterProdcut, productItem);
            });
        filterValue.addEventListener('input', filterGoods);
        function filterGoods() {
            let filterName = document.querySelector('#filter__name').value;
            let filterGroup = filterValue.querySelector('#filter__group').value;
            let filterNumber = filterValue.querySelector('#filter__number').value;
            let filterStatus = filterValue.querySelector('#filter__status').value;
            let nameNew = removeVietnameseTones(filterName);

            fetch(productApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (productItem) {
                    let newArrayFilter = productItem.filter((n) => {
                        let nameProductDatabase = removeVietnameseTones(n.name);
                        return (
                            (!filterGroup || n.group == filterGroup) &&
                            (!filterNumber || n.number == filterNumber) &&
                            (!filterStatus || n.status == filterStatus) &&
                            (!nameNew || nameProductDatabase == nameNew)
                        );
                    });
                    elementFilterProdcut.innerHTML = '';
                    paging(elementFilterProdcut, newArrayFilter);
                });
        }
    }
});
//---- EDIT ----
//Show edit product, get value and handler edit
function showPopupEdit(id) {
    const buttonHandleEdit = document.querySelector('.popup--edit--' + id);
    document.querySelector('.wrapper--paging').style.display = 'none';
    buttonHandleEdit.style.display = 'flex';
    let editValue = document.getElementById('edit__id__' + id);
    const buttonEditSave = document.querySelector('#button__edit__save__' + id);
    console.log(editValue);
    if (editValue) {
        editValue.addEventListener('change', editFunction);
        function editFunction() {
            let editName = editValue.querySelector('#edit__product__name').value;
            let editGroup = editValue.querySelector('#edit__product__group').value;
            let editDate = editValue.querySelector('#edit__product__date').value;
            let numberEditProduct = editValue.querySelector('#edit__product__number').value;
            let priceEditProduct = editValue.querySelector('#edit__product__price').value;
            let valuePriceEdit = 0;
            let valueNumberEdit = 0;
            let statusEdit = 'Hết hàng';
            //check value input
            if (numberEditProduct != '') {
                valueNumberEdit = numberEditProduct;
                statusEdit = 'Còn hàng';
            }
            if (priceEditProduct != '') {
                valuePriceEdit = priceEditProduct;
            }
            let editData = {
                name: editName,
                number: valueNumberEdit,
                createDate: editDate,
                group: editGroup,
                price: valuePriceEdit,
                status: statusEdit,
            };
            buttonEditSave.addEventListener('click', () => {
                editProductJson(editData, id);
            });
        }
        buttonEditSave.addEventListener('click', () => {
            hidePopupEditProduct(id);
        });
    }
}

function hidePopupEditProduct(id) {
    const buttonHandleEdit = document.querySelector('.popup--edit--' + id);
    document.querySelector('.wrapper--paging').style.display = 'flex';
    buttonHandleEdit.style.display = 'none';
}
// API EDIT JSON
function editProductJson(data, id) {
    var option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(productApi + '/' + id, option).then(function (response) {
        return response;
    });
}
