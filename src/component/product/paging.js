// ---- PAGING----
function paging(elementProduct, productItem) {
    const elementPageSize = document.querySelector('.paging--short--number');
    const prePage = document.querySelector('.product--prePage');
    const nextPage = document.querySelector('.product--nextPage');
    const contentPageCount = document.getElementById('countpage');
    let totalProduct = productItem.length;
    let page_size = 10;
    let page_number = 1;
    let fromItemNumber = 1;
    let toItemNumber = 10;
    if (page_size > totalProduct) {
        toItemNumber = totalProduct;
    }
    let numberPage = countPage(productItem, page_size);
    // the previous page
    prePage.onclick = function () {
        //Obtain the current value and handle
        if (page_number > 1) {
            fromItemNumber = (page_number - 2) * parseInt(page_size) + 1;
            toItemNumber = fromItemNumber + parseInt(page_size) - 1;
            page_number = page_number - 1;
            const newArrayProduct = paginate(productItem, page_size, page_number);
            elementProduct.innerHTML = '';
            contentPageCount.innerHTML = `${fromItemNumber}- ${toItemNumber} of ${totalProduct}`;
            renderProducttable(elementProduct, newArrayProduct);
        }
    };
    // manage page size change
    elementPageSize.onchange = function () {
        //Obtain the current value and handle
        page_size = parseInt(elementPageSize.value); //
        numberPage = countPage(productItem, page_size); //
        fromItemNumber = (page_number - 1) * parseInt(page_size) + 1;
        toItemNumber = fromItemNumber + parseInt(page_size) - 1;

        elementProduct.innerHTML = '';
        // handle when you get to the last page
        if (totalProduct < page_size * page_number) {
            numberPage = countPage(productItem, page_size);
            page_number = Math.ceil(totalProduct / page_size);
            fromItemNumber = (page_number - 1) * parseInt(page_size) + 1;
        }
        if (toItemNumber > totalProduct) {
            toItemNumber = totalProduct;
        }
        const newArrayProduct = paginate(productItem, page_size, page_number);
        renderProducttable(elementProduct, newArrayProduct);
        contentPageCount.innerHTML = `${fromItemNumber}- ${toItemNumber} of ${totalProduct}`;
    };
    //next to the page
    nextPage.onclick = function () {
        if (page_number < numberPage) {
            //Obtain the current value and handle
            fromItemNumber = page_number * parseInt(page_size) + 1;
            toItemNumber = fromItemNumber + parseInt(page_size) - 1;
            page_number = page_number + 1;
            // handle when you get to the last page
            if (toItemNumber > totalProduct) {
                toItemNumber = totalProduct;
            }
            const newArrayProduct = paginate(productItem, page_size, page_number);
            elementProduct.innerHTML = '';

            contentPageCount.innerHTML = `${fromItemNumber}- ${toItemNumber} of ${totalProduct}`;
            renderProducttable(elementProduct, newArrayProduct);
        }
    };
    const newArrayProduct = paginate(productItem, page_size, page_number);
    contentPageCount.innerHTML = `${fromItemNumber}- ${toItemNumber} of ${totalProduct}`;
    renderProducttable(elementProduct, newArrayProduct);
}

//
//---- Handle string---Search  engine----
function removeVietnameseTones(str) {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
    str = str.replace(/??|??|???|???|??/g, 'i');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
    str = str.replace(/???|??|???|???|???/g, 'y');
    str = str.replace(/??/g, 'd');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
    str = str.replace(/??|??|???|???|??/g, 'I');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
    str = str.replace(/???|??|???|???|???/g, 'Y');
    str = str.replace(/??/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ?? ?? ?? ?? ??  h
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ?? ?? ??  ??, ??, ??, ??, ??
    // Remove extra spaces
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}
