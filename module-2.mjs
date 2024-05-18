// Importing the dogApi async function from module-3.mjs
import * as dogBreeds from "./module-3.mjs";
// Importing the dogApi async function from module-3.mjs
import * as dogCarousel from "./index.mjs";
// Caching the select element
const dogSelector = document.getElementById("dogBreed");
// Create Carousel item container
const carouselInnerContainer = document.querySelector("#carouselExample");
//======================================================================================//
console.log(
  "==================================== module.mjs 2 ===================================="
);
//======================================================================================//
// Calling the dogApi async function
dogBreeds.dogApi().then((dogData) => {
  const dogDataArray = dogData.data;
  dogDataArray.forEach((dogElement) => {
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
    let dogDataArrInfo = dogDataObj.data;
    //--------------------- INITIALIZING THE FIRST DOG IMAGE ---------------------//
    // CREATING THE CAROUSEL CONTAINER DIV WITH THE CLASS NAME carousel-inner
    const carouselContainer = document.createElement("div");
    carouselContainer.className = "carousel-inner";
    carouselInnerContainer.prepend(carouselContainer);
    // CREATING THE INITIAL NESTED DIV CLASS NAME WITH carousel-item active
    // THE FOLLOWING POPULATED DIV CLASS NAME WILL ONLY HAVE carousel-item
    let imgDiv = document.createElement("div");
    // Set the class for imgDiv
    imgDiv.className = "carousel-item active";
    // Created image element
    let imgElement = document.createElement("img");
    imgElement.style.height = "650px";
    // Set the class for img element
    imgElement.className = "d-block w-100";
    // Set image source attribute for  img element
    imgElement.setAttribute("src", dogDataArrInfo[5].url);
    // Set image alt attribute for  img element
    imgElement.setAttribute("alt", dogDataArrInfo[5].id);
    imgDiv.appendChild(imgElement);
    carouselContainer.appendChild(imgDiv);
    //-----------------------------------------------------------------------------//
    // THE foreach LOOPS THROUGH THE ARRAY OF OBJECT FROM THE SELECTED BREED OF DOGS
    dogDataArrInfo.forEach((dogDataInfo) => {
      // THIS CHECKS IF THE breeds ARRAY HAS AN OBJECT
      // WITH name, bred_for, temperament, life_span and height
      // IF THEY'RE NOT STRING PLACEHOLDER VAULES ARE SET
      // THE carouselContainer IS PASSED IN AS AN ARGUMENT
      if (dogDataInfo.breeds[0] !== undefined) {
        dogCarousel.dogCarousel(
          dogDataInfo.id,
          dogDataInfo.url,
          dogDataInfo.breeds[0].name,
          dogDataInfo.breeds[0].bred_for,
          dogDataInfo.breeds[0].temperament,
          dogDataInfo.breeds[0].life_span,
          dogDataInfo.breeds[0].height,
          carouselContainer
        );
      } else {
        dogCarousel.dogCarousel(
          dogDataInfo.id,
          dogDataInfo.url,
          "There name is unknown",
          "This dog has no specific purpose for being bred",
          "The tempermant if this dog is unknown but treat the doogy the way you want to be treated",
          "Life span is unknown",
          "Hieght is unknown",
          carouselContainer
        );
      }
    });
  });
}
