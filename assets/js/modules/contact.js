// Módulo de validación para los formularios de contacto.

// Valida que el nombre tenga un formato correcto.
export const validateName = (value = "") => {
  const name = value.trim();

  if (name.length < 2) {
    return "El nombre debe tener al menos 2 caracteres";
  }

  // Solo permite letras, espacios y tildes para evitar caracteres inválidos.
  if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(name)) {
    return "El nombre solo puede contener letras y espacios";
  }

  return "";
};

// Valida que el correo electrónico tenga un formato correcto.
export const validateEmail = (value = "") => {
  const email = value.trim();

  if (!email) {
    return "El correo es obligatorio";
  }

  // Expresión regular que verifica el formato estándar de un email.
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return "ingrese un correo válido";
  }

  return "";
};

// Valida que el mensaje no esté vacío.
export const validateMessage = (value = "") => {
  const message = value.trim();

  if (!message) {
    return "el mensaje no puede estar vacio";
  }

  return "";
};
