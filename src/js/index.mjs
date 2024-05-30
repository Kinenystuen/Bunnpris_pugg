import * as display from "./display/index.mjs";
import * as handlers from "./handlers/index.mjs";

const currentUrl = window.location.href;

if (currentUrl.includes(`html/frukt_gront`) ) {
    display.displayProducts();
}