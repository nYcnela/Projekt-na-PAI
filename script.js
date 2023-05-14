const nav = document.querySelector(".nav");
const navBtn = document.querySelector(".burger-btn");
const allNavItems = document.querySelectorAll(".nav-item");
const navBtnBars = document.querySelector(".burger-btn-bars");
const submitBtn = document.getElementById("submit");
const submitBtn2 = document.getElementById("submit2");
const form = document.querySelector(".registration-form");
const registrationHeading = document.getElementById("registration-heading");
const showDataBtn = document.getElementById("data");
const backButton = document.createElement("button");

//elementy potrzebne do wypelniania formualrza wybranym ogrodem po kliknieciu guzika "wybierz" w sekcji ogrody
const gardenInput = document.getElementById("garden");
const kenrokuBtn = document.getElementById("kenrokuGarden");
const portlandBtn = document.getElementById("portlandGarden");
const jardinBtn = document.getElementById("jardinGarden");

//elementy potrzebne do wypelniania formualrza wybrana iloscia osob po kliknieciu guzika "wybierz" w sekcji ofert
const singleBtn = document.getElementById("single");
const coupleBtn = document.getElementById("couple");
const groupBtn = document.getElementById("group");

const weatherBtn = document.getElementById("weather");

const dataContainer = document.createElement("div");
const weatherContainer = document.getElementById("weather-container");

backButton.textContent = "Wróć";
backButton.classList.add("btn-special-animation", "registration-form-btn", "registration-form-bck-btn");
backButton.style.display = "none";
dataContainer.classList.add("registration-data-container");
dataContainer.appendChild(backButton);
form.parentElement.appendChild(dataContainer);

backButton.addEventListener("click", function () {
  form.style.display = "block";
  backButton.style.display = "none";
  dataContainer.style.display = "none";
  weatherContainer.style.display = "none";
  registrationHeading.style.display = "block";
});

const handleNav = () => {
  nav.classList.toggle("nav--active");
  navBtnBars.classList.remove("black-bars-color");

  allNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("nav--active");
    });
  });

  handleNavItemsAnimation();
};

const handleNavItemsAnimation = () => {
  let delayTime = 0;

  allNavItems.forEach((item) => {
    item.classList.toggle("nav-items-animaton");
    item.style.animationDelay = "." + delayTime + "s";
    delayTime++;
  });
};

navBtn.addEventListener("click", handleNav);

//funkcja odpowiedzialna na walidacje formularza rejestracyjnego
function validateForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const garden = document.getElementById("garden");
  const numberOfPeople = document.getElementsByName("numberOfPeople");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const gardenError = document.getElementById("gardenError");
  const numberOfPeopleError = document.getElementById("numberOfPeopleError");
  let isValid = true;

  // Walidacja imienia i nazwiska
  const nameRegex = /^[a-zA-Z]{1,20} [a-zA-Z]{1,40}$/;
  if (!nameRegex.test(name.value.trim())) {
    nameError.textContent = "Proszę wprowadzić poprawne imię i nazwisko";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // Walidacja e-mail
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Proszę wprowadzić prawidłowy adres e-mail";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Walidacja wyboru ogrodu
  if (!garden.value.trim()) {
    gardenError.textContent = "Proszę wybrać ogród";
    isValid = false;
  } else {
    gardenError.textContent = "";
  }

  // Walidacja przycisków radio (wybor ilosci osob)
  let oneSelected = false;
  for (let i = 0; i < numberOfPeople.length; i++) {
    if (numberOfPeople[i].checked) {
      oneSelected = true;
      break;
    }
  }
  if (!oneSelected) {
    numberOfPeopleError.textContent = "Proszę wybrać ilość osób";
    isValid = false;
  } else {
    numberOfPeopleError.textContent = "";
  }

  return isValid;
}

// walidacja formularza kontaktowego
function validateContactForm() {
  const name = document.getElementById("name2");
  const email = document.getElementById("email2");
  const msg = document.getElementById("msg2");
  const nameError = document.getElementById("nameError2");
  const emailError = document.getElementById("emailError2");
  const textAreaError = document.getElementById("textAreaError");
  let isValid = true;

  // Walidacja imienia i nazwiska
  const nameRegex = /^[a-zA-Z]{1,20} [a-zA-Z]{1,40}$/;
  if (!nameRegex.test(name.value.trim())) {
    nameError.textContent = "Proszę wprowadzić poprawne imię i nazwisko";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // Walidacja e-mail
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Proszę wprowadzić prawidłowy adres e-mail";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Walidacja wiadomości
  if (!msg.value.trim()) {
    textAreaError.textContent = "Należy wpisać wiadomość kontaktową";
    isValid = false;
  } else {
    textAreaError.textContent = "";
  }

  return isValid;
}

submitBtn2.addEventListener("click", (event) => {
  event.preventDefault();
  validateContactForm();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (validateForm()) {
    saveDataToSessionStorage();
  }
});

showDataBtn.addEventListener("click", displayStoredData);

function saveDataToSessionStorage() {
  const formData = new FormData(form);
  const dataObject = {};

  for (let [key, value] of formData.entries()) {
    dataObject[key] = value;
  }

  sessionStorage.setItem("registrationData", JSON.stringify(dataObject));
}

//funkcja odpowiedzialna za wyswietlanie danych wpisanych w formularzu
function displayStoredData() {
  const storedData = sessionStorage.getItem("registrationData");

  if (storedData) {
    const dataObject = JSON.parse(storedData);
    const numberOfPeople = document.querySelector(`input[name="numberOfPeople"]:checked`).value;
    const insurance = document.getElementById("insurance").checked ? "Tak" : "Nie";

    let messageHTML = dataObject.msg ? `<p><span class="bold-font">Wiadomość:</span> ${dataObject.msg}</p>` : "";

    dataContainer.innerHTML = `
  <p><span class="bold-font">Imię i nazwisko:</span> ${dataObject.name}</p>
  <p><span class="bold-font">Adres e-mail:</span> ${dataObject.email}</p>
  <p><span class="bold-font">Wybrany Ogród:</span> ${dataObject.garden}</p>
  <p><span class="bold-font">Ilość osób:</span> ${numberOfPeople}</p>
  <p><span class="bold-font">Dodatkowe ubezpieczenie:</span> ${insurance}</p>
  ${messageHTML}
`;
    dataContainer.appendChild(backButton);

    form.style.display = "none";
    backButton.style.display = "block";
    dataContainer.style.display = "block";
  } else {
    validateForm();
    alert("Pamietaj aby najpierw przeslac dane!");
  }
}

function selectGarden(gardenName) {
  gardenInput.value = gardenName;
}

kenrokuBtn.addEventListener("click", function () {
  selectGarden("Ogród Kenroku-en");
});

portlandBtn.addEventListener("click", function () {
  selectGarden("Portland Japanese Garden");
});

jardinBtn.addEventListener("click", function () {
  selectGarden("Jardin Japonais");
});

function selectNumberOfPeopleOption(id) {
  const radioOption = document.getElementById(id);
  radioOption.checked = true;
}

singleBtn.addEventListener("click", () => selectNumberOfPeopleOption("1"));
coupleBtn.addEventListener("click", () => selectNumberOfPeopleOption("2"));
groupBtn.addEventListener("click", () => selectNumberOfPeopleOption("2+"));

function displayWeather() {
  weatherContainer.innerHTML = `
        <div class="wrapper app">
          <div class="top">
              <h2 class="section-heading">Pogoda</h2>
              <div class="main-info">
                  <div class="main-info-smaller">
                      <h3 class="city-name"></h3>
                      <input type="text" class="weather-form-input" id="weather-input" placeholder="Wpisz nazwę miasta..."><button class="weather-btn btn-special-animation" id="weather-button">Sprawdź</button>
                      <p class="weather-error"></p>
                  </div>
                  <img src="./img/unknown.png" alt="Obrazek przedstawiający pogodę" class="photo">
              </div>
          </div>
          <div class="bottom">
              <div class="headings">
                  <p class="bottom-display">Pogoda:</p>
                  <p class="bottom-display">Temperatura:</p>
                  <p class="bottom-display">Wilgotność:</p>
              </div>
              <div class="weather-info">
                  <p class="weather"></p>
                  <p class="temperature"></p>
                  <p class="humidity"></p>
              </div>
          </div>
        </div>
      `;
  weatherContainer.appendChild(backButton);

  form.style.display = "none";
  registrationHeading.style.display = "none";
  backButton.style.display = "block";
  weatherContainer.style.display = "block";

  // nasłuchiwanie zdarzeania w tym miejscu ze względu na dynamiczne generowanie okienka z pogoda
  // nasłuchiwanie zdarzeania w tym miejscu ze względu na dynamiczne generowanie okienka z pogoda
  const input = document.getElementById("weather-input");
  const button = document.getElementById("weather-button");
  const cityName = document.querySelector(".city-name");
  const warning = document.querySelector(".weather-error");
  const photo = document.querySelector(".photo");
  const weather = document.querySelector(".weather");
  const temperature = document.querySelector(".temperature");
  const humidity = document.querySelector(".humidity");

  const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
  //tutaj nalezy wygenerowac swoj klucz api ze strony
  //https://openweathermap.org/
  //const API_KEY = "&appid=(dodanie swojego klucza API)";
  const API_KEY = "&appid=";
  const API_UNITS = "&units=metric";
  const API_LANGUAGE = "&lang=pl";

  const getWeather = () => {
    const input = document.getElementById("weather-input");
    const city = input.value || "Lublin";
    const URL = API_LINK + city + API_KEY + API_LANGUAGE + API_UNITS;

    console.log(URL);
    axios
      .get(URL)
      .then((res) => {
        const temp = Math.floor(res.data.main.temp) + "°C";
        const hum = res.data.main.humidity + "%";
        const status = Object.assign({}, ...res.data.weather);

        console.log(res);
        temperature.textContent = temp;
        humidity.textContent = hum;
        cityName.textContent = res.data.name;
        weather.textContent = status.description;

        warning.textContent = "";
        input.value = "";

        if (status.id > 200 && status.id < 300) {
          photo.setAttribute("src", "./img/thunderstorm.png");
        } else if (status.id >= 300 && status.id < 400) {
          photo.setAttribute("src", "./img/drizzle.png");
        } else if (status.id >= 400 && status.id < 500) {
          photo.setAttribute("src", "./img/rain.png");
        } else if (status.id >= 500 && status.id < 600) {
          photo.setAttribute("src", "./img/ice.png");
        } else if (status.id >= 600 && status.id < 700) {
          photo.setAttribute("src", "./img/fog.png");
        } else if (status.id >= 700 && status.id < 800) {
          photo.setAttribute("src", "./img/sun.png");
        } else if (status.id >= 800 && status.id < 900) {
          photo.setAttribute("src", "./img/cloud.png");
        } else {
          photo.setAttribute("src", "./img/unknown.png");
        }
      })
      .catch(() => (warning.textContent = "Wpisz poprawna nazwe miasta!"));
  };

  getWeather();

  const enterKeyCheck = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  input.addEventListener("keyup", enterKeyCheck);
  button.addEventListener("click", getWeather);
}

weatherBtn.addEventListener("click", displayWeather);
