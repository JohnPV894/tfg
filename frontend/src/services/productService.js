const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(
  /\/+$/,
  ''
);

/**
 * Realiza una petición a la API REST del backend y lanza un error legible
 * si el servidor Express o MongoDB no responden. Nunca devuelve datos ficticios.
 */
async function requestJson(endpoint) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`);
  } catch {
    throw new Error(
      'No se pudo contactar con el servidor backend. Verifica que la API Express esté en ejecución.'
    );
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error ||
      `Error HTTP ${response.status} al consultar los productos en MongoDB.`;
    throw new Error(message);
  }

  return payload;
}

export async function fetchProducts() {
  const data = await requestJson('/products');
  if (!Array.isArray(data?.products)) {
    throw new Error('La respuesta de la API no contiene una lista válida de productos.');
  }
  return data.products;
}

export async function fetchProductById(id) {
  const data = await requestJson(`/products/${encodeURIComponent(id)}`);
  if (!data?.product) {
    throw new Error('No se encontró el producto solicitado en MongoDB.');
  }
  return data.product;
}

