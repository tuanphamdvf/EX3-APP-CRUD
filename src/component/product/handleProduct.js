function renderAddProduct(elementAdd) {
    elementAdd.innerHTML = `<div class="addproduct--header">
        <span class="addproduct--header--title">Thêm mới sản phẩm
        </span>
        <div class="addproduct--action">
            <a href="/#product" class="addproduct--save" id="create--product">Lưu lại</a>
            <a href="/#product" class="addproduct--back" id ="back--addproduct">Quay lại</a>
        </div>
    </div>
    <div class="wrapper--gribsytem">
        <div class="addproduct--content">
            <div class="addproduct--name">
                <input class="addproduct--input--name" placeholder=" Tên sản phẩm" id="addproduct__name" />
            </div>
            <div class="addproduct--number"> <input placeholder="cái" class="addproduct--input--number"
                    id="addproduct__number" /><span class="addproduct--number--after">Số lượng</span></div>
            <div class="addproduct--group">
                <select class="addproduct--input--group" id="addproduct__group">
                    <option value="" disabled selected hidden>Loại SP</option>
                    <option>chuột </option>
                    <option>bàn phím</option>
                    <option>ghế công thái học</option>
                    <option>hub</option>
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
            <div class="addproduct--price"> <input placeholder="VND" class="addproduct--input--price"
                    id="addproduct__price" /><span class="addproduct--number--price">Giá bán</span></div>
        </div>
    </div>`;
}

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
function handleOnclickAddproduct() {
    const nameNewProduct = document.getElementById('addproduct__name').value;
    const numberNewProduct = document.getElementById('addproduct__number').value;
    const groupNewProduct = document.getElementById('addproduct__group').value;
    const statusNewProduct = document.getElementById('addproduct__status').value;
    const priceNewProduct = document.getElementById('addproduct__price').value;
    console.log(nameNewProduct, numberNewProduct, groupNewProduct, statusNewProduct, priceNewProduct);
    let itemData = {
        name: nameNewProduct,
        number: numberNewProduct,
        createDate: ' June 01, 2022',
        group: groupNewProduct,
        price: priceNewProduct,
    };
    addProductJson(itemData);
}
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
    // const elementProductTarget = document.getElementById('product__element__' + id);
    // elementProductTarget.remove();
}
function showPopupDelete(item) {
    // const buttonHandleDelete = document.querySelector('.popup--delete');
    // buttonHandleDelete.style.display = 'flex';
    const elementProduct = document.getElementById('delete__element');
    console.log(elementProduct);
    elementProduct.innerHTML = `<div class="popup--delete">
    <div class="dlproduct--wrapper">
        <span class="content--delete">Cảnh báo! Bạn có chắc chắn muốn xoá sản phẩm ${item.name}!</span>
        <div class="dlproduct--wrapper--button">
        <a onclick="handleDeleteProduct(${item.id})" class="dlproduct--button--delete">Xoá</a>
            <a onclick = "hidePopupDeleteProduct()"class="dlproduct--button--back">Quay lại</a>
        </div>
    </div></div>`;
}
function hidePopupDeleteProduct() {
    // const buttonHandleDelete = document.querySelector('.popup--delete');
    // buttonHandleDelete.style.display = 'none';
    const elementProduct = document.getElementById('delete__element');
    elementProduct.in;
}
