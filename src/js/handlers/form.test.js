// form.test.js
import { setCheckForm_v2 } from './form';

// Mock the DOM element
document.body.innerHTML = '<button id="nextBtn" style="display: block;"></button>';

describe('setCheckForm_v2', () => {
    it('should return true and hide the next button if enteredEAN matches EAN', () => {
        const product = { enteredEAN: '12345', EAN: '12345' };
        const result = setCheckForm_v2(product);

        const nextBtn = document.getElementById("nextBtn");
        expect(result).toBe(true);
        expect(nextBtn.style.display).toBe("none");
    });

    it('should return false if enteredEAN does not match EAN', () => {
        const product = { enteredEAN: '12345', EAN: '67890' };
        const result = setCheckForm_v2(product);

        const nextBtn = document.getElementById("nextBtn");
        expect(result).toBe(false);
        expect(nextBtn.style.display).toBe("block"); // Assuming default style is block
    });

    it('should return false if enteredEAN is missing', () => {
        const product = { EAN: '12345' };
        const result = setCheckForm_v2(product);

        const nextBtn = document.getElementById("nextBtn");
        expect(result).toBe(false);
        expect(nextBtn.style.display).toBe("block");
    });

    it('should return false if EAN is missing', () => {
        const product = { enteredEAN: '12345' };
        const result = setCheckForm_v2(product);

        const nextBtn = document.getElementById("nextBtn");
        expect(result).toBe(false);
        expect(nextBtn.style.display).toBe("block");
    });
});
