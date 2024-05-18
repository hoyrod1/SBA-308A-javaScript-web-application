console.log(
  "==================================== module.mjs 3 ===================================="
);
//======================================================================================//
const apiDogKey =
  "live_V3DCshCl0LBcbkwZQT83gsYGPqNLtnfM3Z2UmCDmO5EV4HRD9382dQ3lTLOuOpfr";
axios.defaults.baseURL = "https://api.thedogapi.com/v1";
axios.defaults.headers.common["x-api-key"] = apiDogKey;
//======================================================================================//
// Caching the Carousel item container
const carouselInnerContainer = document.querySelector("#carouselExample");
//======================================================================================//
export async function dogApi() {
  const dogsData = await axios.get("/breeds");
  //-------------- INITIALIZING THE FIRST DOG IMAGES WHEN THE PAGE LOADS ---------------//
  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel-inner";
  carouselInnerContainer.prepend(carouselContainer);
  // Created element div for image carousel
  let imgDiv = document.createElement("div");
  // Set the class for imgDiv
  imgDiv.className = "carousel-item active";
  // Created image element
  let imgElement = document.createElement("img");
  imgElement.style.height = "650px";
  // Set the class for img element
  imgElement.className = "d-block w-100";
  // Set image source attribute for  img element
  imgElement.setAttribute("src", dogsData.data[5].image.url);
  // Set image alt attribute for  img element
  imgElement.setAttribute("alt", dogsData.data[5].reference_image_id);
  imgDiv.appendChild(imgElement);
  carouselContainer.appendChild(imgDiv);
  //-----------------------------------------------------------------------------------//
  const dogsDataArray = dogsData.data;
  // THE foreach LOOPS THROUGH THE ARRAY OF OBJECT CONTAINING THE ALL THE DOGS
  dogsDataArray.forEach((dogData) => {
    // console.log(dogData);
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
    imgElement.setAttribute("src", dogData.image.url);

    // Set image alt attribute for  img element
    imgElement.setAttribute("alt", dogData.reference_image_id);
    imgDiv.appendChild(imgElement);
    carouselContainer.appendChild(imgDiv);
  });

  return dogsData;
}
