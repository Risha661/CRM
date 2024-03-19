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
    price: '$500',
    total: '$12000',
  },
  {
    id: 4242423434344,
    name: 'Радиоуправляемый автомобиль Cheetan',
    category: 'Игрушки',
    unit: 'шт',
    quantity: 1,
    price: '$4000',
    total: '$1000',
  },
];

function createRow(obj) {
  let index = 3;

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

  let rowIndex = 2;
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

  return table;
};

renderGoods(goods);

document.querySelector('.panel__add-goods').addEventListener('click', () => {
  document.querySelector('.overlay').classList.add('active');
});

document.querySelector('.overlay').addEventListener('click', () => {
  document.querySelector('.overlay').classList.remove('active');
});

document.querySelector('body').addEventListener('click', e => {
  const target = e.target;

  if (target.classList.contains('overlay__modal')) {
    document.querySelector('.overlay').classList.add('active');
  }
});
// Реализация закрытия модального окна по клику вне окна без stopPropagation вместо кода в комментах ниже

// document.querySelector('.overlay__modal').addEventListener('click', event => {
//   event.stopPropagation();
// });

document.querySelector('.modal__close').addEventListener('click', () => {
  document.querySelector('.overlay').classList.remove('active');
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
// Реализация удаления строки tr при нажатии на кнопку "Удалить"
