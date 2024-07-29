import { allGoods } from "./api.js";
import { displayErrorMessages } from "./error.js";

let renderPage = 1;
const perPage = 5;
let dataGoods;

const table = document.querySelector(".table__body");
const divBtnContainer = document.querySelector(".sub-panel");

divBtnContainer.innerHTML = "";
divBtnContainer.innerHTML = `<p class="sub-panel__choice-pages">Показывать на странице: 5</p>
          <p class="sub-panel__pages">1 - 5 из 16</p>
          <button class="sub-panel__left"></button>
          <button class="sub-panel__right"></button>`;

const subTextPage = document.querySelector(".sub-panel__pages");
const nextPage = document.querySelector(".sub-panel__right");
const prevPage = document.querySelector(".sub-panel__left");

export const renderGoods = async (allGoods) => {
  table.innerHTML = "";
  dataGoods = allGoods;

  let maxPage = Math.ceil(allGoods.length / perPage);

  if (renderPage + 1 > maxPage) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }

  if (renderPage - 1 <= 0) {
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
  }

  let visibleMassive = [];

  const minElem = (renderPage - 1) * perPage + 1;
  const maxElem =
    perPage * renderPage >= allGoods.length
      ? allGoods.length
      : perPage * renderPage;
  subTextPage.textContent =
    minElem + " - " + maxElem + " из " + allGoods.length;
  for (let i = (renderPage - 1) * perPage + 1; i <= perPage * renderPage; i++) {
    visibleMassive.push(allGoods[i - 1]);
  }

  if (Array.isArray(visibleMassive)) {
    const goods = visibleMassive.map((item) => {
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

nextPage.addEventListener("click", () => {
  renderPage += 1;
  table.innerHTML = "";
  renderGoods(dataGoods);
});

prevPage.addEventListener("click", () => {
  renderPage -= 1;
  table.innerHTML = "";
  renderGoods(dataGoods);
});
