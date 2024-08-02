import "./control.js";
import { apiURL } from "./control.js";

const imagePreview = document.createElement("img");
const modalFieldSet = document.querySelector(".modal__fieldset");
imagePreview.classList.add("preview");

const inputFile = document.querySelector(".modal__file");

// export const toBase64 = (inputFile) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.addEventListener("loadend", () => {
//       resolve(reader.result);
//     });

//     reader.addEventListener("error", (err) => {
//       reject(err);
//     });

//     reader.readAsDataURL(inputFile);
//   });

inputFile.addEventListener("change", async (e) => {
  e.preventDefault();
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
