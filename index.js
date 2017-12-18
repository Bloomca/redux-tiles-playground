import basic from "./js/basic";
import caching from "./js/caching";
import nesting from "./js/nesting";

const mapping = {
  basic,
  caching,
  nesting
};

const reduxTilesCodeNode = document.getElementById("redux-tiles-code");
const vanillaCodeNode = document.getElementById("vanilla-code");

const choices = document.querySelectorAll(".choice");
const choicesArray = Array.from(choices);

choicesArray.forEach(choice => {
  const value = choice.getAttribute("data-value");

  console.log(choices, value);

  const code = mapping[value];

  choice.addEventListener("click", () => {
    reduxTilesCodeNode.innerHTML = code.reduxTiles;
    vanillaCodeNode.innerHTML = code.vanilla;

    choicesArray.forEach(choice => {
      choice.classList.remove("active");
    });

    choice.classList.add("active");
  });
});
