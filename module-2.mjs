console.log(
  "==================================== module.mjs 2 ===================================="
);
//======================================================================================//
const dogSelector = document.getElementById("dogBreed");
//======================================================================================//
import * as dogBreeds from "./module-3.mjs";
// console.log(dogBreeds);
dogBreeds.dogApi().then((dogData) => {
  // console.log(dogData);
  const dogDataArray = dogData.data;
  dogDataArray.forEach((dogElement) => {
    // console.log(dogElement);
    let dogOptions = document.createElement("option");
    dogOptions.setAttribute("value", `${dogElement.id}`);
    dogOptions.textContent = `${dogElement.name}`;
    dogSelector.appendChild(dogOptions);
  });
});
