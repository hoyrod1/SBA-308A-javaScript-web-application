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
}
//-----------------------------------------------------------------------------------------------//
//========== ATTACHED A CLICK EVENT LISTENER TO THE CONTAINER DISPLAYING THE DOG IMAGE ==========//
carouselDivContainer.addEventListener("click", displayDogDescription);
//------------------ THIS FUNCTION CREATES THE DOG DESCRIPTION IF THERE IS ONE ------------------//
async function displayDogDescription(e) {
  // CACHES THE DIV DISPLAYING THE DOG DESCRIPTION WHEN IT IS CREATED
  const dogDescDiv = document.querySelector(".dog-description");
  // THE SELECTED DOGS IMAGE ID IS STORED IN THE ALT ATTRIBUTE AND CACHED TO dogID
  if (e.target.alt === undefined) return;
  let dogId = e.target.alt;
  // FETCHING THE SELECTED DOGS INFORMATION
  const dogsImageData = await axios(`/images/${dogId}`);
  // THIS REMOVES A DOG DESCRIPTION IF THERE IS ONE DISPLAYED
  if (dogDescDiv !== null) {
    dogDescDiv.remove();
  }
  // THIS CHECKS IF THE SELECTED DOG HAS A DESCRIPTION AND IF NOT THE FUCNTION IS RETURNED
  if (dogsImageData.data.breeds === undefined) return;
  // THE breeds ARRAY IS CACHED SO THE DOGS DESCRIPTION CAN BE SET
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
  //----------------------------------------------------------------------------------------------//
  //================= BUTTON IS CREATED TO DECIDE IF YOU LIKE OR DISLIKE THE DOG =================//
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
  //-----------------------------------------------------------------------------------------------//
  //==================== CACHING BUTTON1 AND BUTTON2 FOR THE LIKE AND DISLIKE =====================//
  const button1 = document.querySelector(".button1");
  const button2 = document.querySelector(".button2");
  //======== ATTACHED EVENT LISTENER ON BUTTON1 THAT WILL LISTEN IF LIKE BUTTON IS CLICKED ========//
  button1.addEventListener("click", dogLikeVote);
  //------------------------- FUNCTION TO POST A LIKE TO THE SELECTED DOG -------------------------//
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
  //-----------------------------------------------------------------------------------------------//
  //======= ATTACHED EVENT LISTENER ON BUTTON2 THAT WILL LISTEN IF DISLIKE BUTTON IS CLICKED ======//
  button2.addEventListener("click", dogDisLikeVote);
  //------------------------ FUNCTION TO POST A DISLIKE TO THE SELECTED DOG -----------------------//
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
  //-----------------------------------------------------------------------------------------------//
}
