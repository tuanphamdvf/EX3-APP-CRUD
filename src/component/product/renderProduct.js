//---RENDER PRODUCT PAGE---
// // get array item in one page
// function paginate(array, page_size, page_number) {
//     const reverse = [...array].reverse();
//     return reverse.slice((page_number - 1) * page_size, page_number * page_size);
// }
// //get tottal page
// function countPage(array, page_size) {
//     if (array.length > page_size) {
//         return Math.ceil(array.length / page_size);
//     } else {
//         return 1;
//     }
// }
//add a dot before their number
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function renderProducttable(elementProduct, PRODUC_ITEM) {
    let focusElement;
    let statusProduct;
    let colorStatusProduct;

    PRODUC_ITEM.map((item, index) => {
        let idItem = item.id;

        if (index != 0 && index % 2 != 0) {
            focusElement = 'table--item--bold';
        } else {
            focusElement = '';
        }
        if (item.number > 0) {
            statusProduct = 'Còn hàng';
            colorStatusProduct = 'green--status';
        } else {
            statusProduct = 'Đã hết';
            colorStatusProduct = 'red--status';
        }
        let total = numberWithCommas(item.price);
        elementProduct.innerHTML += `<div class="product--item ${focusElement} " >
        <span class="product--item--content">${item.name}</span>
        <span class="product--item--content">${item.group}</span>
        <span class="product--item--time">${item.createDate}</span>
        <span class="product--item--content">${item.number} cái</span>
        <span class="product--item--content">${total} VND</span>
        <div class="product--item--content "><span class="product--item--status ${colorStatusProduct}" >${statusProduct}</span></div>
        <div class="product--item--content">
            <div class="container--icon--product">
                <a href ="/#edit" class="product--icon id" = "edit__product__icon ><img src="/src/icon/edit.svg" alt="edit"></a>
                <a onclick = "showPopupDelete(${item.id})" class="product--icon" id ="delete__product__icon" ><img src="/src/icon/delete.svg" alt="delete"></a>
                <div class="popup--delete  popup--delete--${item.id}">
                <div class="dlproduct--wrapper">
                    <span class="content--delete">Cảnh báo! Bạn có chắc chắn muốn xoá sản phẩm "${item.name} __ Mã SP : ${item.id}"!</span>
                    <div class="dlproduct--wrapper--button">
                    <a onclick="handleDeleteProduct(${item.id})" class="dlproduct--button--delete">Xoá</a>
                        <a onclick = "hidePopupDeleteProduct(${item.id})"class="dlproduct--button--back">Quay lại</a>
                    </div>
                </div></div>
            </div>
        </div></div>`;
    });
}
