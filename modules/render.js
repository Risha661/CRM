const loadGoods = async (cb) => {
  const result = await fetch(
    "https://blushing-motley-language.glitch.me/api/goods"
  );

  const data = await result.json();
  cb(data.goods);
  console.log(typeof data.goods);
};

const renderGoods = (data) => {
  console.log(data);
  const table = document.querySelector(".table__body");

  if (Array.isArray(data)) {
    const goods = data.forEach((item) => {
      const cardWrapper = document.createElement("tr");
      cardWrapper.innerHTML = `
        <td class="table__cell">${item.id}</td>
        <td class="table__cell table__cell_left">${item.title}</td>
        <td class="table__cell">${item.units}</td>
        <td class="table__cell">${item.count}</td>
        <td class="table__cell">$${item.price}</td>
        <td class="table__cell">$${item.count * item.price}</td>
        <td class="table__cell table__cell_btn-wrapper">
          <button class="table__btn table__btn_pic" data-pic="http://picsdesktop.net/autumn/800x600/PicsDesktop.net_7.jpg"></button>
          <button class="table__btn table__btn_edit"></button>
          <button class="table__btn table__btn_del"></button>
        </td>`;
      table.appendChild(cardWrapper);
    });
  } else {
    console.error('Data is not an array');
  }
};

loadGoods(renderGoods);

export { renderGoods, loadGoods };

