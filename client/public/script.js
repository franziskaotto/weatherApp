const weatherApiKey = `601bea40ee6049ddba9120143233008`;
const weatherURL = `http://api.weatherapi.com/v1/current.json?key=`;

const prexelsAPI = `SYWzkiLZEo88KYy5QQCDqVTJzOv1nrVqY4zVKcnJbbhmNneVSKWCWIpw`;

const apiPexlUrl = "https://api.pexels.com/v1/search";
const apiPexlKey = "pI4YpniccB06CT3ltrsyZupv6InhW8jh3YSLCAt4dRlmiz2cOBmclk7P";

let rootE;
let cardE = createCard();
let searchDiv = createSearchDiv();
let inputField = createInputField();
let favBtn = createFavButton();
let favIMG = createFavIMG();
// let favList = createFavList();
let weatherDataDiv = createWeatherDataDiv();
let dataList;
let inputCityValue = "";
let cityArray = [];
let favArray = [];

const city = getCityNameFromInputField();

const imgDiv = document.createElement("div");
imgDiv.id = "imgDiv";
rootE.appendChild(imgDiv);

async function fetchImageData(city) {
  console.log(city);
  try {
    const response = await fetch(`${apiPexlUrl}?query=${city}`, {
      headers: { Authorization: apiPexlKey },
    });
    const imgData = await response.json();
    if (!response.ok) {
      return;
    }
    if (response.ok) {
      console.log(`response ok, image api data for ${city}: `, imgData);

      console.log(imgData.photos.length);
      if (imgData.photos.length === 0) {
        displayAlternativeBG();
      } else {
        displayImage(imgData);
      }
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
  return;
}

function getCityNameFromInputField() {
  const weatherDiv = document.getElementById("weatherDiv"); //to empty the weatherData shown
  const inputField = document.getElementById("input");

  inputField.oninput = () => {
    input.innerHTML = "";
    if (inputField.value.length >= 3) {
      weatherDiv.innerHTML = "";
      let cityLetters = inputField.value;
      fetchCityForSuggestion(cityLetters);
    }
  };
}

async function fetchCityForSuggestion(cityLetters) {
  const cityURL = `http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${cityLetters}`;

  try {
    const res = await fetch(cityURL);
    const data = await res.json();
    cityArray = [];
    cityArray = citySuggestionArray(data).slice();
    createDropdownForAutocomplete(cityArray);
  } catch (error) {
    console.log(error.message);
  }
  //ClickFavButton(inputCityValue)

  if (
    cityArray.includes(inputCityValue) ||
    inputCityValue.includes("Airport")
  ) {
    input.innerHTML = "";
    fetchImageData(inputCityValue.split(",")[0]);
    getWeatherData(inputCityValue);
  }
}

function citySuggestionArray(locationArray) {
  let suggestionList = [];
  inputField = document.getElementById("input");
  locationArray.forEach((locObject) => {
    let name = locObject.name;
    let country = locObject.country;
    suggestionList.push(`${name}, ${country}`);
  });

  return suggestionList;
}

function createDropdownForAutocomplete(cityArray) {
  let input = document.getElementById("input");
  let dataList = document.createElement("datalist");
  dataList.id = "CityNames";

  cityArray.forEach((city) => {
    let option = document.createElement("option");
    option.value = `${city}`;
    dataList.appendChild(option);
  });
  input.appendChild(dataList);

  inputCityValue = document.getElementById("input").value;
  console.log("inputCityValue: ", inputCityValue);
}

async function getWeatherData(cityName) {
  try {
    const res = await fetch(weatherURL + weatherApiKey + "&q=" + cityName);
    const data = await res.json();
    showWeatherData(data);
  } catch (error) {
    console.log(error.message);
  }
}

function createFavButton() {
  const searchParent = document.getElementById("searchField");
  const favBtn = document.createElement("button");
  favBtn.id = "favButton";
  favBtn.classList.add("favBtn");
  searchParent.appendChild(favBtn);
  return favBtn;
}

function createFavIMG() {
  const favParent = document.getElementById("favButton");
  const heartIMG = document.createElement("img");
  heartIMG.id = "heart";
  heartIMG.classList.add("heartClass");
  heartIMG.src = "client/Images/herz.png";
  favParent.appendChild(heartIMG);
}

// function createFavList(favArray) {
//   const searchParent = document.getElementById("searchField");
//   let favListDropdown = document.createElement("select");

//   favListDropdown.addEventListener("change", (e) => {
//     console.log("Dropdown change");
//     getWeatherData(e.target.value);
//   });
//   searchParent.appendChild(favListDropdown);

//  // TODO: create the favButton
//   // favArray.forEach(city => {

//   //   let opt = document.createElement("option")
//   //   opt.innerHTML = city
// 	// 	favListDropdown.appendChild(opt);

//   // })
// 	searchParent.appendChild(favListDropdown);

// }

function showWeatherData(data) {
  //WeatherPictogram
  let currentWeatherIconURL = data["current"]["condition"]["icon"];
  createIcon(currentWeatherIconURL);

  //Temperature
  let currentTemp = data["current"]["temp_c"];
  createTempHeading(currentTemp);

  //CityName + Country
  let currentCity = data["location"]["name"];
  let currentCountry = data["location"]["country"];
  createCityHeading(currentCity, currentCountry);

  //humidity
  let humidity = data["current"]["humidity"];
  //wind
  let wind = data["current"]["wind_kph"];
  createDetailsDiv(humidity, wind);
}

function createCard() {
  rootE = document.getElementById("root");
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = "cardE";

  rootE.appendChild(card);
  return card;
}

function createInputField() {
  searchDiv = document.getElementById("searchField");
  const inputField = document.createElement("input");

  inputField.id = "input";
  inputField.placeholder = "enter city name";
  inputField.setAttribute("list", "CityNames");

  searchDiv.appendChild(inputField);
  return input;
}

function createSearchDiv() {
  let cardElement = document.getElementById("cardE");
  const searchDiv = document.createElement("div");
  searchDiv.classList.add("search");
  searchDiv.id = "searchField";
  cardElement.appendChild(searchDiv);
  return searchDiv;
}

function createWeatherDataDiv() {
  let cardElement = document.getElementById("cardE");
  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("weather");
  weatherDiv.id = "weatherDiv";

  cardElement.appendChild(weatherDiv);
  return weatherDiv;
}

function createDetailsDiv(humidity, wind) {
  const weatherE = document.getElementById("weatherDiv");
  const detailDiv = document.createElement("div");
  detailDiv.classList.add("details");
  detailDiv.id = "detailsDiv";
  weatherE.appendChild(detailDiv);

  //Left coloumn Humidity
  const humidityDiv = document.createElement("div");
  humidityDiv.classList.add = "left";
  humidityDiv.id = "left";
  detailDiv.appendChild(humidityDiv);

  //image
  const detailE = document.getElementById("left");
  const humidityImg = document.createElement("img");
  humidityImg.classList.add = "colLeft";
  humidityImg.id = "coloumnLeft";
  humidityImg.src = "client/Images/humidity.png";
  detailE.appendChild(humidityImg);

  //number
  const colLeftDIV = document.createElement("div");
  colLeftDIV.id = "humidity";
  colLeftDIV.innerHTML = "Humidity: " + humidity + "%";
  detailE.appendChild(colLeftDIV);

  //right coloumn wind
  const rightDiv = document.createElement("div");
  rightDiv.classList.add = "right";
  rightDiv.id = "right";
  detailDiv.appendChild(rightDiv);

  //image
  const detailRight = document.getElementById("right");
  const colRightIMG = document.createElement("img");
  colRightIMG.classList.add = "colRight";
  colRightIMG.id = "coloumRight";
  colRightIMG.src = "client/Images/wind.png";
  detailRight.appendChild(colRightIMG);

  //number
  const colRightDIV = document.createElement("div");
  colRightDIV.id = "wind";
  colRightDIV.innerHTML = "Wind: " + wind + " km/h";
  detailRight.appendChild(colRightDIV);
}

// objects shown in card

function createIcon(URL) {
  const weatherE = document.getElementById("weatherDiv");
  const icon = document.createElement("img");
  icon.classList.add("icon");
  icon.src = URL;
  weatherE.appendChild(icon);
}

function createCityHeading(city, country) {
  const weatherE = document.getElementById("weatherDiv");
  const cityH2 = document.createElement("h2");
  cityH2.classList.add("city");
  cityH2.innerHTML = city + ", " + country;
  weatherE.appendChild(cityH2);
}

function createTempHeading(currentTemp) {
  const weatherE = document.getElementById("weatherDiv");
  const tempH1 = document.createElement("h1");
  tempH1.classList.add("temp");
  tempH1.innerHTML = currentTemp + "°C";
  weatherE.appendChild(tempH1);
}

// ----------------------------------------------------------

function displayImage(imgData) {
  console.log("inside display img");

  const rootE = document.getElementById("root");
  console.log(rootE);
  rootE.removeAttribute("style");

  const hasImgChild = imgDiv.firstChild && imgDiv.firstChild.tagName === "IMG";
  const image = document.getElementById("cardIMG");
  if (hasImgChild) {
    console.log("imgDiv has an img child");
    imgDiv.removeChild(image);

    const cardIMG = document.createElement("img");
    cardIMG.id = "cardIMG";
    let imgUrl = imgData.photos[0].src.large;
    console.log(imgUrl);
    let imgElement = document.createElement("img");
    imgElement.src = imgUrl;
    cardIMG.src = `${imgUrl}`;
    cardIMG.style.backgroundSize = "cover";
    cardIMG.style.position = "absolute";
    cardIMG.style.left = "0";
    cardIMG.style.top = "0";
    cardIMG.style.width = "100%";
    cardIMG.style.height = "100%";
    cardIMG.style.zIndex = "-1";
    imgDiv.appendChild(cardIMG);
  } else {
    const cardIMG = document.createElement("img");
    cardIMG.id = "cardIMG";
    let imgUrl = imgData.photos[0].src.large;
    console.log(imgUrl);
    let imgElement = document.createElement("img");
    imgElement.src = imgUrl;
    cardIMG.src = `${imgUrl}`;
    cardIMG.style.backgroundSize = "cover";
    cardIMG.style.position = "absolute";
    cardIMG.style.left = "0";
    cardIMG.style.top = "0";
    cardIMG.style.width = "100%";
    cardIMG.style.height = "100%";
    cardIMG.style.zIndex = "-1";
    imgDiv.appendChild(cardIMG);
  }
}

function displayAlternativeBG() {
  console.log("function alternative bg");
  const rootE = document.getElementById("root");
  rootE.style.backgroundColor = "#555";

  const img = document.getElementById("cardIMG");
  console.log(img);
  img.remove();
}

favBtn.onclick = () => {
  console.log(inputCityValue);
  const chosenCity = inputCityValue.split(",")[0];
  console.log(chosenCity);
  if (!favArray.includes(chosenCity)) {
    favArray.push(chosenCity);
    console.log("favArray: ", favArray);
  } else {
    favArray = favArray.filter((elem) => elem != chosenCity);
    console.log("favArray: ", favArray);
  }
  console.log(favArray);
  createFavList(favArray);
};


const menu = document.createElement("select");

menu.addEventListener("change", (e) => {
	console.log("Dropdown change");
	weatherDiv.innerHTML = "";
	getWeatherData(e.target.value);
});


function createFavList(favArray) {
  console.log(favArray);
  const weatherDiv = document.getElementById("weatherDiv");

  const searchField = document.getElementById("searchField");
 

  if (favArray !== undefined) {
    favArray.forEach((city) => {
      let opt = document.createElement("option");
      opt.value = city; // Set the value attribute of the option
      opt.textContent = city; // Set the text content of the option
      menu.appendChild(opt); // Append the option to the select element
    });
    searchField.appendChild(menu);
  }
}
