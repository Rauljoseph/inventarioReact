import axios from "axios";

const API_URL = import.meta.env.VITE_MICRO_PRODUCTS;

if (!API_URL) {
  throw new Error("La variable de entorno MICRO_PRODUCTS no está definida.");
}

export const getCatalogProduct = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data.data.response);

    return response.data.data.response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Error al crear el producto.";
    } else {
      throw "Ocurrió un error desconocido.";
    }
  }
};
