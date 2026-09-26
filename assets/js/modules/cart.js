import { getStore, setStore, removeStore } from "../helpers/store.js";
import { createElement, getElement } from "../helpers/elements.js";
// Módulo encargado del manejo del carrito de compras.

// Agrega un producto al carrito o incrementa la cantidad si ya existe.
export const addItemCart = (product) => {
  // Recupera los productos guardados; si no existe, arranca con un array vacío.
  const cart = getStore("cart") || [];

  // Busca si el producto ya estaba cargado en el carrito.
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // Si ya existe, suma una unidad más.
    existingProduct.quantity += 1;
  } else {
    // Si no existe, lo agrega con cantidad inicial 1.
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  // Guarda el carrito actualizado en localStorage.
  setStore("cart", cart);
};

// Renderiza el contenido actual del carrito en el DOM.
export const renderCart = () => {
  const cart = getStore("cart") || [];
  const cartItems = getElement("#cartItems");
  const cartQuantity = getElement("#cartCounter");
  const cartSubtotal = getElement("#cartSubtotal");
  const cartDelivery = getElement("#cartDelivery");
  if (!cartItems || !cartQuantity || !cartSubtotal || !cartDelivery) return;

  // Limpia el contenido previo para volver a dibujar el carrito actual.
  cartItems.innerHTML = "";
  cartQuantity.innerHTML = "0";
  cartSubtotal.innerHTML = "0";
  cartDelivery.innerHTML = "0";

  if (cart.length === 0) {
    // Muestra un estado vacío si no hay productos agregados.
    cartItems.innerHTML = `
    <li>
    <p>Tu carrito está vacío</p>
    </li>
    `;
    return;
  }

  cartQuantity.innerHTML = cart
    .map(({ quantity }) => quantity)
    .reduce((a, c) => (a += c), 0);
  const currency = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const subtotal = cart
    .map(({ quantity, price }) => quantity * price)
    .reduce((a, c) => (a += c), 0);
  const shipping =
    subtotal > 300
      ? "Gratis"
      : `${currency.format(subtotal - (subtotal * 50) / 100)}`;
  cartSubtotal.innerHTML = `${currency.format(subtotal)}`;
  cartDelivery.innerHTML = shipping;
  // Genera una tarjeta por cada producto del carrito.
  cart.forEach((item) => cartItems.appendChild(renderItemCart(item)));
};

// Renderiza un item del carrito

export const renderItemCart = (item) => {
  const li = createElement("li");
  const picture = createElement("picture");
  picture.innerHTML = `<img src="./assets/img/products/${item.image}" alt="${item.name}" />`;
  const data = createElement("dl");
  data.innerHTML = `<dt>${item.name}</dt> <dd>$${item.price}</dd>`;
  const formQuantity = createElement("form");
  formQuantity.onSubmit = (e) => e.preventDefault();
  const btnAddQuantity = createElement("button");
  btnAddQuantity.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path fill="currentColor" d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z" />
  </svg>`;
  btnAddQuantity.setAttribute("type", "button");
  btnAddQuantity.setAttribute("aria-label", "Aumentar cantidad");
  btnAddQuantity.addEventListener("click", () => addQuantityItemCart(item));
  const outputQuantity = createElement("output");
  outputQuantity.innerHTML = item.quantity;
  const btnReduceQuantity = createElement("button");
  btnReduceQuantity.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path fill="currentColor" d="M3 11h18v2H3z" />
  </svg>`;
  btnReduceQuantity.setAttribute("type", "button");
  btnReduceQuantity.setAttribute("aria-label", "Disminuir cantidad");
  btnReduceQuantity.addEventListener("click", () =>
    reduceQuantityItemCart(item),
  );
  formQuantity.append(btnReduceQuantity, outputQuantity, btnAddQuantity);
  const formRemove = createElement("form");
  const btnRemove = createElement("button");
  btnRemove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
  </svg>`;
  btnRemove.setAttribute("type", "button");
  btnRemove.setAttribute("aria-label", "Eliminar producto");
  formRemove.onSubmit = (e) => e.preventDefault();
  btnRemove.addEventListener("click", () => removeItemCart(item));
  formRemove.append(btnRemove);
  li.append(picture, data, formQuantity, formRemove);
  return li;
};

// Agrega un producto nuevo o aumenta su cantidad.
export const addQuantityItemCart = (item) => {
  const cart = getStore("cart");
  const update = cart.map((itemCart) => {
    if (itemCart.id == item.id) {
      itemCart.quantity += 1;
    }
    return itemCart;
  });
  setStore("cart", update);
  renderCart();
};

// Elimina completamente un producto del carrito.
export const removeItemCart = (item) => {
  const cart = getStore("cart");
  const update = cart.filter((itemCart) => itemCart.id != item.id);
  setStore("cart", update);
  renderCart();
};

// Reduce en una unidad la cantidad de un producto.
export const reduceQuantityItemCart = (item) => {
  const cart = getStore("cart");
  const update = cart
    .map((itemCart) => {
      if (itemCart.id == item.id) {
        itemCart.quantity -= 1;
      }
      return itemCart;
    })
    .filter(({ quantity }) => quantity > 0);
  setStore("cart", update);
  renderCart();
};

// Elimina todos los productos del carrito
export const clearCart = () => {
  removeStore("cart");
  renderCart();
};
