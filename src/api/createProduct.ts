import axios from "axios";

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
}

const API_URL = import.meta.env.VITE_MICRO_PRODUCTS;

if (!API_URL) {
  throw new Error("La variable de entorno MICRO_PRODUCTS no está definida.");
}

export const createProduct = async (product: Product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Error al crear el producto.";
    } else {
      throw "Ocurrió un error desconocido.";
    }
  }
};
