// Importing the dogApi async function from module-3.mjs
import * as dogBreeds from "./module-3.mjs";
// Importing the dogApi async function from module-3.mjs
import * as dogCarousel from "./index.mjs";
// Caching the select element
const dogSelector = document.getElementById("dogBreed");
// Create Carousel item container
const carouselInnerContainer = document.querySelector("#carouselExample");
console.log(carouselInnerContainer);
/**
 *<div class="carousel-inner"></div>
 */
//======================================================================================//
console.log(
  "==================================== module.mjs 2 ===================================="
);
//======================================================================================//
// Calling the dogApi async function
dogBreeds.dogApi().then((dogData) => {
  // console.log(dogData);
  const dogDataArray = dogData.data;
  dogDataArray.forEach((dogElement) => {
    // console.log(dogElement);
    let dogOptions = document.createElement("option");
    dogOptions.setAttribute("value", `${dogElement.breed_group}`);
    dogOptions.textContent = `${dogElement.name}`;
    dogSelector.appendChild(dogOptions);
  });
});
// Event listener to select the breed of dog
dogSelector.addEventListener("change", loadDog);

async function loadDog() {
  if (carouselInnerContainer.firstChild !== null) {
    carouselInnerContainer.removeChild(carouselInnerContainer.firstChild);
  }
  const apiDogData = axios(
    `/images/search?limit=20&breed_group=${dogSelector.value}`
  );

  apiDogData.then((dogDataObj) => {
    const carouselContainer = document.createElement("div");
    carouselContainer.className = "carousel-inner";
    carouselInnerContainer.prepend(carouselContainer);

    let dogDataArrInfo = dogDataObj.data;

    dogDataArrInfo.forEach((dogDataInfo) => {
      if (dogDataInfo.breeds[0]) {
        dogCarousel.dogCarousel(
          dogDataInfo.url,
          dogDataInfo.breeds[0].name,
          carouselContainer
        );
      } else {
        dogCarousel.dogCarousel(
          dogDataInfo.url,
          "There is no name at this time",
          carouselContainer
        );
      }
    });
  });
}
