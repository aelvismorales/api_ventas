import { useState, createContext, useEffect } from "react";

export const ProductContext = createContext();

//const LIST_PRODUCTS_ENDPOINT = "http://127.0.0.1:5000/producto/productos";
const LIST_PRODUCTS_SEARCH_ENDPOINT = "http://127.0.0.1:5000/producto/buscar/";
const CREAR_PRODUCT_ENDPOINT = "http://127.0.0.1:5000/producto/crear";
export function ProductContextProvider(props) {
  const [productos, setProductos] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [searchProducto, setsearchProducto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [crearProducto, setCrearProducto] = useState({
    pr_name: "",
    pr_tipo: "CONSTRUCCION",
    pr_bprice: 0.0,
    pr_sprice: 0.0,
    pr_quantity: 0.0,
  });

  const handleChangeSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const handleChangeSearchProduct = (event) => {
    setsearchProducto(event.target.value || "");
  };

  const handleInputChangeCrearProducto = (event) => {
    const { name, value } = event.target;
    setCrearProducto((prevData) => ({
      ...prevData,
      [name]:
        name === "pr_bprice" || name === "pr_sprice" || name === "pr_quantity"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleCrearSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(CREAR_PRODUCT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crearProducto),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Producto Creado", data);
        setShowModal(false);
        setCrearProducto({
          pr_name: "",
          pr_tipo: "CONSTRUCCION",
          pr_bprice: 0.0,
          pr_sprice: 0.0,
          pr_quantity: 0.0,
        });
      } else {
        console.error("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
    }
  };

  useEffect(() => {
    const fetchsearchProduct = async () => {
      try {
        const response = await fetch(
          LIST_PRODUCTS_SEARCH_ENDPOINT + searchProducto.replace(/ /g, "_")
        );
        const data = await response.json();
        setProductos(data.productos);
      } catch (error) {
        console.log("Error al obtener datos: ", error);
      }
    };
    fetchsearchProduct();
  }, [searchProducto]);

  return (
    <ProductContext.Provider
      value={{
        productos,
        sortOrder,
        handleChangeSortOrder,
        setProductos,
        handleChangeSearchProduct,
        showModal,
        setShowModal,
        crearProducto,
        handleInputChangeCrearProducto,
        handleCrearSubmit,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
