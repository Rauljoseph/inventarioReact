import axios from "axios";

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
}

const API_URL = "http://localhost:3000/products/";

export const createProduct = async (product: Product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Error al crear el producto.";
  }
};