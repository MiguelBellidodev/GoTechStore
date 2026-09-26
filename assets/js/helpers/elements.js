// Colección de utilidades para manipular el DOM de forma más limpia.

// Retorna el primer elemento que coincide con el selector CSS recibido.
export const getElement = (selector) => document.querySelector(selector);

// Retorna una lista de elementos que coinciden con el selector CSS indicado.
export const getElements = (selector) => document.querySelectorAll(selector);

// Elimina del documento el elemento encontrado por el selector.
export const removeElement = (selector) =>
  document.removeChild(getElement(selector));

// Crea un nodo HTML nuevo según la etiqueta indicada.
export const createElement = (tag) => document.createElement(tag);
