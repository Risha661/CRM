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
  units: 'шт',
  count: 15,
  price: 1000,
  total: 15000,
};

const goods = [
  {
    id: 34234353524553,
    name: 'Смартфон Xiaomi 11T 8/128GB',
    category: 'Смартфоны',
    units: 'шт',
    count: 20,
    price: '500',
    total: '',
  },
  {
    id: 4242423434344,
    name: 'Радиоуправляемый автомобиль Cheetan',
    category: 'Игрушки',
    units: 'шт',
    count: 1,
    price: '4000',
    total: '',
  },
];
const createRow = ({ index, id, name, category, units, count, price }) => {
  return `
  <tr>
    <td class="table__cell">${index}</td>
    <td class="table__cell table__cell_left table__cell_name data-id="${id}">
      <span class="table__cell-id">ID: ${id}</span>
      ${name}</td>
    <td class="table__cell table__cell_left">${category}</td>
    <td class="table__cell">${units}</td>
    <td class="table__cell">${count}</td>
    <td class="table__cell">$${price}</td>
    <td class="table__cell">$${count * price}</td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  </tr>
  `;
}
const generateRandomId = () => {
  return new Date().getTime().toString('14');
};
const renderGoods = (goods) => {
  const table = document.querySelector('.table__body');
  let createHtml = '';
  table.innerHTML = createHtml;
  goods.forEach((obj, index) => {
    createHtml += createRow({...obj, ...{index: index}});
  });
  table.innerHTML = createHtml;
};
const closeModalControl = () => {
  document.querySelector('.overlay').classList.remove('active');
}

const btnAdd = document.querySelector('.panel__add-goods');
const overlayForm = document.querySelector('.overlay');



btnAdd.addEventListener('click', () => {
  overlayForm.classList.add('active');
  const randomId = generateRandomId();
  vendorCode = document.querySelector('.vendor-code__id');
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
  }
});

const form = document.querySelector('.modal__form');

const sentData = data => console.log(data);

const formControl = (form, randomId) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGood = Object.fromEntries(formData);
    //rascheti s uchetom discount
    goods.push(newGood);
    renderGoods(goods);
    form.reset();
    document.querySelector('.modal__submit').addEventListener('click', closeModalControl);
  });
};

formControl(form);
renderGoods(goods);
