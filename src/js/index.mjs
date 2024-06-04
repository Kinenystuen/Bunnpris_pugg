import * as display from "./display/index.mjs";
import * as handlers from "./handlers/index.mjs";

const currentUrl = window.location.href;

if (currentUrl.includes(`html/frukt_gront`) && !currentUrl.includes('html/frukt_gront_v2')) {
    display.displayProducts();
}
if (currentUrl.includes(`html/frukt_gront_v2`) || currentUrl.includes(`html/brodvarer`)) {
    display.displayProducts_v2();
}