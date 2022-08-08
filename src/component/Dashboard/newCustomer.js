const ARRAY_ITEM = [
    {
        id: 202201,
        name: 'Nguyễn Văn A',
        email: 'admin@example.com',
        avata: '/src/icon/avata1.png',
    },
    {
        id: 202203,
        name: 'Nguyễn Văn B',
        email: 'admin2@example.com',
        avata: '/src/icon/avata2.png',
    },
    {
        id: 202204,
        name: 'Nguyễn Văn C',
        email: 'admin3@example.com',
        avata: '/src/icon/avata3.png',
    },
    {
        id: 202205,
        name: 'Nguyễn Văn D',
        email: 'admin4@example.com',
        avata: '/src/icon/avata4.png',
    },
    {
        id: 202206,
        name: 'Nguyễn Văn E',
        email: 'admin5@example.com',
        avata: '/src/icon/avata5.png',
    },
    {
        id: 202207,
        name: 'Nguyễn Văn F',
        email: 'admin6@example.com',
        avata: '/src/icon/avata6.png',
    },
];
//check data in localstorage, and render
const arrNewCustomer = JSON.parse(localStorage.getItem('newCustomer'));
if (!arrNewCustomer) {
    localStorage.setItem('newCustomer', JSON.stringify(ARRAY_ITEM));
}
function renderNewCustomer(elementNewCustomer) {
    arrNewCustomer.forEach((item) => {
        elementNewCustomer.innerHTML += `<div><div class="table1--item"> <img class="table1--item--img" src=${item.avata} /><div class= "table1--info--name ">${item.name}<div class="table1--info--email">${item.email}</div></div></div></div>`;
    });
}
