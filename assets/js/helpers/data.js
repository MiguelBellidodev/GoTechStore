// Este helper centraliza la obtención de datos desde archivos JSON o APIs.
export const getData = async (url) => {
  try {
    // Realiza la solicitud HTTP al recurso indicado.
    const req = await fetch(url);

    // Convierte la respuesta a un objeto JavaScript.
    const res = await req.json();

    // Devuelve los datos para que otros módulos los consuman.
    return res;
  } catch (error) {
    // Muestra el problema en consola si falla la carga de datos.
    console.error(error.message);
  }
};
