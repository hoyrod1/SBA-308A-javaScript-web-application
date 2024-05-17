console.log(
  "==================================== index.mjs ===================================="
);
//======================================================================================//
const carouselDiv = document.querySelector(".carousel-inner");
//======================================================================================//
export function dogCarousel(dogUrlImage, dogName, carouselContainer) {
  // Created element div for image carousel
  let imgDiv = document.createElement("div");
  // Set the class for imgDiv
  imgDiv.className = "carousel-item active";
  // Created image element
  let imgElement = document.createElement("img");
  imgElement.style.height = "500px";
  // Set the class for img element
  imgElement.className = "d-block w-100";
  // Set image source attribute for  img element
  imgElement.setAttribute("src", dogUrlImage);
  // Set image alt attribute for  img element
  imgElement.setAttribute("alt", dogName);
  // Appending imgElement(img)element to imgDiv(div)
  imgDiv.appendChild(imgElement);
  // Appending imgDiv(div) to carouselDiv(div)
  carouselContainer.appendChild(imgDiv);
  // console.log(imgDiv);
}
