import { getElement } from "./helpers/elements.js";
// Importa las funciones del catálogo para inicializar la vista principal.
import {
  renderListProducts,
  renderCategories,
  bestProduct,
} from "./modules/catalog.js";
import {
  validateName,
  validateEmail,
  validateMessage,
} from "./modules/contact.js";

import { renderCart, clearCart } from "./modules/cart.js";

// Configuración inicial de la navegación móvil y el carrito.
const navbar = getElement("#mobileNavbar");
const cart = getElement("#cart");
const btnMenu = getElement("#btnMenu");
const btnCart = getElement("#btnCart");
const btnCartClose = getElement("#btnCartClose");
const btnCartClear = getElement("#btnCartClean");

// Alterna la visibilidad del menú y del panel del carrito.
btnMenu.addEventListener("click", () => {
  cart.classList.remove("active");
  if (navbar.classList.contains("active")) {
    navbar.classList.remove("active");
  } else {
    navbar.classList.add("active");
  }
});

// Abre o cierra el carrito desde el botón correspondiente.
btnCart.addEventListener("click", () => {
  navbar.classList.remove("active");
  if (cart.classList.contains("active")) {
    cart.classList.remove("active");
  } else {
    cart.classList.add("active");
  }
});

// Cierra ambos paneles cuando se presiona el botón de cerrar.
btnCartClose.addEventListener("click", () => {
  navbar.classList.remove("active");
  cart.classList.remove("active");
});

btnCartClear.addEventListener("click", () => clearCart());

// Referencias del formulario de contacto para validar cada campo.
const form = document.querySelector("#contactForm");
const formName = document.querySelector("#formName");
const formEmail = document.querySelector("#formEmail");
const formMsg = document.querySelector("#formMsg");

const feedFormName = document.querySelector("#feedFormName");
const feedFormEmail = document.querySelector("#feedFormEmail");
const feedFormMsg = document.querySelector("#feedFormMsg");
const feedForm = document.querySelector("#feedForm");

// Valida el formulario antes de enviarlo y muestra mensajes de feedback.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameError = validateName(formName.value);
  const emailError = validateEmail(formEmail.value);
  const msgError = validateMessage(formMsg.value);

  if (nameError && nameError.length > 0) {
    feedFormName.textContent = nameError;
  } else {
    feedFormName.textContent = "";
  }

  if (emailError && emailError.length > 0) {
    feedFormEmail.textContent = emailError;
  } else {
    feedFormEmail.textContent = "";
  }

  if (msgError && msgError.length > 0) {
    feedFormMsg.textContent = msgError;
  } else {
    feedFormMsg.textContent = "";
  }
  feedForm.classList.remove("valid");

  if (nameError || emailError || msgError) {
    feedForm.textContent = "Revisá los campos marcados.";
    return;
  }

  feedForm.textContent = "Formulario enviado correctamente.";
  feedForm.classList.add("valid");
  setTimeout(() => {
    feedForm.textContent = "";
    feedForm.classList.remove("valid");
    form.reset();
  }, 500);
});

// Inicializa los módulos principales de la aplicación.
bestProduct();
renderListProducts();
renderCategories();

renderCart();
