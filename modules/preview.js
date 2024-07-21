import './control.js';

const URL = "https://blushing-motley-language.glitch.me/api/goods";

const imagePreview = document.createElement("img");
const modalFieldSet = document.querySelector(".modal__fieldset");
const labelFile = document.querySelector(".modal__label_file");
imagePreview.classList.add("preview");

const form = document.querySelector(".modal__form");
const inputFile = document.querySelector(".modal__file");

const toBase64 = (inputFile) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("loadend", () => {
      resolve(reader.result);
    });

    reader.addEventListener("error", (err) => {
      reject(err);
    });

    reader.readAsDataURL(inputFile);
  });

inputFile.addEventListener("change", async () => {
  if (inputFile.files.length > 0) {
    const src = URL.createObjectURL(inputFile.files[0]);
    if (inputFile.files[0].size < 1000000) {
      modalFieldSet.appendChild(imagePreview);
      inputFile.style.position = "none";
      imagePreview.src = src;
      imagePreview.alt = "Изображение товара";
    } else {
      const text = document.createElement("p");
      text.classList.add("text-preview");
      text.textContent = "Изображение не должно превышать размер 1 Мб";
      text.style.color = "red";
      modalFieldSet.appendChild(text);
    }
  }
});

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const formData = new FormData(form);
//   const data = Object.fromEntries(formData);
//   data.image = await toBase64(data.image);
//   console.log(data);

//   fetch(URL, {
//     method: "post",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
// });
