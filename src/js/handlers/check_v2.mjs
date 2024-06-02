import { displayProducts_v2 } from "../display/productDisplay_v2.mjs";

export function setCheckForm_v2(product) {
    const nextBtn = document.getElementById("nextBtn");
    
    // Extract enteredEAN from the product object
    const enteredEAN = product.enteredEAN;
    const correctNumber = product.EAN;

    if (enteredEAN == correctNumber) {
        nextBtn.style.display = "none";
        return true;
    } else {
        return false;
    }
}