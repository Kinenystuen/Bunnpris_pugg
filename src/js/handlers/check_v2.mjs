import { displayProducts_v2 } from "../display/productDisplay_v2.mjs";

export function setCheckForm_v2(product) {
    const correctNumberBox = document.getElementById("correctNumberBox");
    const nextBtn = document.getElementById("nextBtn");
    
    // Extract enteredEAN from the product object
    const enteredEAN = product.enteredEAN;
    const correctNumber = product.EAN;

    console.log(`Entered EAN: ${enteredEAN}, Correct EAN: ${correctNumber}`);

    if (enteredEAN == correctNumber) {
        correctNumberBox.style.display = "none";
        nextBtn.style.display = "none";
        
        setTimeout(function() {
            displayProducts_v2();
        }, 500);
        return true;
    } else {
        correctNumberBox.style.display = "block";
        correctNumberBox.innerText = `Correct number: ${correctNumber}`;
        return false;
    }
}