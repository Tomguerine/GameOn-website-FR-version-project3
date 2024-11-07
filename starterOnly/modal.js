function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const reserve = document.getElementById("reserve");
const closeBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
closeBtn.addEventListener("click", closeModal);

// Close modal function
function closeModal() {
  modalbg.style.display = "none";
}

// Form validation
reserve.addEventListener("submit", validate);

function validate(event) {
  event.preventDefault();

  // Initialize variables
  let isValid = true;

  // Get form elements
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const locations = document.getElementsByName("location");
  const terms = document.getElementById("checkbox1");
  // const subscribe = document.getElementById('checkbox2'); // optional

  // Remove previous error messages
  const formDataElements = document.querySelectorAll(".formData");
  formDataElements.forEach((formData) => {
    formData.removeAttribute("data-error");
    formData.setAttribute("data-error-visible", "false");
  });

  // Validate First Name
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
  if (firstName.value.trim().length < 2 || !nameRegex.test(firstName.value)) {
    // Show error message
    const parentElement = firstName.parentElement;
    parentElement.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom sans chiffres."
    );
    parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Validate Last Name
  if (lastName.value.trim().length < 2 || !nameRegex.test(lastName.value)) {
    // Show error message
    const parentElement = lastName.parentElement;
    parentElement.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    // Show error message
    const parentElement = email.parentElement;
    parentElement.setAttribute(
      "data-error",
      "Vous devez entrer une adresse email valide."
    );
    parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Validate Birthdate
  if (birthdate.value === "") {
    const parentElement = birthdate.parentElement;
    parentElement.setAttribute(
      "data-error",
      "Vous devez entrer votre date de naissance."
    );
    parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Validate Quantity (number of tournaments)
  if (quantity.value === "" || isNaN(quantity.value) || quantity.value < 0) {
    const parentElement = quantity.parentElement;
    parentElement.setAttribute(
      "data-error",
      "Vous devez entrer un nombre valide."
    );
    parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Validate Locations (radio buttons)
  let locationSelected = false;
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      locationSelected = true;
      break;
    }
  }
  if (!locationSelected) {
    const locationFormData = document.querySelector(".formData:nth-of-type(6)");
    locationFormData.setAttribute(
      "data-error",
      "Vous devez choisir une option."
    );
    locationFormData.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Validate Terms and Conditions
  if (!terms.checked) {
    const parentElement = terms.parentElement;
    parentElement.setAttribute(
      "data-error",
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  if (isValid) {
    // Show success message
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "<p>Merci ! Votre réservation a été reçue.</p>";
  }
}
