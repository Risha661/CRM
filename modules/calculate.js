import {modalTotalPrice} from './const.js'
import {goods} from './goodsMassive.js';

const calculateFormTotal = () => {
  const count = document.getElementById('count');
  const price = document.getElementById('price');
  const discount = document.querySelector('.modal__input_discount');
  const countInput = count.value;
  const priceInput = price.value;
  const discountInput = discount.value;

 if (!isNaN(priceInput) && !isNaN(discountInput) && !isNaN(countInput)) {
  const totalPrice = priceInput * (1 - discountInput / 100) * countInput;
  modalTotalPrice.textContent = `$ ${totalPrice}`;
 } else {
  modalTotalPrice.textContent = 'Некорректные данные';
 }
 return modalTotalPrice;
};

const calculateTableTotalPrice = (goods) => {
  let totalSum = 0;

  goods.forEach((item) => {
    const count = parseFloat(item.count);
    const price = parseFloat(item.price);
    const cellTotal = count * price;
    totalSum += cellTotal;
  });

  return totalSum.toFixed(2);
};

const updateTotalSum = () => {
  const totalSumColumn = calculateTableTotalPrice(goods);

  const cmsTotalPrice = document.querySelector('.cms__total-price');
  cmsTotalPrice.textContent = '$' + totalSumColumn;

  return cmsTotalPrice.textContent;
};

export {calculateFormTotal,
  calculateTableTotalPrice,
  updateTotalSum};
