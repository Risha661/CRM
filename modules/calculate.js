import { modalTotalPrice } from "./const.js";
import { goods } from "./goodsMassive.js";
import { fetchData, fetchTotalGoods } from "./api.js";

const totalTableSpan = document.querySelector('.cms__total-price');

const calculateFormTotal = () => {
  const count = document.getElementById("count");
  const price = document.getElementById("price");
  const discount = document.querySelector(".modal__input_discount");
  const countInput = count.value;
  const priceInput = price.value;
  const discountInput = discount.value;

  if (!isNaN(priceInput) && !isNaN(discountInput) && !isNaN(countInput)) {
    const totalPrice = priceInput * (1 - discountInput / 100) * countInput;
    modalTotalPrice.textContent = `$ ${totalPrice}`;
  } else {
    modalTotalPrice.textContent = "Некорректные данные";
  }
  return modalTotalPrice;
};

export const globalTotalPrice = async () => {
  let totalPrice = 0;
  totalPrice = await fetchTotalGoods();
  totalTableSpan.textContent = totalPrice;
  console.log(totalPrice);
};

export { calculateFormTotal };
