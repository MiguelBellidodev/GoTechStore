// Módulo responsable de cargar, filtrar y mostrar productos del catálogo.
import { getData } from "../helpers/data.js";
import { getElement, createElement } from "../helpers/elements.js";
import { addItemCart, renderCart } from "./cart.js";

// Obtiene los productos y, opcionalmente, los filtra por categoría.
export const getProducts = async (category = null) => {
  let products = await getData("/assets/data/productos.json");

  if (category) {
    products = products.filter(
      (product) => product.category.toLowerCase() == category.toLowerCase(),
    );
  }

  return products;
};

// Obtiene el conjunto de categorías únicas disponibles en el archivo JSON.
export const getCategories = async () => {
  const products = await getData("/assets/data/productos.json");
  let categories = products.map(({ category }) => category);
  return new Set([...categories]);
};

// Renderiza todas las tarjetas del catálogo o las que pasen por filtro.
export const renderListProducts = async (products = []) => {
  const productos = await getProducts();
  const list = getElement("#catalogList");

  list.innerHTML = null;

  if (products.length == 0) {
    for await (const product of productos) {
      const item = await createProductCard(product);
      list.append(item);
    }
  } else {
    for (const product of products) {
      const item = await createProductCard(product);
      list.append(item);
    }
  }
};

// Crea la estructura HTML de una tarjeta de producto con sus acciones.
export const createProductCard = async (product = null) => {
  if (!product) return;

  const {
    id,
    name,
    category,
    image,
    description,
    price,
    discount,
    attributes,
  } = product;

  const card = createElement("li");
  const cardImage = createElement("picture");
  const cardData = createElement("dl");
  const cardActions = createElement("form");
  const cardBtnInfo = createElement("button");
  const cardBtnCart = createElement("button");
  const cardModal = createElement("dialog");

  const currency = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  // Completa la información visible de la tarjeta.
  card.dataset.category = category;
  cardImage.innerHTML = `<img src="./assets/img/products/${image}" alt="joystick gaming xbox"/>`;

  const value = !discount
    ? currency.format(price)
    : currency.format(price - (price * discount) / 100);

  cardData.innerHTML = `<dt>${name}</dt><dd>${value}</dd>`;

  // Botón para abrir el modal con detalles del producto.
  cardBtnInfo.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"                 stroke-width="2">
      <path d="M19.875 6.27c.7.398 1.13 1.143 1.125 1.948v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98zM12 9h.01"/>
      <path d="M11 12h1v4h1" />
    </g>
  </svg>`;
  cardBtnInfo.setAttribute("type", "button");
  cardBtnInfo.className = "btnInfo";
  cardBtnInfo.setAttribute("command", "show-modal");
  cardBtnInfo.setAttribute("commandFor", `product-modal-${id}`);
  cardBtnInfo.setAttribute("aria-label", `Ver información del producto ${id}`);
  cardBtnInfo.setAttribute("aria-haspopup", `dialog`);
  cardBtnInfo.setAttribute("aria-controls", `product-modal-${id}`);
  cardActions.append(cardBtnInfo);

  // Botón para agregar el producto al carrito.
  cardBtnCart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"             stroke-width="2">
      <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
      <path d="M12.5 17H6V3H4" />
      <path d="m6 5l14 1l-.86 6.017M16.5 13H6m10 6h6m-3-3v6" />
    </g>
  </svg>`;
  cardBtnCart.setAttribute("type", "button");
  cardBtnCart.className = "btnAddToCart";
  cardBtnCart.addEventListener("click", () => {
    addItemCart(product);
    renderCart();
  });
  cardActions.append(cardBtnCart);

  // Modal con la descripción y atributos del producto.
  cardModal.setAttribute("id", `product-modal-${id}`);
  cardModal.className = "productDialog";

  const features = Object.keys(attributes).map((key) => ({
    attr: key,
    value: attributes[key],
  }));

  cardModal.innerHTML = `<article> <h3>${name.toUpperCase()}</h3> <p>${description}</p>
    <dl>${features.map(({ attr, value }) => `<dt>${attr.toUpperCase()}</dt> <dd>${value}</dd>`).join("")}</dl>
    <form method="dialog">
      <button type="submit" class="btnCloseDialog" command="close" commandfor="product-modal-${id}">
        Cerrar
      </button>
    </form>
  </article>`;

  card.append(cardImage, cardData, cardActions, cardModal);
  return card;
};

// Renderiza las categorías dentro del selector del catálogo.
export const renderCategories = async () => {
  const categories = await getCategories();
  const selectCategories = getElement("#catalogCategories");

  for (const category of categories) {
    const optionCategory = createElement("option");
    optionCategory.innerText = category.toUpperCase();
    optionCategory.setAttribute("value", category.toLowerCase());
    selectCategories.append(optionCategory);
  }

  selectCategories.addEventListener("click", async (e) => {
    const value = e.target.value;
    const products = await getProducts(value);
    renderListProducts(products);
  });
};

// Obtiene el producto destacado según la lógica de oferta disponible.
export const generateBestProduct = async () => {
  const products = await getProducts();
  // Filtar los productos por el precio.
  const offerts = products.filter(({ discount }) => discount);
  const options = offerts.map(({ id }) => id);
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const random = getRandom(0, options.length - 1);
  const idRandom = options.find((_, i) => i == random);
  const best = offerts.find(({ id }) => id == idRandom);
  return best;
};

// Crea la estructura HTML del producto destacado.
export const bestProduct = async () => {
  const product = await generateBestProduct();
  const { image, name, price, discount } = product;
  const art = getElement("#bestOnSale");
  const picture = createElement("picture");
  const data = createElement("dl");
  const form = createElement("form");
  const btn = createElement("button");
  const currency = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const value = currency.format(price - (price * discount) / 100);
  picture.innerHTML = `<img src="./assets/img/products/${image}" alt="${name}"/>`;
  data.innerHTML = `
      <dt>${name}</dt>
      <dd><span>${currency.format(price)}</span> <span>${value}</span></dd>
  `;
  form.onSubmit = (e) => e.preventDefault();
  btn.setAttribute("type", "button");
  btn.setAttribute("aria-label", `Comprar el producto ${name}`);
  btn.innerHTML = `Comprar Ahora`;
  btn.addEventListener("click", (e) => {
    addItemCart(product);
    renderCart();
  });
  form.append(btn);
  art.innerHTML = "";
  return art.append(picture, data, form);
};
