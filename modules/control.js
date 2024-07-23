import "./const.js";
import { goods } from "./goodsMassive.js";
import "./preview.js";
import { vendorCode } from "./const.js";
import { calculateFormTotal, updateTotalSum } from "./calculate.js";
import "./generate.js";
import { generateRandomId } from "./generate.js";

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

const apiURL = "https://thoracic-marbled-paneer.glitch.me";
const URL = "https://thoracic-marbled-paneer.glitch.me/api/goods/";

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

      if (!response.ok) {
        throw new Error(
          `Ошибка сети: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.goods && data.goods.length > 0) {
        allGoods = allGoods.concat(data.goods);
        page++;
      } else {
        dataAvailable = false;
      }
    }

    console.log(allGoods);
    return allGoods;
  } catch (error) {
    console.error("Произошла ошибка при загрузке данных:", error.message);
    displayErrorMessages(
      "Не удалось загрузить данные. Пожалуйста, попробуйте позже."
    );
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

const displayErrorMessages = (errorMessage) => {
  const table = document.querySelector(".table__body");
  const errorContainer = document.createElement("div");

  errorContainer.innerHTML = "";

  errorContainer.style.position = "fixed";
  errorContainer.style.top = "50%";
  errorContainer.style.left = "50%";
  errorContainer.style.transform = "translate(-50%, -50%)";
  errorContainer.style.width = "400px";
  errorContainer.style.height = "400px";
  errorContainer.style.backgroundColor = "#F2F0F9";
  errorContainer.style.display = "flex";
  errorContainer.style.flexDirection = "column";
  errorContainer.style.alignItems = "center";
  errorContainer.style.justifyContent = "center";
  errorContainer.style.zIndex = "1000";
  errorContainer.style.padding = "20px";
  errorContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

  const messageDiv = document.createElement("div");
  messageDiv.textContent = errorMessage;
  messageDiv.style.fontSize = "14px";
  messageDiv.style.fontWeight = "500";

  const closeButton = document.createElement("button");
  closeButton.innerHTML = `
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>`;

  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.border = "none";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.cursor = "pointer";
  closeButton.style.padding = "0";
  closeButton.style.width = "auto";
  closeButton.style.height = "auto";

  closeButton.addEventListener("click", () => {
    table.removeChild(errorContainer);
    });

  errorContainer.append(closeButton);
  errorContainer.append(messageDiv);
  table.append(errorContainer);
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
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update goods");
    }
    const updatedGoods = await response.json();
    return updatedGoods;
  } catch (error) {
    displayErrorMessages(error.message);
  }
};

const getGoods = async (itemId) => {
  try {
    const response = await fetch(`${apiURL}/api/goods/${itemId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Goods Not Found");
    }
    const goods = await response.json();
    return goods;
  } catch (error) {
    displayErrorMessages(error.message);
  }
};

const getGoodsName = async (name) => {
  try {
    const response = await fetch(`${apiURL}/api/goods?search=${name}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update goods");
    }
    const data = await response.json();

    if (!data.goods || data.goods.length === 0) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Goods Not Found");
    }
    console.log(data.goods);
    return data.goods;
  } catch (error) {
    displayErrorMessages(error.message);
  }
};

const getGoodsCategory = async (name) => {
  try {
    const response = await fetch(`${apiURL}/api/category?search=${name}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Товары не найдены");
    }
    const data = await response.json();
    console.log(data.goods);
    return data.goods;
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
    displayErrorMessages("Ошибка: Данные не найдены.");
  }
};

fetchData(renderGoods);

function updateTable(data) {
  const table = document.querySelector(".table__body");
  table.innerHTML = "";

  if (Array.isArray(data)) {
    data.forEach((item) => {
      const cardWrapper = document.createElement("tr");
      cardWrapper.innerHTML = `
        <td class="table__cell" id="item-id">${item.id}</td>
        <td class="table__cell table__cell_left">${item.title}</td>
        <td class="table__cell">${item.category}</td>
        <td class="table__cell">${item.units}</td>
        <td class="table__cell">${item.count}</td>
        <td class="table__cell">$${(item.count * item.price).toFixed(2)}</td>
        <td class="table__cell table__cell_btn-wrapper">
          <button class="table__btn table__btn_pic" data-pic="http://picsdesktop.net/autumn/800x600/PicsDesktop.net_7.jpg"></button>
          <button class="table__btn table__btn_edit"></button>
          <button class="table__btn table__btn_del"></button>
        </td>`;
      table.appendChild(cardWrapper);
    });
  } else {
    displayErrorMessages("Ошибка: Данные не найдены, введите корректный поисковой запрос.");
  }
}

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
        console.error(error.message);
      }
    } else {
      try {
        const allGoods = await fetchData();
        updateTable(allGoods);
      } catch (error) {
        console.error(error.message);
      }
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

displayErrorMessages();

export { closeModalControl, formControl };
export { modalClose, goodTableWrapper, modalCheckbox };
