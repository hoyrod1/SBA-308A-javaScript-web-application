console.log(
  "==================================== module.mjs 3 ===================================="
);
//======================================================================================//
const dogSelector = document.getElementById("dogBreed");
const apiDogKey =
  "live_V3DCshCl0LBcbkwZQT83gsYGPqNLtnfM3Z2UmCDmO5EV4HRD9382dQ3lTLOuOpfr";
axios.defaults.baseURL = "https://api.thedogapi.com/v1";
axios.defaults.headers.common["x-api-key"] = apiDogKey;
//======================================================================================//

export async function dogApi() {
  const dogsData = await axios("/breeds");
  return dogsData;
}
dogApi().then((dogData) => {
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
