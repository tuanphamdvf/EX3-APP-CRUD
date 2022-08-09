//----RENDER PRODUCT PAGE----
// get array item in one page
function paginate(array, page_size, page_number) {
    const reverse = [...array].reverse();
    return reverse.slice((page_number - 1) * page_size, page_number * page_size);
}
//get tottal page
function countPage(array, page_size) {
    if (array.length > page_size) {
        return Math.ceil(array.length / page_size);
    } else {
        return 1;
    }
}
//add a dot before their number
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
//function render product
function renderProducttable(elementProduct, PRODUC_ITEM) {
    let focusElement;
    let statusProduct;
    let colorStatusProduct;

    PRODUC_ITEM.map((item, index) => {
        if (index != 0 && index % 2 != 0) {
            focusElement = 'table--item--bold';
        } else {
            focusElement = '';
        }
        if (item.number > 0) {
            statusProduct = 'Còn hàng';
            colorStatusProduct = 'green--status';
        } else {
            statusProduct = 'Hết hàng';
            colorStatusProduct = 'red--status';
        }
        let total = numberWithCommas(item.price);
        elementProduct.innerHTML += `<div class="product--item ${focusElement} ">
        <span class="product--item--content">${item.name}</span>
        <span class="product--item--content">${item.group}</span>
        <span class="product--item--time">${item.createDate}</span>
        <span class="product--item--content">${item.number} cái</span>
        <span class="product--item--content">${total} VND</span>
        <div class="product--item--content "><span
                class="product--item--status ${colorStatusProduct}">${statusProduct}</span></div>
        <div class="product--item--content">
            <div class="container--icon--product">
                <a onclick="showPopupEdit(${item.id})" class="product--icon id"="edit__product__icon ><img src="
                    /src/icon/edit.svg" alt="edit"></a>
                <a onclick="showPopupDelete(${item.id})" class="product--icon" id="delete__product__icon"><img
                        src="/src/icon/delete.svg" alt="delete"></a>
                <div class="popup--delete  popup--delete--${item.id}">
                    <div class="dlproduct--wrapper">
                        <span class="content--delete">Cảnh báo! Bạn có chắc chắn muốn xoá sản phẩm "${item.name} __ Mã SP :
                            ${item.id}"!</span>
                        <div class="dlproduct--wrapper--button">
                            <a onclick="handleDeleteProduct(${item.id})" class="dlproduct--button--delete">Xoá</a>
                            <a onclick="hidePopupDeleteProduct(${item.id})" class="dlproduct--button--back">Quay lại</a>
                        </div>
                    </div>
                </div>
                <div class="wrapper--edit popup--edit--${item.id}">
                    <div class="editproduct--wrapper ">
                        <div class="editproduct--header">
                            <span class="editproduct--header--title">Cập nhật sản phẩm
                            </span>
                            <div class="editproduct--action">
                                <a id = "button__edit__save__${item.id}" class="editproduct--save">Lưu lại</a>
                                <a onclick="hidePopupEditProduct(${item.id})" class="editproduct--back">Quay lại</a>
                            </div>
                        </div>
                        <div class="wrapper--gribsytem">
                            <div class="editproduct--content" id ="edit__id__${item.id}">
                                <div class="editproduct--name">
                                    <input value = "${item.name}" class="editproduct--input--name"id ="edit__product__name" placeholder="Sản phẩm" />
                                    <span class="editproduct--name--after ">Tên sản phẩm</span>
                                </div>
                                <div class="editproduct--number"> <input value = "${item.number}" placeholder="cái" id ="edit__product__number"
                                        class="editproduct--input--number" /><span class="editproduct--number--after">Số
                                        lượng</span></div>
                                <div class="editproduct--group">
                                    <select value="${item.group}" class="editproduct--input--group" id ="edit__product__group">
                                        <option>chuột </option>
                                        <option>bàn phím</option>
                                        <option>ghế công thái học</option>
                                        <option>hub</option>
                                    </select>
                                    <span class="editproduct--group--after">Loại Sp</span>
                                </div>
                                <div class="editproduct--status">
                                    <select value="${statusProduct} id ="input__edit__status" class="editproduct--input--status">
                                        <option>Còn hàng </option>
                                        <option>Đã hết</option> 
                                    </select>
                                    <span class="editproduct--status--after">Trạng thái</span>
                                </div>
                                <div class="editproduct--date"> <input id ="edit__product__date" type="date" value ="${item.createDate}" class="editproduct--input--date" /><span
                                        class="editproduct--number--date">Ngày
                                        tạo </span></div>
                                <div  class="editproduct--price"> <input id ="edit__product__price" value = "${item.price}" placeholder="VND"
                                        class="editproduct--input--price" /><span class="editproduct--number--price">Giá
                                        bán</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="wrapper--footer--edit">
                    <div class="footer">
                    <span class="footer--content">© 2022 VnSolution. All rights reserved.</span>
                    <div class="footer--wrapper--icon">
                    <img class="footet--icon" src="/src/icon/fb.svg" />
                    <img class="footet--icon" src="/src/icon/twitter.svg" />
                    <img class="footet--icon" src="/src/icon/github.svg" />

            </div>
        </div>
    </div>
                </div>
            </div>
        </div>
    </div>`;
    });
}
