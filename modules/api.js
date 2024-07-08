export const URL = "https://blushing-motley-language.glitch.me";

const loadGoods = async (cb) => {
  const result = await fetch("/db_goods.json");
  const data = await result.json;
  return data;
};

