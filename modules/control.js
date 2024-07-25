import "./const.js";
import { goods } from "./goodsMassive.js";
import "./preview.js";
import { vendorCode } from "./const.js";
import { calculateFormTotal, updateTotalSum } from "./calculate.js";
import "./generate.js";
import { generateRandomId } from "./generate.js";
import { renderGoods, updateTable } from "./render.js";
import { displayErrorMessages } from "./error.js";

import {
  fetchData,
  updateGoods,
  getGoods,
  getGoodsName,
  postData,
  deleteData,
  getGoodsCategory,
} from "./api.js";

export const apiURL = "https://thoracic-marbled-paneer.glitch.me";
export const URL = "https://thoracic-marbled-paneer.glitch.me/api/goods/";

const searchForm = document.querySelector(".panel__search");
const searchInput = document.querySelector(".panel__input");
const form = document.querySelector(".overlay");
const formName = document.getElementById("name");
const formCategory = document.getElementById("category");
const formUnits = document.getElementById("units");
const formDiscount = document.querySelector(".modal__input_discount");
const formDescription = document.getElementById("description");
const formCount = document.getElementById("count");
const formPrice = document.getElementById("price");
const id = document.querySelector("#item-id");

let timeoutId;

const fillFormWithData = async (item) => {
  const id = document.querySelector("#item-id");

  formName.value = item.title;
  formCategory.value = item.category;
  formUnits.value = item.units;
  formDiscount.value = item.discount;
  formDescription.value = item.description;
  formCount.value = item.count;
  formPrice.value = item.price;
  id.value = item.id;
};

fetchData(renderGoods);

searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  const name = e.target.value.trim();
  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    if (name) {
      try {
        const goods = await getGoodsName(name);
        updateTable(goods);
      } catch (error) {
        displayErrorMessages(
          "По данному запросу товары не найдены. Введите корректный запрос."
        );
      }
    } else {
      try {
        const allGoods = await fetchData();
        updateTable(allGoods);
      } catch (error) {
        displayErrorMessages("Товары не найдены.");
      }
    }
  }, 300);
});

const closeModalControl = () => {
  document.querySelector(".overlay").classList.remove("active");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  data.image = await toBase64(data.image);
  console.log(data);

  fetch(URL, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});

const modalClose = document
  .querySelector(".modal__close")
  .addEventListener("click", () => {
    closeModalControl();
  });

function openImageInNewWindow(apiURL) {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const left = (screenWidth - 800) / 2;
  const top = (screenHeight - 600) / 2;

  const win = window.open(
    apiURL,
    "",
    `width=800,height=600,top=${top},left=${left}`
  );
  if (!win) {
    alert("Пожалуйста, разрешите всплывающие окна для этого сайта.");
  }
}

async function fetchImageUrl(id) {
  const response = await fetch(`${apiURL}/images/${id}`);

  if (!response.ok) {
    throw new Error("Ошибка при получении изображения: " + response.statusText);
  }

  const data = await response.json();
  return data.image;
}

const goodTableWrapper = document
  .querySelector(".goods__table-wrapper")
  .addEventListener("click", async (e) => {
    const target = e.target;

    if (target.classList.contains("table__btn_del")) {
      const row = target.closest("tr");
      if (row) {
        const id = row.querySelector("#item-id").textContent;
        console.log(id);
        row.remove();
        await deleteData(id);
      }
    }

    if (target.classList.contains("table__btn_edit")) {
      const row = target.closest("tr");
      const id = row.querySelector("#item-id").textContent;
      await fetchData(id);

      try {
        const goods = await getGoods(id);
        console.log(goods);
        form.classList.add("active");

        await fillFormWithData(goods);
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (target.classList.contains("table__btn_pic")) {
      const row = target.closest("tr");
      if (row) {
        const id = row.querySelector("#item-id").textContent;
        try {
          const picUrl = await fetchImageUrl(id);
          openImageInNewWindow(picUrl);
        } catch (error) {
          console.error("Ошибка при получении изображения:", error);
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
  console.log(document.querySelector("#item-id"));
  let itemID;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (formName.textContent === "") {
      itemID = generateRandomId();
      console.log(itemID);
      const newItem = {
        title: formName.value,
        category: formCategory.value,
        units: formUnits.value,
        description: formDescription.value,
        count: formCount.value,
        price: formPrice.value,
        discount: formDiscount.value,
        id: itemID,
      };

      console.log(newItem);

      postData(newItem);
      const updatedData = await fetchData();
      renderGoods(updatedData);

      calculateFormTotal();
      updateTotalSum();
      form.reset();
      document
        .querySelector(".modal__submit")
        .addEventListener("click", closeModalControl());
    }

    if (formName.textContent !== "") {
      const id = document.querySelector("#item-id").textContent;

      const updatedItem = {
        title: formName.value,
        category: formCategory.value,
        units: formUnits.value,
        description: formDescription.value,
        count: formCount.value,
        price: formPrice.value,
        discount: formDiscount.value,
        id: id,
      };

      try {
        const updatedData = await updateGoods(updatedItem);
        console.log("Данные успешно обновлены:", updatedData);
      } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
      }
      console.log(updatedItem);
    }
  });

  form.addEventListener("focusout", (e) => {
    const target = e.target;
    if (target === price || target === count || target === discount) {
      calculateFormTotal();
    }
  });
  fetchData().then((data) => renderGoods(data));
};

export { closeModalControl, formControl };
export { modalClose, goodTableWrapper, modalCheckbox };
