import axios from "axios";

const API_URL = "https://stage-micro-products.onrender.com/products";

export const getCatalogProduct = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data.data.response);
    
    return response.data.data.response;
  } catch (error: any) {
    throw error.response?.data?.message || "Error al crear el producto.";
  }
};
