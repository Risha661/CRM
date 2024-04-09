import {createRow} from './create.js';

const renderGoods = (goods) => {
  const table = document.querySelector('.table__body');
  let createHtml = '';

  goods.forEach((obj, index) => {
    createHtml += createRow({...obj, ...{index: index + 1}});
  });
  table.innerHTML = createHtml;
};

export {renderGoods};
