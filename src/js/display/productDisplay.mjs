import { fetchData } from "../api/feed.mjs";
import * as handlers from "./../handlers/index.mjs";
import { clearHTML } from "../utilitis.mjs/clearHTML.mjs";

let count = 0;

const shownProducts = new Set();
export async function displayProducts() {
  const data = await fetchData();
  console.log(data);

  const productContainer = document.getElementById("card");
  clearHTML(productContainer);
  productContainer.classList.add(
    "card",
    "w-75",
    "m-3",
    "max-width-400",
    "d-flex",
    "justify-content-center"
  );

  const remainingProducts = data.filter(
    (product) => !shownProducts.has(product.id)
  );

  if (remainingProducts.length === 0) {
    productContainer.innerHTML = `<div class="p-3">Ikke flere produkter igjen</div>
    <button id="btnHome" class="btn btn-primary m-3">Gå til forsiden</button>`;
    const btnHome = document.getElementById("btnHome");
    btnHome.addEventListener("click", (event) => {
      window.location.href = "../index.html";
    });
    return;
  }
  const product =
    remainingProducts[Math.floor(Math.random() * remainingProducts.length)];
  shownProducts.add(product.id);

  const productCard = document.createElement("div");
  const productCount = document.createElement("small");
  const productName = document.createElement("h2");
  const productImg = document.createElement("img");

  productCard.classList.add("card-body", "d-flex", "justify-content-center");
  productCount.classList.add("d-flex","justify-content-end","p-2","text-small");
  productName.classList.add("card.title", "d-flex", "justify-content-center");
  productImg.classList.add("card-img", "object-fit-cover");

  count += 1;
  productCount.innerHTML = `${count}/${data.length}`
  productName.textContent = product.name;

  productImg.src = product.image;
  productImg.alt = `Image of ${product.name}`;

  const card = document.createElement("div");
  card.classList.add("product-card");

  card.appendChild(productCount);
  card.appendChild(productName);
  card.appendChild(productImg);

  // Form div area

  const formDivArea = document.createElement("div");
  const checkForm = document.createElement("form");
  const formLabel = document.createElement("label");
  const formInput = document.createElement("input");
  const btnDiv = document.createElement("div");
  const btnCheck = document.createElement("button");
  const btnNext = document.createElement("button");

  // Form
  formDivArea.classList.add("container");
  checkForm.id = "checkForm";
  checkForm.classList.add("rounded");

  //Form label and input
  formLabel.for = "productNumber";
  formLabel.innerText = "Product number";

  formInput.id = "productNumber";
  formInput.name = "productNumber";
  formInput.setAttribute("type", "number");
  formInput.classList.add("form-control");

  // Btn's
  btnDiv.classList.add("d-flex", "justify-content-between");
  btnCheck.id = "checkBtn";
  btnCheck.innerText = "Check";
  btnCheck.classList.add(
    "btn",
    "btn-success",
    "my-2",
    "justify-content-center"
  );
  btnCheck.setAttribute("type", "submit");
  btnNext.id = "nextBtn";
  btnNext.innerText = "Next";
  btnNext.classList.add("btn", "btn-primary", "my-2", "justify-content-center");
  btnNext.setAttribute("type", "submit");

  checkForm.appendChild(formLabel);
  checkForm.appendChild(formInput);
  btnDiv.appendChild(btnCheck);
  btnDiv.appendChild(btnNext);
  formDivArea.appendChild(checkForm);
  formDivArea.appendChild(btnDiv);

  const inputNumberElement = document.getElementById("productNumber");
  const correctNumberBox = document.createElement("div");

  correctNumberBox.id = "correctNumberBox";
  correctNumberBox.innerText = `Correct number: ${product.EAN}`;
  formDivArea.appendChild(correctNumberBox);
  correctNumberBox.style.display = "none";

  btnCheck.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("hello");
    handlers.setCheckForm(product);
  });
  btnNext.addEventListener("click", (event) => {
    displayProducts();
  });
  let touchstartX = 0;
  let touchendX = 0;
  let isSwiping = false;

  function handleGesture() {
    const screenWidth = window.innerWidth;
    const swipeDistance = touchstartX - touchendX;

    if (swipeDistance > screenWidth / 2) {
      if (!isSwiping) {
        isSwiping = true;
        displayProducts();

        setTimeout(() => {
          isSwiping = false;
        }, 1000);
      }
    }
  }

  productContainer.addEventListener("touchstart", function (event) {
    touchstartX = event.changedTouches[0].screenX;
  });

  productContainer.addEventListener("touchend", function (event) {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
  });

  productCard.appendChild(card);
  productContainer.appendChild(productCard);
  productContainer.appendChild(formDivArea);
}
