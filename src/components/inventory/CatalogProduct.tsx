import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product";
import { getCatalogProduct } from "../../api/catalogProduct";
import Table from "react-bootstrap/Table";
import { ModalWarningStock } from "./ModalWarning";
import Button from "react-bootstrap/esm/Button";

export const CatalogProducts = () => {
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const gettingListProducts = await getCatalogProduct();
        setListProducts(gettingListProducts);
      } catch (error: any) {
        setErrorMessage(error.message || "Error al obtener los productos.");
      }
    };

    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setSelectedProduct(null); // Cierra el modal deseleccionando el producto
  };
  return (
    <>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {/* {listProducts.map((product) => {
        if (product.stock < 10) {
          return (
            <ModalWarningStock
              key={product.id}
              stock={product.stock}
              name={product.name}
              isOpen={true}
            />
          );
        }
        return null;
      })} */}

      {listProducts.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category || "Sin categoría"}</td>
                {product.stock < 10 && (
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Advertencia
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !errorMessage && <p>No hay productos disponibles.</p>
      )}

      {selectedProduct && (
        <ModalWarningStock
          stock={selectedProduct.stock}
          name={selectedProduct.name}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
