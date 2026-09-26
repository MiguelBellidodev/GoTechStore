// Helpers para guardar la información persistente del carrito en localStorage.

// Recupera un valor almacenado bajo la clave indicada y lo convierte de JSON.
export const getStore = (key) =>
  localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;

// Guarda una estructura de datos en localStorage con formato JSON.
export const setStore = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

// Elimina un dato específico guardado en localStorage.
export const removeStore = (key) => localStorage.removeItem(key);
