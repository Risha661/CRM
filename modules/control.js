import "./const.js";
import { goods } from "./goodsMassive.js";
import "./preview.js";
import { vendorCode } from "./const.js";
import { calculateFormTotal, updateTotalSum } from "./calculate.js";
import "./generate.js";
import { generateRandomId } from "./generate.js";

const apiURL = "https://thoracic-marbled-paneer.glitch.me";
const URL = "https://thoracic-marbled-paneer.glitch.me/api/goods/";

// export const loadGoods = (callback) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', URL);

//   xhr.addEventListener('load', () => {
//     const data = JSON.parse(xhr.response);
//     callback(data.goods);
//   });

//   xhr.addEventListener('error', () => {
//     console.log('error');
//   });

//   xhr.send();
// };

const fetchData = async () => {
  const perPage = 20;
  let allGoods = [];
  let page = 1;
  let dataAvailable = true;

  try {
    while (dataAvailable) {
      const response = await fetch(
        `${apiURL}/api/goods?limit=${perPage}&page=${page}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      if (data.goods.length > 0) {
        allGoods = allGoods.concat(data.goods);
        page++;
      } else {
        dataAvailable = false;
      }
    }

    console.log(allGoods);
    return allGoods;
  } catch (error) {
    console.error("Произошла ошибка при получении данных:", error);
    return null;
  }
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

const updateGoods = async (item) => {
  try {
    const response = await fetch(`${apiURL}/api/goods/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to update goods");
    }
    const updatedGoods = await response.json();
    return updatedGoods;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getGoods = async (itemId) => {
  try {
    const response = await fetch(`${apiURL}/api/goods/${itemId}`);
    if (!response.ok) {
      throw new Error("Goods Not Found");
    }
    const goods = await response.json();
    return goods;
  } catch (error) {
    throw new Error(error.message);
  }
};

const postData = async (newItem) => {
  await fetch(`${apiURL}/api/goods/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
};

const deleteData = async (id) => {
  const response = await fetch(`${apiURL}/api/goods/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  return result;
};

export const renderGoods = (data) => {
  const table = document.querySelector(".table__body");

  if (Array.isArray(data)) {
    const goods = data.map((item) => {
      const cardWrapper = document.createElement("tr");
      cardWrapper.innerHTML = `
        <td class="table__cell" id="item-id">${item.id}</td>
        <td class="table__cell table__cell_left">${item.title}</td>
        <td class="table__cell">${item.category}</td>
        <td class="table__cell">${item.units}</td>
        <td class="table__cell">${item.count}</td>
        <td class="table__cell">$${item.count * item.price}</td>
        <td class="table__cell table__cell_btn-wrapper">
          <button class="table__btn table__btn_pic" data-pic="http://picsdesktop.net/autumn/800x600/PicsDesktop.net_7.jpg"></button>
          <button class="table__btn table__btn_edit"></button>
          <button class="table__btn table__btn_del"></button>
        </td>`;
      table.appendChild(cardWrapper);
    });
  } else {
    console.error("Data is not an array");
  }
};

fetchData(renderGoods);

const form = document.querySelector(".overlay");
const formName = document.getElementById("name");
const formCategory = document.getElementById("category");
const formUnits = document.getElementById("units");
const formDiscount = document.querySelector(".modal__input_discount");
const formDescription = document.getElementById("description");
const formCount = document.getElementById("count");
const formPrice = document.getElementById("price");

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
