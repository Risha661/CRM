import {
  totalSumColumn,
  btnAdd,
  overlayForm,
  inputFields,
  units,
  count,
  price,
  discount,
  modalTotalPrice,
  cmsTotalPrice,
  form,
} from "./modules/const.js";

import { generateRandomId } from "./modules/generate.js";

import { updateTotalSum } from "./modules/calculate.js";

import { formControl } from "./modules/control.js";

import { goods } from "./modules/goodsMassive.js";

import { vendorCode } from "./modules/const.js";

import './modules/preview.js';
import './modules/error.js';

const btnOpenImages = document.querySelectorAll(".table__btn.table__btn_pic");

(function init() {
  document.querySelector(".overlay").classList.remove("active");

  btnAdd.addEventListener("click", () => {
    overlayForm.classList.add("active");
    const randomId = generateRandomId();
    vendorCode.textContent = randomId;
  });

  overlayForm.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("overlay")) {
      overlayForm.classList.remove("active");
    }
  });

  inputFields.forEach(function (input) {
    input.setAttribute("required", "required");
  });

  units.type = "text";
  units.classList.add(".table__cell_left");
  count.type = "number";
  price.type = "number";
  discount.type = "number";

  modalTotalPrice.textContent = "$ 0.00";
  cmsTotalPrice.textContent = totalSumColumn;

  formControl(form);
  // renderGoods(goods);
  updateTotalSum();
})();

btnOpenImages.forEach((btnOpenImage) => {
  btnOpenImage.addEventListener("click", () => {
    const picUrl =
      "http://picsdesktop.net/autumn/800x600/PicsDesktop.net_7.jpg";
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const left = (screenWidth - 800) / 2;
    const top = (screenHeight - 600) / 2;

    const win = window.open(
      picUrl,
      "",
      `width=800,height=600,top=${top},left=${left}`
    );
  });
});
