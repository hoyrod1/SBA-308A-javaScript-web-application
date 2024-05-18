console.log(
  "==================================== index.mjs ===================================="
);
//======================================================================================//
const body = document.body;
const carouselDivContainer = document.querySelector("#carouselExample");
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
  imgElement.setAttribute("alt", id);
  // Appending imgElement(img)element to imgDiv(div)
  imgDiv.appendChild(imgElement);
  // Appending imgDiv(div) to carouselDiv(div)
  carouselContainer.appendChild(imgDiv);
  // console.log(imgDiv);
  // dogDescription(id, dogName, bred_for, tempermant, life_span, height);
}
carouselDivContainer.addEventListener("click", loadSingleDogImage);

async function loadSingleDogImage(e) {
  const dogDescDiv = document.querySelector(".dog-description");
  // console.log(dogDescDiv);
  if (e.target.alt === undefined) return;
  let dogId = e.target.alt;
  // console.log(dogId);
  const dogsImageData = await axios(`/images/${dogId}`);

  if (dogDescDiv !== null) {
    dogDescDiv.remove();
  }
  // console.log(dogsImageData.data.breeds[0]);
  let individualDogData = dogsImageData.data.breeds[0];
  const dogDescriptiondDiv = document.createElement("div");
  dogDescriptiondDiv.className = "dog-description";
  dogDescriptiondDiv.style.backgroundColor = "beige";
  dogDescriptiondDiv.style.width = "50%";
  dogDescriptiondDiv.style.padding = "10px";
  dogDescriptiondDiv.style.margin = "5px auto";
  dogDescriptiondDiv.style.border = "2px solid #373408";
  dogDescriptiondDiv.style.boxShadow = "2px 12px 45px 5px black";
  const dogH1 = document.createElement("h1");
  dogH1.style.textDecoration = "underline";
  dogH1.style.textAlign = "center";
  dogH1.textContent = `${individualDogData.name}`;
  const dogH2 = document.createElement("h2");
  dogH2.style.textAlign = "center";
  dogH2.textContent = `id number: ${individualDogData.reference_image_id}`;
  const dogH4 = document.createElement("h4");
  dogH4.style.textAlign = "left";
  dogH4.style.textDecoration = "underline";
  dogH4.textContent = "Additional Info below:";
  const dogP1 = document.createElement("p");
  dogP1.style.textAlign = "left";
  dogP1.textContent = `Temperament - ${individualDogData.temperament}`;
  const dogP2 = document.createElement("p");
  dogP2.style.textAlign = "left";
  dogP2.textContent = `Bred for - ${individualDogData.bred_for}`;
  const dogP3 = document.createElement("p");
  dogP3.style.textAlign = "left";
  dogP3.textContent = `The life span - ${individualDogData.life_span}`;
  const dogP4 = document.createElement("p");
  dogP4.style.textAlign = "left";
  dogP4.textContent = `Imperial - weight: ${individualDogData.height.imperial} | metric - weight: ${individualDogData.height.metric}`;
  dogDescriptiondDiv.appendChild(dogH1);
  dogDescriptiondDiv.appendChild(dogH2);
  dogDescriptiondDiv.appendChild(dogH4);
  dogDescriptiondDiv.appendChild(dogP1);
  dogDescriptiondDiv.appendChild(dogP2);
  dogDescriptiondDiv.appendChild(dogP3);
  dogDescriptiondDiv.appendChild(dogP4);
  const likeButton1 = document.createElement("buton");
  likeButton1.className = "button1";
  likeButton1.textContent = "Click to like";
  likeButton1.style.background = "green";
  likeButton1.style.color = "white";
  likeButton1.style.margin = "10px";
  likeButton1.style.padding = "5px";
  const likeButton2 = document.createElement("buton");
  likeButton2.className = "button2";
  likeButton2.textContent = "Click to dislike";
  likeButton2.style.background = "red";
  likeButton2.style.color = "white";
  likeButton2.style.margin = "10px";
  likeButton2.style.padding = "5px";
  dogDescriptiondDiv.appendChild(likeButton1);
  dogDescriptiondDiv.appendChild(likeButton2);
  body.appendChild(dogDescriptiondDiv);
  const button1 = document.querySelector(".button1");
  button1.addEventListener("click", dogLikeVote);
  const button2 = document.querySelector(".button2");
  button2.addEventListener("click", dogDisLikeVote);

  async function dogLikeVote(e) {
    try {
      const likeObj = {
        image_id: individualDogData.reference_image_id,
        sub_id: "RodneyStCloud",
        value: 1,
      };
      const dogLikeVote = await axios.post(`/votes`, likeObj);
      console.log(dogLikeVote.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function dogDisLikeVote(e) {
    try {
      const disLikeObj = {
        image_id: individualDogData.reference_image_id,
        sub_id: "RodneyStCloud",
        value: -1,
      };
      const dogDisLikeVote = await axios.post(`/votes`, disLikeObj);
    } catch (error) {
      console.log(error.response);
    }
  }
}
