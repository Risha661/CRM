import { modalTotalPrice } from "./const.js";
import { goods } from "./goodsMassive.js";
import { fetchData } from "./api.js";

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



const calculateTotalWithDiscounts = (goods) => {
  let totalSum = 0;

  goods.forEach(good => {
    const price = parseFloat(good.price);
    const discount = parseFloat(good.discount);
    const count = parseInt(good.count);

    const discountedPrice = price - (price * (discount / 100));
    totalSum += discountedPrice * count;
  });
console.log(totalSum);
  return totalSum;
};

const updateTotalSum = async () => {
  const goods = await fetchData();
  if (goods && goods.length > 0) {
    const totalSum = calculateTotalWithDiscounts(goods);
    const cmsTotalPrice = document.querySelector(".cms__total-price");
    cmsTotalPrice.textContent = "$" + totalSum.toFixed(2);
  }
};

export { calculateFormTotal, calculateTableTotalPrice, updateTotalSum };
