import { fetchData } from "../api/feed.mjs";
import * as handlers from "../handlers/index.mjs";
import { clearHTML } from "../utilitis.mjs/clearHTML.mjs";
import { showProgressCircle } from "./progressCircle.mjs";

let count = 0;
let score = 0;

const shownProducts = new Set();
export async function displayProducts_v2() {
  const data = await fetchData();
  console.log(data);

  const productContainer = document.getElementById("card2");
  const pContainer = document.getElementById("pContainer");
  clearHTML(productContainer);
  productContainer.classList.add(
    "card",
    "w-75",
    "m-3",
    "max-width-400",
    "max-height-90vh",
    "min-vh-50",
    "overflow-auto",
    "d-flex",
    "justify-content-between"
  );
  const nextBtn = document.createElement("button");
  nextBtn.id = "nextBtn";
  nextBtn.innerText = "Next";
  nextBtn.classList.add(
    "btn",
    "btn-primary",
    "btn-lg",
    "my-2",
    "justify-content-center",
    "mx-2",
    "position-absolute",
    "bottom-0",
    "end-0"
  );

  const remainingProducts = data.filter(
    (product) => !shownProducts.has(product.id)
  );

  if (remainingProducts.length === 0) {
    showProgressCircle(data.length);
    return;
  }
  const product =
    remainingProducts[Math.floor(Math.random() * remainingProducts.length)];
  shownProducts.add(product.id);

  // Progress bar
  const progressDiv = document.createElement("div");
  const progressBar = document.createElement("div");
  progressDiv.classList.add("progress","w-100");
  progressBar.classList.add("progress-bar", "bg-success");
  progressBar.setAttribute("role", "progressbar");
  progressBar.setAttribute("aria-valuenow", count);
  progressBar.setAttribute("aria-valuemin", 0);
  progressBar.setAttribute("aria-valuemax", data.length);
  progressBar.style.width = `${(count / data.length) * 100}%`;

  progressBar.innerText = `${count}/${data.length}`;
  progressDiv.appendChild(progressBar);

  const productCard = document.createElement("div");
  const countDiv = document.createElement("div");
  const productCount = document.createElement("small");
  const scoreCount = document.createElement("small");
  const productName = document.createElement("h2");
  const productImg = document.createElement("img");

  // Div for count data
  countDiv.classList.add("d-flex", "d-flex","justify-content-center", "align-content-center","align-items-center");

  productCard.classList.add(
    "card-body",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  productCount.classList.add(
    "d-flex",
    "justify-content-end",
    "p-2",
    "text-small"
  );
  scoreCount.classList.add(
    "d-flex",
    "justify-content-end",
    "align-items-center",
    "p-2",
    "text-small",
    "gap-1"
  );
  productName.classList.add("card.title", "d-flex", "justify-content-center");
  productImg.classList.add(
    "img-fluid",
    "max-height-200",
    "object-fit-contain",
    "mx-auto",
    "w-100"
  );

  scoreCount.innerHTML = `${score}<i class="fa-solid fa-trophy"></i>`;

  count += 1;
  productName.textContent = product.name;

  productImg.src = product.image;
  productImg.alt = `Image of ${product.name}`;

  const card = document.createElement("div");
  card.classList.add("product-card", "w-100");

  countDiv.appendChild(progressDiv);
  countDiv.appendChild(scoreCount);
  card.appendChild(countDiv);
  card.appendChild(productName);
  card.appendChild(productImg);

  // Create buttons with EAN options
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add(
    "d-flex",
    "justify-content-between",
    "gap-2",
    "my-1",
    "mx-2",
    "flex-column"
  );

  // Get two random incorrect EANs
  let incorrectEANs = [];
  while (incorrectEANs.length < 2) {
    const randomProduct = data[Math.floor(Math.random() * data.length)];
    if (
      randomProduct.id !== product.id &&
      !incorrectEANs.includes(randomProduct.EAN)
    ) {
      incorrectEANs.push(randomProduct.EAN);
    }
  }

  // Combine correct EAN with incorrect ones and shuffle
  const eanOptions = [product.EAN, ...incorrectEANs].sort(
    () => 0.5 - Math.random()
  );

  // Create and append buttons
  eanOptions.forEach((ean) => {
    const eanButton = document.createElement("button");
    const plussOne = document.createElement("span");
    plussOne.classList.add("plus-one");
    plussOne.innerText = `+1`;
    eanButton.classList.add(
      "btn",
      "btn-lg",
      "w-100",
      "gap-1",
      "px-1",
      "btn-outline-secondary"
    );
    eanButton.innerText = ean;
    eanButton.addEventListener("click", (event) => {
      event.preventDefault();
      const isCorrect = handlers.setCheckForm_v2({
        ...product,
        enteredEAN: ean,
      });
      if (isCorrect) {
        eanButton.classList.remove("btn-outline-secondary");
        eanButton.classList.add("btn-success");
        eanButton.appendChild(plussOne);
        score += 1;
        setTimeout(() => {
          displayProducts_v2();
        }, 1000);
      } else {
        eanButton.classList.remove("btn-outline-secondary");
        eanButton.classList.add("btn-danger");
        const correctButton = Array.from(buttonDiv.children).find(
          (button) => button.innerText == product.EAN
        );
        correctButton.classList.remove("btn-outline-secondary");
        correctButton.classList.add("btn-success");
        setTimeout(() => {
          displayProducts_v2();
        }, 1500);
      }
      eanButton.blur();
    });
    buttonDiv.appendChild(eanButton);
  });
  const correctNumberBox = document.createElement("div");
  correctNumberBox.id = "correctNumberBox";
  correctNumberBox.classList.add(
    "btn",
    "btn-lg",
    "my-2",
    "justify-content-center",
    "mx-2"
  );
  correctNumberBox.style.display = "none";

  nextBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayProducts_v2();
  });

  productCard.appendChild(card);
  productContainer.appendChild(productCard);
  productContainer.appendChild(buttonDiv);
  productContainer.appendChild(correctNumberBox);
  pContainer.appendChild(nextBtn);
}

export {score};