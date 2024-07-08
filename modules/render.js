import "./api.js";

const URL = "https://blushing-motley-language.glitch.me/api/goods";

const loadGoods = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", URL);

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        resolve(data);
      } else {
        reject("Failed to load goods");
      }
    });

    xhr.addEventListener("error", () => {
      reject("Error loading goods");
    });

    xhr.send();
  });
};

const renderGoods = async () => {
  try {
    const data = await loadGoods();

    if (!Array.isArray(data)) {
      throw new Error("Данные не являются массивом");
    }

    const table = document.querySelector(".table__body");
    let createHtml = "";

    data.forEach((obj, index) => {
      const { id, title, category, units, count, price } = obj;

      const goods = data.map (item => {})
        `<tr>
          <td class="table__cell">${index + 1}</td>
          <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
            <span class="table__cell-id">ID: ${id}</span>
            ${title}
          </td>
          <td class="table__cell table__cell_left">${category}</td>
          <td class="table__cell">${units}</td>
          <td class="table__cell">${count}</td>
          <td class="table__cell">$${price}</td>
          <td class="table__cell">$${count * price}</td>
          <td class="table__cell table__cell_btn-wrapper">
            <button class="table__btn table__btn_pic" data-pic="http://picsdesktop.net/autumn/800x600/PicsDesktop.net_7.jpg"></button>
            <button class="table__btn table__btn_edit"></button>
            <button class="table__btn table__btn_del"></button>
          </td>
        </tr>`;
    });

    table.innerHTML = goods;
  } catch (error) {
    console.error(error);
  }
};

export { renderGoods };
