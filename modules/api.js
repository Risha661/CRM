import { apiURL, URL } from "./control.js";

export let allGoods = [];
let apiCurrentPage = 1;
let perPage = 10;
let dataAvailable = true;

export const fetchData = async () => {
  try {
    while (dataAvailable) {
      // currentPage = 1;
      const response = await fetch(`${apiURL}/api/goods?page=${apiCurrentPage}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(
          `Ошибка сети: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);
      let pagesGoods;
      let totalGoods;

      if (data.goods && data.goods.length > 0) {
        allGoods = allGoods.concat(data.goods);
        console.log('check complite' + allGoods.length);
        apiCurrentPage++;
      } else {
        dataAvailable = false;
      }
    }
    //console.log(allGoods);
    return allGoods;
  } catch (error) {
    console.error("Произошла ошибка при загрузке данных:", error.message);
    displayErrorMessages(
      "Не удалось загрузить данные. Пожалуйста, попробуйте позже."
    );
    return null;
  }
};


export const updateGoods = async (item) => {
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

export const getGoods = async (itemId) => {
  try {
    const response = await fetch(`${apiURL}/api/goods/${itemId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Товары не найдены");
    }
    const goods = await response.json();
    return goods;
  } catch (error) {
    displayErrorMessages(error.message);
  }
};

export const getGoodsName = async (name) => {
  try {
    const response = await fetch(`${apiURL}/api/goods?search=${name}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Не удалось найти товар с таким наименованием"
      );
    }
    const data = await response.json();

    if (!data.goods || data.goods.length === 0) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Не удалось найти товары");
    }
    return data.goods;
  } catch (error) {
    displayErrorMessages(error.message);
  }
};

export const postData = async (newItem) => {
  try {
    const response = await fetch(`${apiURL}/api/goods/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Что-то пошло не так...");
    }
    const data = await response.json();
  } catch (error) {
    displayErrorMessages(error.message);
  }
};

export const deleteData = async (id) => {
  try {
    const response = await fetch(`${apiURL}/api/goods/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Не удалось удалить элемент.");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    displayErrorMessages(error.message);
  }
};

export const getGoodsCategory = async (categories) => {
  const apiURL = "https://thoracic-marbled-paneer.glitch.me";
  try {
    const response = await fetch(`${apiURL}/api/categories`);
    if (!response.ok) {
      throw new Error("Ошибка при загрузке категорий: " + response.statusText);
    }
    const categories = await response.json();
    populateDatalist(categories);
  } catch (error) {
    console.error(error);
  }
};
const datalist = document.getElementById("category-list");

const populateDatalist = (categories) => {
  datalist.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    datalist.appendChild(option);
  });
};

getGoodsCategory();
