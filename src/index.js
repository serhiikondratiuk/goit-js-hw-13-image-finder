import cardTemplate from "./templates/photoCard.hbs";
import fetchData from "./js/apiService";
const gallery = document.querySelector(".gallery");
const input = document.querySelector("input");
const debounce = require("lodash.debounce");
input.addEventListener("input", debounce(onInputChange, 1500));

function renderMarkup(data) {
  const markupList = cardTemplate(data);
  gallery.insertAdjacentHTML("beforeend", markupList);
}

function onInputChange(e) {
  const searchQuery = e.target.value;
  fetchData(searchQuery).then(renderMarkup);
}
