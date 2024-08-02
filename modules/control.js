import "./const.js";
import "./preview.js";
import { calculateFormTotal, globalTotalPrice } from "./calculate.js";
import "./generate.js";
import { generateRandomId } from "./generate.js";
import { renderGoods } from "./render.js";
import { displayErrorMessages } from "./error.js";
import { setDataAvailable, getGoodsCategory } from "./api.js";

import {
  fetchData,
  updateGoods,
  getGoods,
  getGoodsName,
  postData,
  deleteData,
  getGoodCategoryInput,
} from "./api.js";

const inputFile = document.querySelector(".modal__file");

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const apiURL = "https://smooth-local-bread.glitch.me";
export const URL = "https://smooth-local-bread.glitch.me/api/goods";
let isEditing = false;
export function getEditingState() {
  return isEditing;
}
export function setEditingState(value) {
  isEditing = value;
}

let idForEdit = 0;
let timeoutId;

const searchInput = document.querySelector(".panel__input");
const form = document.querySelector(".overlay");
const formName = document.getElementById("name");
const formCategory = document.getElementById("category");
const formUnits = document.getElementById("units");
const formDiscount = document.querySelector(".modal__input_discount");
const formDescription = document.getElementById("description");
const formCount = document.getElementById("count");
const formPrice = document.getElementById("price");

export const fetchAndRender = async () => {
  setDataAvailable(true);
  const newData = await fetchData();
  await renderGoods(newData);
  globalTotalPrice(newData);
};

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

searchInput.addEventListener("input", async (e) => {
  e.preventDefault();

  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    const name = e.target.value.trim();

    if (name.length === 0) {
      fetchAndRender();
      return;
    }

    try {
      const globalCategories = await getGoodsCategory();

      let isCategory = false;

      globalCategories.forEach((category) => {
        if (category.toLowerCase() === name.toLowerCase()) {
          isCategory = true;
        }
      });

      if (isCategory) {
        const categoriesData = await getGoodCategoryInput(name);
        renderGoods(categoriesData);
      } else {
        const nameData = await getGoodsName(name);
        renderGoods(nameData);
      }
    } catch (error) {
      console.error(error);
      displayErrorMessages(
        "По данному запросу товары не найдены. Введите корректный запрос."
      );
    }
  }, 300);
});

const closeModalControl = () => {
  document.querySelector(".overlay").classList.remove("active");
};

const modalClose = document
  .querySelector(".modal__close")
  .addEventListener("click", () => {
    closeModalControl();
  });

function openImageInNewWindow(url) {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const left = (screenWidth - 800) / 2;
  const top = (screenHeight - 600) / 2;

  const win = window.open(
    url,
    "",
    `width=800,height=600,top=${top},left=${left}`
  );
  if (!win) {
    alert("Пожалуйста, разрешите всплывающие окна для этого сайта.");
  }
}

const goodTableWrapper = document
  .querySelector(".goods__table-wrapper")
  .addEventListener("click", async (e) => {
    const target = e.target;

    if (target.classList.contains("table__btn_del")) {
      const row = target.closest("tr");
      if (row) {
        const id = row.querySelector("#item-id").textContent;
        row.remove();
        await deleteData(id);
      }
    }

    if (target.classList.contains("table__btn_edit")) {
      const row = target.closest("tr");
      const id = row.querySelector("#item-id").textContent;

      try {
        const goods = await getGoods(id);
        console.log(goods);
        idForEdit = goods.id;

        isEditing = true;
        form.classList.add("active");

        fillFormWithData(goods);
        return goods;
      } catch (error) {
        console.error(error);
      }

    }

    if (target.classList.contains("table__img")) {
      const row = target.closest("tr");
      const id = row.querySelector("#item-id").textContent;

      if (row) {
        const imageUrl = target.getAttribute("alt");

        if (
          imageUrl === "https://smooth-local-bread.glitch.me/image/notimage.jpg"
        ) {
          displayErrorMessages("Ошибка: изображение не найдено.");
        } else if (imageUrl) {
          openImageInNewWindow(imageUrl);
        } else {
          displayErrorMessages("Не удалось загрузить изображение.");
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

const a = document.querySelector(".modal__submit");

const formControl = (form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.image = await toBase64(data.image);

    if (isEditing === false) {
      let itemID = generateRandomId();
      const newItem = {
        title: formName.value,
        category: formCategory.value,
        units: formUnits.value,
        description: formDescription.value,
        count: formCount.value,
        price: formPrice.value,
        discount: formDiscount.value,
        id: itemID,
        image: data.image,
      };

      await postData(newItem);
    } else if (isEditing) {
      const id = idForEdit === 0 ? 0 : idForEdit;

      const updatedItem = {
        title: formName.value,
        category: formCategory.value,
        units: formUnits.value,
        description: formDescription.value,
        count: formCount.value,
        price: formPrice.value,
        discount: formDiscount.value,
        id: Number(id),
        image: data.image,
      };
      await updateGoods(updatedItem);
      idForEdit = 0;
    }
    await fetchAndRender();

    calculateFormTotal();
    form.reset();
    closeModalControl();
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
  fetchAndRender();
};

export { closeModalControl, formControl };
export { modalClose, goodTableWrapper, modalCheckbox };
