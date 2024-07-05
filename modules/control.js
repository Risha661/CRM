import { count, price, discount, sentData } from "./const.js";
import { goods } from "./goodsMassive.js";
import { renderGoods } from "./render.js";
import { vendorCode } from "./const.js";
import { calculateFormTotal, updateTotalSum } from "./calculate.js";

const closeModalControl = () => {
  document.querySelector(".overlay").classList.remove("active");
};

const modalClose = document
  .querySelector(".modal__close")
  .addEventListener("click", () => {
    closeModalControl();
  });

const goodTableWrapper = document
  .querySelector(".goods__table-wrapper")
  .addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("table__btn_del")) {
      const row = target.closest("tr");
      if (row) {
        const id = row.querySelector(".table__cell_name").dataset.id;
        row.remove();
        const index = goods.findIndex((item) => item.id === id);
        console.log(index + " " + id);
        if (index !== -1) {
          goods.splice(index, 1);
          renderGoods(goods);
        }
      }
    }
  });

const modalCheckbox = document
  .querySelector(".modal__checkbox")
  .addEventListener("click", (e) => {
    const discountCountInput = document.querySelector(".modal__input_discount");
    const target = e.target;
    discountCountInput.removeAttribute("disabled");
    if (target.checked) {
      discountCountInput.removeAttribute("disabled");
    } else {
      discountCountInput.setAttribute("disabled", "disabled");
      discountCountInput.value = "";
    }
  });

const formControl = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGood = Object.fromEntries(formData);
    newGood["id"] = vendorCode.textContent;
    calculateFormTotal();

    goods.push(newGood);
    renderGoods(goods);
    updateTotalSum();
    form.reset();
    document
      .querySelector(".modal__submit")
      .addEventListener("click", closeModalControl());
  });

  form.addEventListener("focusout", (e) => {
    const target = e.target;
    if (target === price || target === count || target === discount) {
      calculateFormTotal();
    }
  });
};

export { closeModalControl, sentData, formControl };
export { modalClose, goodTableWrapper, modalCheckbox };
