import { displayProducts } from "../display/productDisplay.mjs";

export function setCheckForm(product) {

    const inputNumberElement = document.getElementById('productNumber');
    const inputNumber = parseInt(inputNumberElement.value);
    const correctNumber = product.EAN;
    const correctNumberBox = document.getElementById("correctNumberBox");
    const nextBtn = document.getElementById("nextBtn");

    if (inputNumber === correctNumber) {
      inputNumberElement.classList.remove('is-invalid');
        inputNumberElement.classList.add('is-valid');
        correctNumberBox.style.display = "none";
        nextBtn.style.display = "none";
        
        setTimeout(function() {
            displayProducts();
        }, 500);
  } else {
      inputNumberElement.classList.remove('is-valid');
      inputNumberElement.classList.add('is-invalid');
      correctNumberBox.style.display = "block";

  }
}
