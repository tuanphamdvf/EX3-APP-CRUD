const ARRAY_ODER = [
    {
        id: 20220701,
        name: 'Nguyễn Văn A',
        time: 'June 01, 2022',
        status: 'Hoàn thành',
        color: 'green--status',
        total: 2300000,
    },
    {
        id: 20220703,
        name: 'Nguyễn Văn B',
        time: 'June 03, 2022',
        status: 'Đang xử lý',
        color: 'gray--status',
        total: 2000000,
    },
    {
        id: 20220704,
        name: 'Nguyễn Văn C',
        time: 'June 03, 2022',
        status: 'Hoàn thành',
        color: 'green--status',
        total: 500000,
    },
    {
        id: 20220705,
        name: 'Nguyễn Văn D',
        time: 'June 04, 2022',
        status: 'Đã hủy',
        color: 'red--status',
        total: 200000,
    },
    {
        id: 20220706,
        name: 'Nguyễn Văn E',
        time: 'June 06, 2022',
        status: 'Đang giao',
        color: 'blue--status',
        total: 1400000,
    },
];
//set dot after three digits
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
//check data in localstorage, and render
const arrNewOder = JSON.parse(localStorage.getItem('newOder'));
if (!arrNewOder) {
    localStorage.setItem('newOder', JSON.stringify(ARRAY_ODER));
}

function renderOder(oderElement) {
    let focusElement;
    arrNewOder.forEach((item, index) => {
        if (index != 0 && index % 2 != 0) {
            focusElement = 'table--item--bold';
        } else {
            focusElement = '';
        }
        let total = numberWithCommas(item.total);
        oderElement.innerHTML += `<div class="table3--item ${focusElement} "><span class="table3--item--name">${item.name}</span><span class="table3--item--date">${item.time}</span><span class="table3--item--number">${total} VND</span><div class="table3--item--status "> <span class="table3--item--des ${item.color}">${item.status}</span> </div></div>`;
    });
}
