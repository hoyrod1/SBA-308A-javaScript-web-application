console.log(
  "==================================== index.mjs ===================================="
);
//======================================================================================//
const carouselDiv = document.querySelector(".carousel-inner");
const carouselDivContainer = document.querySelector("#carouselExample");
// console.log(carouselDivContainer);
//======================================================================================//
export function dogCarousel(
  id,
  dogUrlImage,
  dogName,
  bred_for,
  tempermant,
  life_span,
  height,
  carouselContainer
) {
  // Created element div for image carousel
  let imgDiv = document.createElement("div");
  // Set the class for imgDiv
  imgDiv.className = "carousel-item";
  // Created image element
  let imgElement = document.createElement("img");
  imgElement.style.height = "650px";
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
  dogDescription(id, dogName, bred_for, tempermant, life_span, height);
}

export function dogDescription(
  id,
  dogName,
  bred_for,
  tempermant,
  life_span,
  height
) {
  const dogDescriptiondDiv = document.createElement("div");
  const dogDescriptiondPreTag1 = document.createElement("hr");
  const dogDescriptiondPreTag2 = document.createElement("nr");
  dogDescriptiondDiv.style.width = "80%";
  const dogH1 = document.createElement("h1");
  dogH1.style.textAlign = "center";
  dogH1.textContent = `${dogName}`;
  dogDescriptiondDiv.appendChild(dogH1);
  const dogH2 = document.createElement("h2");
  dogH2.style.textAlign = "center";
  dogH2.textContent = `${id}`;
  dogDescriptiondDiv.appendChild(dogH2);

  carouselDivContainer.appendChild(dogDescriptiondDiv);
  // console.log(id);
  console.log(dogName);
  // console.log(bred_for);
  // console.log(tempermant);
  // console.log(life_span);
  // console.log(height);
}
