import {calculateTableTotalPrice} from './calculate.js';
import {goods} from './goodsMassive.js';

export const overlayActive = document.querySelector('.overlay').classList.remove('active');

export const obj = {
  id: '24601654816512',
  name: 'Телевизор DEXP',
  category: 'Техника для дома',
  units: 'шт',
  count: 15,
  price: 1000,
  total: 15000,
};

export const vendorCode = document.querySelector('.vendor-code__id');

export const totalSumColumn = calculateTableTotalPrice(goods);

export const btnAdd = document.querySelector('.panel__add-goods');

export const overlayForm = document.querySelector('.overlay');

export const inputFields = document.querySelectorAll('.modal__input');

export const units = document.getElementById('units');

export const count = document.getElementById('count');

export const price = document.getElementById('price');

export const discount = document.querySelector('.modal__input_discount');

export const modalTotalPrice = document.querySelector('.modal__total-price');

export const cmsTotalPrice = document.querySelector('.cms__total-price');

export const form = document.querySelector('.modal__form');

export const sentData = data => console.log(data);

//импорт как объект

// import * as constObj from './modules/const.js'
