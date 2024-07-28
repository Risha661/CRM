import { allGoods } from "./api.js";
import { displayErrorMessages } from "./error.js";

let renderPage = 1;
const perPage = 5;
let dataGoods;
const nextPage = document.querySelector('.sub-panel__right');
const prevPage = document.querySelector('.sub-panel__left');
const table = document.querySelector(".table__body");

const subTextPage = document.querySelector('.sub-panel__pages');
console.log(subTextPage);


export const renderGoods = async (allGoods) => {
  console.log(allGoods.length);
  dataGoods = allGoods;
  console.log(dataGoods);

  // let maxPage  = (allGoods.length % perPage) === 0 ?  allGoods.length / perPage : allGoods.length / perPage + 1;
  // console.log(maxPage);
  let maxPage = Math.ceil(allGoods.length / perPage);
  console.log(maxPage);

  if (renderPage + 1 > maxPage) {
    nextPage.disabled = true;
    console.log(renderPage);
    console.log(maxPage);
  } else {
    nextPage.disabled = false;
    console.log(renderPage);
    console.log(maxPage);
  };

  if (renderPage - 1 <= 0) {
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
  };

  let visibleMassive = [];

  const minElem = (renderPage-1) * perPage + 1;
  const maxElem = perPage * renderPage;
  subTextPage.textContent = minElem + ' - ' + maxElem + ' из ' + allGoods.length;
for (let i = (renderPage-1) * perPage + 1; i <= perPage * renderPage; i++){
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



nextPage.addEventListener('click', () => {
  renderPage += 1;
  table.innerHTML = '';
  renderGoods(dataGoods);
});

prevPage.addEventListener('click', () => {
  renderPage -= 1;
  table.innerHTML = '';
  renderGoods(dataGoods);
});
