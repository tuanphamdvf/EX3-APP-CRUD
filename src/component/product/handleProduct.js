// RENDER PRODUCT
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
            <div class="addproduct--number"> <input placeholder="cái"  class="addproduct--input--number"
                    id="addproduct__number" /><span class="addproduct--number--after">Số lượng</span></div>
            <div class="addproduct--group">
                <select class="addproduct--input--group" id="addproduct__group">
                    <option value="" disabled selected hidden>Loại SP</option>
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
            <div class="addproduct--price"> <input placeholder="VND" class="addproduct--input--price"
                    id="addproduct__price"/><span class="addproduct--number--price">Giá bán</span></div>
        </div>
    </div>`;
}
// ---- ADD PRODUCT ----

// // Validate -from
// document.addEventListener('DOMContentLoaded', function () {
//     // Mong muốn của chúng ta
//     Validator({
//         form: '#form-1',
//         formGroupSelector: '.form-group',
//         errorSelector: '.form-message',
//         rules: [Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn')],
//         onSubmit: function (data) {
//             // Call API
//             console.log(data);
//         },
//     });
// });
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
    const numberNewProduct = document.getElementById('addproduct__number').value;
    const groupNewProduct = document.getElementById('addproduct__group').value;
    const statusNewProduct = document.getElementById('addproduct__status').value;
    const priceNewProduct = document.getElementById('addproduct__price').value;
    const elementDateValue = document.querySelector('.addproduct--input--date').value;
    if (numberNewProduct == '') {
    }
    let itemData = {
        name: nameNewProduct,
        number: numberNewProduct,
        createDate: elementDateValue,
        group: groupNewProduct,
        price: priceNewProduct,
    };
    // addProductJson(itemData);
}
//---DELETE PRODUCT---
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
