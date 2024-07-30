import "./const.js";
import "./preview.js";
import { calculateFormTotal, updateTotalSum } from "./calculate.js";
import "./generate.js";
import { generateRandomId } from "./generate.js";
import { renderGoods } from "./render.js";
import { setRenderPage } from "./render.js";
import { displayErrorMessages } from "./error.js";
import { setDataAvailable } from "./api.js";

import {
  fetchData,
  updateGoods,
  getGoods,
  getGoodsName,
  postData,
  deleteData,
} from "./api.js";

export const apiURL = "https://thoracic-marbled-paneer.glitch.me";
export const URL = "https://thoracic-marbled-paneer.glitch.me/api/goods/";
let isEditing = false;
export function getEditingState() {
  return isEditing;
}
export function setEditingState(value) {
  isEditing = value;
}

const searchInput = document.querySelector(".panel__input");
const form = document.querySelector(".overlay");
const formName = document.getElementById("name");
const formCategory = document.getElementById("category");
const formUnits = document.getElementById("units");
const formDiscount = document.querySelector(".modal__input_discount");
const formDescription = document.getElementById("description");
const formCount = document.getElementById("count");
const formPrice = document.getElementById("price");

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

  console.log("while editing status: " + isEditing);
};

//fetchData(renderGoods);

searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  const name = e.target.value.trim();
  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    if (name) {
      try {
        const goods = await getGoodsName(name);
        renderGoods(goods);
      } catch (error) {
        displayErrorMessages(
          "По данному запросу товары не найдены. Введите корректный запрос."
        );
      }
    } else {
      try {
        const dataGoods = await fetchData();
        renderGoods(dataGoods);
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
  //   const formData = new FormData(form);
  //   const data = Object.fromEntries(formData);
  //   data.image = await toBase64(data.image);
  //   fetch(URL, {
  //     method: "post",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   });
});

const modalClose = document
  .querySelector(".modal__close")
  .addEventListener("click", () => {
    closeModalControl();
  });

export const fetchAndRender = async() => {
  setDataAvailable(true);
  const newData = await fetchData();
  await renderGoods(newData);
  //Возможно калькулятор сюда.
}

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
        isEditing = true;
        form.classList.add("active");

        fillFormWithData(goods);
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
          imageUrl ===
          "https://thoracic-marbled-paneer.glitch.me/image/notimage.jpg"
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

  const a = document.querySelector('.modal__submit');
  console.log(a);

const formControl = (form) => {
  form.addEventListener("submit", async () => {
    if (isEditing === false) {
      console.log("createNewPosition");
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
      };
      console.log(newItem.title);
      await postData(newItem);
    } else {
      console.log('sdfsdfsdfsd');
      const id = document.querySelector("#item-id").textContent;
      console.log(id);
      const updatedItem = {
        title: formName.value,
        category: formCategory.value,
        units: formUnits.value,
        description: formDescription.value,
        count: formCount.value,
        price: formPrice.value,
        discount: formDiscount.value,
        id: Number(id),
      };
      await updateGoods(updatedItem);
      // fetchData().then((data) => renderGoods(data));
      // const newData = fetchData();
      // console.log(newData);
      // //renderGoods(newData);


      //console.log("Данные успешно обновлены:", updatedData);
    }
    await fetchAndRender();
      // const updatedData = await fetchData();
      // renderGoods(updatedData);
      //fetchData().then((data) => renderGoods(data));
    calculateFormTotal();
    updateTotalSum();
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
  fetchData().then((data) => renderGoods(data));
};

export { closeModalControl, formControl };
export { modalClose, goodTableWrapper, modalCheckbox };
