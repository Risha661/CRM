import { modalTotalPrice } from "./const.js";

const totalTableSpan = document.querySelector(".cms__total-price");
let totalPrice = 0;

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

export function globalTotalPrice(goodsForPrice) {
  let totalDiscountPrice = 0;
  let itemPrice = 0;
  let globalPrice = 0;

  goodsForPrice.forEach((item) => {
    if (item.discount > 0) {
      const itemDiscountPrice =
        item.price * (1 - item.discount / 100) * item.count;
      totalDiscountPrice += itemDiscountPrice;
    } else if (item.discount === 0) {
      const itemPriceSum = item.price * item.count;
      itemPrice += itemPriceSum;
    }
  });
  globalPrice = totalDiscountPrice + itemPrice;
  totalTableSpan.textContent = globalPrice;
}

export { calculateFormTotal };
