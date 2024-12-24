import React, { useState } from "react";
import "./createProduct.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { createProduct } from "../../api/createProduct";
import Spinner from "react-bootstrap/Spinner";
import { Product } from "../../interfaces/product";
const CreateProduct = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: name === "price" || name === "stock" ? Number(value) : value, // Convierte `price` y `stock` a números
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateInputsProduct();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await createProduct(product);
      setSuccessMessage("Se ha creado exitosamente");
      setProduct({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message || "Error al obtener los productos.");
      } else {
        setErrorMessage("Error desconocido al obtener los productos.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputsProduct = () => {
    if (
      product.name === "" ||
      product.description === "" ||
      product.price < 0 ||
      product.stock < 0
    ) {
      setErrorMessage("Los campos son obligatorios");
      return;
    }

    if (product.price < 0) {
      setErrorMessage("El campo precio debe ser mayor o igual a cero");
      return;
    }
    if (product.stock <= 0) {
      setErrorMessage("El campo stock debe ser mayor o igual a cero");
      return;
    }
    setErrorMessage("");
  };

  return (
    <>
      <h2>Crear Producto</h2>
      <Form className="create-products">
        <Form.Label htmlFor="">Nombre</Form.Label>
        <Form.Control
          type="text"
          required
          value={product.name}
          placeholder="Nombre"
          name="name"
          onChange={handleChangeProduct}
        />
        <Form.Label htmlFor="">Descripción</Form.Label>
        <Form.Control
          type="text"
          required
          value={product.description}
          placeholder="Descripcion"
          name="description"
          onChange={handleChangeProduct}
        />
        <Form.Label htmlFor="">Precio</Form.Label>
        <Form.Control
          type="text"
          required
          value={product.price}
          placeholder="Precio"
          name="price"
          onChange={handleChangeProduct}
        />
        <Form.Label htmlFor="">Stock</Form.Label>
        <Form.Control
          type="text"
          required
          value={product.stock}
          placeholder="Stock"
          name="stock"
          onChange={handleChangeProduct}
        />
        <Form.Label htmlFor="">Categoria</Form.Label>
        <Form.Control
          type="text"
          value={product.category}
          placeholder="Categoria"
          name="category"
          onChange={handleChangeProduct}
        />
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Button
            variant="primary"
            className="button-save"
            onClick={handleSubmit}
          >
            Guardar producto
          </Button>
        )}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
      </Form>
    </>
  );
};

export default CreateProduct;
