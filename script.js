const nav = document.querySelector(".nav");
const navBtn = document.querySelector(".burger-btn");
const allNavItems = document.querySelectorAll(".nav-item");
const navBtnBars = document.querySelector(".burger-btn-bars");
const submitBtn = document.getElementById("submit");
const form = document.querySelector(".registration-form");
const showDataBtn = document.getElementById("data");
const dataContainer = document.createElement("div");
const backButton = document.createElement("button");
const singleBtn = document.getElementById("single");
const coupleBtn = document.getElementById("couple");
const groupBtn = document.getElementById("group");

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

//funkcja odpowiedzialna na walidacje formularza
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

function selectNumberOfPeopleOption(id) {
  const radioOption = document.getElementById(id);
  radioOption.checked = true;
}

singleBtn.addEventListener("click", () => selectNumberOfPeopleOption("1"));
coupleBtn.addEventListener("click", () => selectNumberOfPeopleOption("2"));
groupBtn.addEventListener("click", () => selectNumberOfPeopleOption("2+"));
