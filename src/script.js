import {
  btnAdd,
  overlayForm,
  inputFields,
  units,
  count,
  price,
  discount,
  modalTotalPrice,
  form,
} from "./script/const";

import { generateRandomId } from "./script/generate";
import { formControl } from "./script/control";
import { vendorCode } from "./script/const";
import { setEditingState } from "./script/control";
import "./script/preview";
import "./script/error";

import './scss/index.scss';

import './css/cms.css';
import './css/default.css';
import './css/fonts.css';
import './css/goods.css';
import './css/index.css';
import './css/modal.css';
import './css/normalize.css';
import './css/overlay.css';
import './css/panel.css';
import './css/sub-panel.css';
import './css/table.css';
import './css/vendor-code.css';



(function init() {
  document.querySelector(".overlay").classList.remove("active");

  btnAdd.addEventListener("click", () => {
    setEditingState(false);

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

  formControl(form, true);
})();
