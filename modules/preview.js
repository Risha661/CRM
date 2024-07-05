const imagePreview = document.createElement('img');
const modalFieldSet = document.querySelector('.modal__fieldset');
const labelFile = document.querySelector('.modal__label_file');
console.log(modalFieldSet);
imagePreview.classList.add('preview');

const form = document.querySelector('.modal__form');
const inputFile = document.querySelector('.modal__file');


inputFile.addEventListener('change', () => {
  if (inputFile.files.length > 0) {
    const src = URL.createObjectURL(inputFile.files[0]);
    imagePreview.src = src;
    modalFieldSet.appendChild(imagePreview);
    inputFile.style.position = 'none';
  }
});

