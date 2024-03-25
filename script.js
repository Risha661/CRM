// 'use strict';

// const modalH2 = document.querySelector('.modal__title');
// console.log(modalH2);

// const modalForm = document.querySelector('.modal__form');
// console.log(modalForm);

// const modalCheckbox = document.querySelector('.modal__checkbox');
// console.log(modalCheckbox);

// const modalInput = document.querySelector('.modal__input_discount');
// console.log(modalInput);

document.querySelector('.overlay').classList.remove('active');

const obj = {
  id: '24601654816512',
  name: 'Телевизор DEXP',
  category: 'Техника для дома',
  unit: 'шт',
  quantity: 15,
  price: 1000,
  total: 15000,
};

const goods = [
  {
    id: 34234353524553,
    name: 'Смартфон Xiaomi 11T 8/128GB',
    category: 'Смартфоны',
    unit: 'шт',
    quantity: 20,
    price: '500',
    total: '',
  },
  {
    id: 4242423434344,
    name: 'Радиоуправляемый автомобиль Cheetan',
    category: 'Игрушки',
    unit: 'шт',
    quantity: 1,
    price: '4000',
    total: '',
  },
];

function createRow(obj) {
  let index = obj.length + 1;

  const row = document.createElement('tr');

  const indexCell = document.createElement('td');
  indexCell.classList.add('table__cell', 'table__cell_index');
  row.appendChild(indexCell);

  for (const key in obj) {
    const cell = document.createElement('td');
    cell.classList.add('table__cell');
    if (key === 'name') {
      cell.classList.add('table__cell_left', 'table__cell_name');
      const spanCell = document.createElement('span');
      spanCell.classList.add('table__cell-id');
      spanCell.textContent = `id: ${obj['id']}`;
      cell.appendChild(spanCell);
      cell.appendChild(document.createTextNode(obj[key]));
    } else if (key === 'category') {
      cell.classList.add('table__cell_left');
      cell.textContent = obj[key];
    } else if (key === 'price') {
      cell.textContent = `$ ${obj['price']}`;
    } else if (key === 'total') {
      cell.textContent = `$ ${obj['price'] * obj['quantity']}`;
    } else {
      cell.textContent = obj[key];
    }
    row.appendChild(cell);
  }

  const btnWrap = document.createElement('td');
  btnWrap.classList.add('table__cell', 'table__cell_btn-wrapper');
  row.appendChild(btnWrap);
  const btnPic = document.createElement('button');
  btnPic.classList.add('table__btn', 'table__btn_pic');
  btnWrap.appendChild(btnPic);
  const btnEdit = document.createElement('button');
  btnEdit.classList.add('table__btn', 'table__btn_edit');
  btnWrap.appendChild(btnEdit);
  const btnDel = document.createElement('button');
  btnDel.classList.add('table__btn', 'table__btn_del');
  btnWrap.appendChild(btnDel);

  return function() {
    indexCell.textContent = index;
    index++;
    return row;
  };
};

function renderGoods(goods) {
  const table = document.querySelector('.table__body');

  let rowIndex = table.children.length + 1;
  goods.forEach((obj) => {
    const createRowWithIndex = createRow(obj);
    const row = createRowWithIndex();
    rowIndex++;
    row.cells[0].textContent = rowIndex;
    row.cells[1].remove();
    table.appendChild(row);
    const rowCount = row.cells.length;
    console.log('Количество строк в таблице:' + rowCount);
  });

  return {
    table,
  }
};

renderGoods(goods);

const btnAdd = document.querySelector('.panel__add-goods');
const overlayForm = document.querySelector('.overlay');
btnAdd.addEventListener('click', () => {
  overlayForm.classList.add('active');

  function generateRandomId() {
    let id = '';
    const digits = '0123456789';
    const idLength = 14;

    for (let i = 0; i < idLength; i++) {
        id += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return id;
  };

  const randomId = generateRandomId();
  const vendorCode = document.querySelector('.vendor-code__id');
  vendorCode.textContent = randomId;
});

overlayForm.addEventListener('click', e => {
  const target = e.target;

  if (target.classList.contains('overlay')) {
    overlayForm.classList.remove('active');
  }
});

document.querySelector('.modal__checkbox').addEventListener('click', e => {
  const discountCountInput = document.querySelector('.modal__input_discount');
  const target = e.target;
  discountCountInput.removeAttribute('disabled');
  if (target.checked) {
    discountCountInput.removeAttribute('disabled');
  } else {
    discountCountInput.setAttribute('disabled', 'disabled');
    discountCountInput.value = '';
  }
});

// const inputFields = document.querySelectorAll('.modal__input');
//   inputFields.forEach(function(input) {
//     input.setAttribute('required', 'required');
//   }); //реализация обязательного заполнения всех полей формы

const units = document.getElementById('units');
units.type = 'text';
units.classList.add('.table__cell_left');
const count = document.getElementById('count');
count.type = 'number';
const price = document.getElementById('price');
price.type = 'number';
const discount = document.querySelector('.modal__input_discount');
discount.type = 'number';


const closeModalControl = () => {
  document.querySelector('.overlay').classList.remove('active');
}

document.querySelector('.modal__close').addEventListener('click', () => {
  closeModalControl();
});


document.querySelector('.goods__table-wrapper').addEventListener('click', e => {
  const target = e.target;

  if (target.classList.contains('table__btn_del')) {
    const row = target.closest('tr');
    if (row) {
      const id = parseInt(row.querySelector('.table__cell-id').textContent.replace('id: ', ''));
      row.remove();

      const index = goods.findIndex(item => item.id === id);
      if (index !== -1) {
        goods.splice(index, 1);
      } // Удалила данные из массива объектов goods
    }

    console.log(row);
    console.log(goods);
  }
});

const form = document.querySelector('.modal__form');

const sentData = data => console.log(data);

const formControl = (form) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newGood = Object.fromEntries(formData);

    renderGoods(newGood);

    form.reset();

    document.querySelector('.modal__submit').addEventListener('click', () => {
      document.querySelector('.overlay').classList.remove('active');
    });

  });
};

formControl(form);
