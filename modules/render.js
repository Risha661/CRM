import { displayErrorMessages } from "./error.js";

export const renderGoods = async (allGoods) => {
  const table = document.querySelector(".table__body");
  if (Array.isArray(allGoods)) {
    const goods = allGoods.map((item) => {
      const cardWrapper = document.createElement("tr");
      cardWrapper.innerHTML = `
        <td class="table__cell" id="item-id">${item.id}</td>
        <td class="table__cell table__cell_left">${item.title}</td>
        <td class="table__cell">${item.category}</td>
        <td class="table__cell">${item.units}</td>
        <td class="table__cell">${item.count}</td>
        <td class="table__cell">$${item.count * item.price}</td>
        <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic" data-pic="https://thoracic-marbled-paneer.glitch.me/${
          item.image
        }">
            <img alt="https://thoracic-marbled-paneer.glitch.me/${
              item.image
            }" src="../img/pic.svg" class="table__img" />
          </button>
          <button class="table__btn table__btn_edit"></button>
          <button class="table__btn table__btn_del"></button>
        </td>`;
      table.appendChild(cardWrapper);
    });
  } else {
    displayErrorMessages("Ошибка: Данные не найдены.");
  }
};

export const updateTable = (data) => {
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
          <button class="table__btn table__btn_pic" data-pic="${item.image}">
            <img src="${item.image}"  class="table__img" />
          </button>
          <button class="table__btn table__btn_del"></button>
        </td>`;
      table.appendChild(cardWrapper);
    });
  } else {
    displayErrorMessages(
      "Ошибка: Данные не найдены, введите корректный поисковой запрос."
    );
  }
};
