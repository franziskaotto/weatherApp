console.log("Hello Script.js, you are found!")



const weatherApiKey = `601bea40ee6049ddba9120143233008`;
const weatherURL = `http://api.weatherapi.com/v1/current.json?key=`;

const prexelsAPI = `SYWzkiLZEo88KYy5QQCDqVTJzOv1nrVqY4zVKcnJbbhmNneVSKWCWIpw`


let rootE;
let cardE = createCard()
let searchDiv = createSearchDiv()
let inputField =createInputField()
let favBtn = createFavButton()
let favIMG = createFavIMG()
let favList = createFavList()
let weatherDataDiv = createWeatherDataDiv()
let dataList;
const city = getCityNameFromInputField();





//ToDo idee
//je nach temperatur den Hintergrun ändern


function getCityNameFromInputField () {
  const weatherDiv = document.getElementById("weatherDiv") //to empty the weatherData shown
  const inputField = document.getElementById("input")

  inputField.oninput = (event) => {
    console.log(event)
    if(inputField.value.length >= 3) {
      weatherDiv.innerHTML = ""

      let cityLetters = inputField.value
      console.log(cityLetters)
      fetchCityForSuggestion(cityLetters)
      
    }
  };
}



async function fetchCityForSuggestion(cityLetters) {
  console.log(cityLetters)

  const cityURL = `http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${cityLetters}`

  try {
    const res = await fetch(cityURL)
    const data = await res.json()
    let cityArray= citySuggestionArray(data)
    createDropdownForAutocomplete(cityArray)
    console.log("inside fetch cities getCityForSuggestion ")
    console.log(cityArray)
    console.log(data)

  } catch (error) {
    console.log(error.message)
  }
}



async function getWeatherData(cityName) {
  
 //const airpollution;
  try {
    const res = await fetch(weatherURL + weatherApiKey + "&q=" + cityName)
    const data = await res.json()
    console.log("inside fetch data")
    console.log(data)
    showWeatherData(data)
  } catch (error) {
    console.log(error.message)
  }

  
}



function citySuggestionArray(locationArray) {
  let suggestionList = []
  console.log(locationArray)
 
  inputField = document.getElementById("input")

  locationArray.forEach(locObject => {

    let name = locObject.name
    let country = locObject.country
    suggestionList.push(`${name}, ${country}`)
  });
  

  console.log(suggestionList);
  console.log("inside createSuggestionDropdown")

  return suggestionList
}


function createDropdownForAutocomplete(locationArray) {
  let input = document.getElementById("input")
  let dataList = document.createElement("datalist")
  dataList.id ="CityNames"

  locationArray.forEach(city => {
    let option = document.createElement("option")
    option.value = `${city}`
    dataList.appendChild(option)
   
  });
  input.appendChild(dataList)

  let inputCityValue = document.getElementById('input').value;
  console.log(inputCityValue)
  getWeatherData(inputCityValue)
  //favButton()
  onClickFavButton(inputCityValue)

}

//favourite Button ////////////////////////////////////////////////////////////////////////////////
function createFavButton() {
  const searchParent = document.getElementById("searchField")
  const favBtn = document.createElement("button")
  favBtn.id = "favButton"
  favBtn.classList.add("favBtn")
  searchParent.appendChild(favBtn)
  
}

function createFavIMG() {
  const favParent = document.getElementById("favButton")
  const heartIMG = document.createElement("img")
  heartIMG.id = "heart"
  heartIMG.classList.add("heartClass")
  heartIMG.src = "/Images/herz.png"
  console.log(heartIMG)
  favParent.appendChild(heartIMG)
}

function onClickFavButton(chosenCity) {
  let favArray = []
  const favBtn = document.getElementById("favButton")
  
  favBtn.addEventListener("click", (e) => {
    console.log("click")
    favArray.push(chosenCity)
    console.log(chosenCity)
    createFavList(favArray)
  })
  console.log(favArray)
}


//favourite List for Dropdown/////////////////////////////////////////////////////////////////////////////////////
function createFavList(favArray) {
  const searchParent = document.getElementById("searchField")
  let favListDropdown = document.createElement("select")
  

  favListDropdown.addEventListener("change", (e) => {
    console.log("Dropdown change")
    getWeatherData(e.target.value)
  })
  searchParent.appendChild(favListDropdown)


  // favArray.forEach(city => {
  //   let opt = document.createElement("option")
  //   opt.innerHTML = city
    
  // })

}



function showWeatherData(data) {
  console.log(data)

  //WeatherPictogram
  let currentWeatherIconURL = data["current"]["condition"]["icon"]
  createIcon(currentWeatherIconURL)

  //Temperature
  let currentTemp = data["current"]["temp_c"]
  createTempHeading(currentTemp)


 //CityName + Country
  let currentCity = data["location"]["name"]
  let currentCountry = data["location"]["country"]
  createCityHeading(currentCity, currentCountry)



  //humidity
  let humidity = data["current"]["humidity"]
  //wind
  let wind = data["current"]["wind_kph"]
  createDetailsDiv(humidity, wind)

}



//create a guard to only insert ONE search




function createCard() {
  rootE = document.getElementById("root")
  const card = document.createElement("div")
  card.classList.add("card")
  card.id = "cardE"
  rootE.appendChild(card)
  return card
}

function createInputField() {
  searchDiv = document.getElementById("searchField")
  const inputField = document.createElement("input")
 
  inputField.id = ("input")
  inputField.placeholder = "enter city name"
  inputField.setAttribute("list", "CityNames")


  searchDiv.appendChild(inputField)
  return input
}

function createSearchDiv() {
  let cardElement = document.getElementById("cardE")
  const searchDiv = document.createElement("div")
  searchDiv.classList.add("search")
  searchDiv.id = "searchField"
  cardElement.appendChild(searchDiv)
  return searchDiv
}

function createWeatherDataDiv() {
  let cardElement = document.getElementById("cardE")
  const weatherDiv = document.createElement("div")
  weatherDiv.classList.add("weather")
  weatherDiv.id = "weatherDiv"
  
  
  cardElement.appendChild(weatherDiv)
  return weatherDiv
}

function createDetailsDiv(humidity, wind){
  const weatherE = document.getElementById("weatherDiv")
  const detailDiv = document.createElement("div")
  detailDiv.classList.add("details")
  detailDiv.id ="detailsDiv"
  weatherE.appendChild(detailDiv)

  //Left coloumn Humidity
  const LeftDiv = document.createElement("div")
  LeftDiv.classList.add = "left"
  LeftDiv.id = "left"
  detailDiv.appendChild(LeftDiv)

  //image
  const detailE = document.getElementById("left")
  const colLeftIMG = document.createElement("img")
  colLeftIMG.classList.add = "colLeft"
  colLeftIMG.id = "coloumnLeft"
  colLeftIMG.src = "Images/humidity.png"
  detailE.appendChild(colLeftIMG)

  //number
  const colLeftDIV = document.createElement("div")
  colLeftDIV.id = "humidity"
  colLeftDIV.innerHTML = "Humidity: " + humidity + "%"
  detailE.appendChild(colLeftDIV)

  
  
  //right coloumn wind
  const rightDiv = document.createElement("div")
  rightDiv.classList.add = "right"
  rightDiv.id = "right"
  detailDiv.appendChild(rightDiv)

  //image
  const detailRight = document.getElementById("right")
  const colRightIMG = document.createElement("img")
  colRightIMG.classList.add = "colRight"
  colRightIMG.id = "coloumRight"
  colRightIMG.src = "Images/wind.png"
  detailRight.appendChild(colRightIMG)

  //number
  const colRighttDIV = document.createElement("div")
  colRighttDIV.id = "wind"
  colRighttDIV.innerHTML = "Wind: " + wind + " km/h"
  detailRight.appendChild(colRighttDIV)
}

// objects shown in card


function createIcon(URL) {
  const weatherE = document.getElementById("weatherDiv")
  const icon = document.createElement("img")
  icon.classList.add("icon")
  icon.src = URL
  weatherE.appendChild(icon)
}


function createCityHeading(city, country) {
  const weatherE = document.getElementById("weatherDiv")
  const cityH2 = document.createElement("h2")
  cityH2.classList.add("city")
  cityH2.innerHTML = city + ", " + country
  cityH2.style.color = "#ebfffc"
  weatherE.appendChild(cityH2)
}

function createTempHeading(currentTemp) {
  const weatherE = document.getElementById("weatherDiv")
  const tempH1 = document.createElement("h1")
  tempH1.classList.add("temp")
  tempH1.innerHTML = currentTemp + "°C"
  tempH1.style.color = "#ebfffc"
  weatherE.appendChild(tempH1)
}








