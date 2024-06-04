
const currentUrl = window.location.href;

export async function fetchData() {
    try {
        let response = ``;
        if (currentUrl.includes(`html/frukt_gront`)) {
            response = await fetch(`../src/json/products.json`);
        }
        if (currentUrl.includes(`html/brodvarer`)) {
            response = await fetch(`../src/json/bread.json`);
        }
        if (!response.ok) {
            throw new Error(`API request failed with status: ` + response.status);
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log("Error: " + error);
    }
}