import { score } from "./productDisplay_v2.mjs";
export async function showProgressCircle(totalProducts) {
  const productContainer = document.getElementById("card2");
  const messageScore = document.createElement("strong");
  const progressDiv = document.createElement("div");
  const homeBtn = document.createElement("button");
  
  messageScore.classList.add("p-3","mx-auto");
  messageScore.innerText = "Score:";
  progressDiv.id = "progressCircle";
  progressDiv.classList.add("my-3", "d-flex", "justify-content-center", "max-width-50","mx-auto");
  homeBtn.id = "btnHome";
  homeBtn.classList.add("btn", "btn-primary", "m-3");
  homeBtn.innerText = "Gå til forsiden";

  productContainer.appendChild(messageScore);
  productContainer.appendChild(progressDiv);
  productContainer.appendChild(homeBtn);

  const btnHome = document.getElementById("btnHome");
  btnHome.addEventListener("click", (event) => {
    window.location.href = "../index.html";
  });

  const progressValue = score / totalProducts;

  const circle = new ProgressBar.Circle("#progressCircle", {
    color: "#4caf50",
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 2000,
    from: { color: '#aaa', width: 1 },
    to: { color: "#28a745", width: 4 },
    step: (state, circle) => {
      circle.path.setAttribute("stroke", state.color);
      const value = Math.round(circle.value() * 100);
      circle.setText(`${value}%`);
    },
  });

  circle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  circle.text.style.fontSize = "2rem";
  circle.animate(progressValue);
}
