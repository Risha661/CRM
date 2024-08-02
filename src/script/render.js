//import { allGoods } from "./api.js";
import { displayErrorMessages } from "./error";

import image from '../img/pic.svg';

let renderPage = 1;
export function setRenderPage(value) {
  renderPage = value;
}
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
    if (allGoods[i - 1]) {
      visibleMassive.push(allGoods[i - 1]);
    } else {
      break;
    }
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
        <td class="table__cell">$${(
          item.price *
          (1 - item.discount / 100) *
          item.count
        ).toFixed(2)}</td>
        <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic" data-pic="https://smooth-local-bread.glitch.me/${
          item.image
        }">
            <img alt="https://smooth-local-bread.glitch.me/${
              item.image
            }" src="${image}" class="table__img" />
          </button>
          <button class="table__btn table__btn_edit" id="edit"></button>
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
