import { useState, createContext, useEffect } from "react";

export const ProductContext = createContext();

const LIST_PRODUCTS_SEARCH_ENDPOINT = "http://127.0.0.1:5000/producto/buscar/";
const CREAR_PRODUCT_ENDPOINT = "http://127.0.0.1:5000/producto/crear";
const CREAR_NOTA_PEDIDO_ENDPOINT = "http://127.0.1:5000/venta/crear";
const ACTUALIZAR_PRODUCTO_ENDPOINT = "http://127.0.1:5000/producto/actualizar/";
const ELIMINAR_PRODUCTO_ENDPOINT = "http://127.0.1:5000/producto/eliminar/";
const IMPRIMIR_NOTA_PEDIDO_ENDPOINT = "http://127.0.1:5000/venta/ver/";
export function ProductContextProvider(props) {
  const [productos, setProductos] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [searchProducto, setsearchProducto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalActualizar, setShowModalActualizar] = useState(false);

  const [crearProducto, setCrearProducto] = useState({
    pr_name: "",
    pr_tipo: "CONSTRUCCION",
    pr_bprice: 0.0,
    pr_sprice: 0.0,
    pr_quantity: 0.0,
  });

  const [actualizarProducto, setActualizarProducto] = useState({
    pr_id: "",
    pr_name: "",
    pr_tipo: "CONSTRUCCION",
    pr_bprice: 0.0,
    pr_sprice: 0.0,
    pr_quantity: 0.0,
  });
  const [carritoProducto, setCarritoProducto] = useState([]);
  const [notaPedido, setNotaPedido] = useState({
    ven_tipo: "CANCELADO",
    com_name: "",
    com_address: "",
    com_telefono: "",
    com_dni: "",
    acuenta: 0.0,
    productos: [],
  });

  const [notaPedidoImprimir, setNotaPedidoImprimir] = useState({
    ven_id: "",
    comp_name: "",
    com_addresses: "",
    com_dni: "",
    com_telefono: "",
    ven_date: "",
    ven_tipo: "",
    ven_total: "",
    acuenta: 0.0,
    productos: [],
  });

  const [correcto, setCorrecto] = useState({
    estado: false,
    mensaje: "",
    color: "",
  });

  const closeCorrecto = () => {
    setCorrecto({ estado: false, color: "", mensaje: "" });
  };

  const agregarAlCarrito = (producto) => {
    const productoInCarritoIndex = carritoProducto.findIndex(
      (item) => item.pr_id === producto.pr_id
    );
    console.log(productoInCarritoIndex);

    if (productoInCarritoIndex >= 0) {
      const newCarrito = structuredClone(carritoProducto);
      newCarrito[productoInCarritoIndex].quantity += 1;
      newCarrito[productoInCarritoIndex].discount = 0;
      return setCarritoProducto(newCarrito);
    }

    setCarritoProducto((prevState) => [
      ...prevState,
      {
        ...producto,
        quantity: 1,
        discount: 0,
      },
    ]);
  };

  const vaciarCarrito = () => {
    setCarritoProducto([]);
  };

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
  const handleInputChangeActualizarProducto = (event) => {
    const { name, value } = event.target;
    setActualizarProducto((prevData) => ({
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
        setCorrecto({
          estado: true,
          mensaje: "SE CREO EL PRODUCTO CORRECTAMENTE",
          color: "green",
        });
      } else {
        setCorrecto({
          estado: true,
          mensaje: "NO SE PUDO CREAR EL PRODUCTO",
          color: "yellow",
        });
        console.error("Error al crear el producto");
      }
    } catch (error) {
      setCorrecto({
        estado: true,
        mensaje: "NO SE PUDO CREAR EL PRODUCTO",
        color: "red",
      });
      console.error("Error en la solicitud", error);
    }
  };

  const handleEliminarProducto = async (event, pr_id) => {
    event.preventDefault();
    try {
      const response = await fetch(ELIMINAR_PRODUCTO_ENDPOINT + pr_id, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const updateProductos = productos.filter(
          (item) => item.pr_id !== pr_id
        );
        setProductos(updateProductos);
        setCorrecto({
          estado: true,
          mensaje: "SE ELIMINO EL PRODUCTO CORRECTAMENTE",
          color: "green",
        });
      } else {
        setCorrecto({
          estado: true,
          mensaje:
            "NO SE PUEDE ELIMINAR ESTE PRODUCTO YA QUE SE ENCUENTRA EN VARIAS NOTAS DE PEDIDO",
          color: "yellow",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
    }
  };
  const handleActualizarProductoSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        ACTUALIZAR_PRODUCTO_ENDPOINT + actualizarProducto.pr_id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(actualizarProducto),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Se actualizo producto: " + data);
        setShowModal(false);
        setActualizarProducto({
          pr_id: "",
          pr_name: "",
          pr_tipo: "CONSTRUCCION",
          pr_bprice: 0.0,
          pr_sprice: 0.0,
          pr_quantity: 0.0,
        });
        setCorrecto({
          estado: true,
          mensaje: "SE ACTUALIZO EL PRODUCTO CORRECTAMENTE",
          color: "green",
        });
      } else {
        console.error("Error actualizar producto");
        setCorrecto({
          estado: true,
          mensaje: "NO SE PUDO ACTUALIZAR EL PRODUCTO",
          color: "yellow",
        });
      }
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  };
  const handleInputChangeCrearNotaPedido = (event) => {
    const { name, value } = event.target;
    setNotaPedido((prevData) => ({
      ...prevData,
      [name]: value,
      ["productos"]: carritoProducto,
    }));
  };
  const handleCrearSubmitNotaPedido = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(CREAR_NOTA_PEDIDO_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaPedido),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Nota Pedido", data);
        setNotaPedido({
          ven_tipo: "",
          com_name: "",
          com_address: "",
          com_telefono: "",
          com_dni: "",
          acuenta: 0.0,
          productos: [],
        });
        setCarritoProducto([]);
        setCorrecto({
          estado: true,
          mensaje: "SE CREO LA NOTA DE PEDIDO CORRECTAMENTE",
          color: "green",
        });
        console.log(data.venta.ven_id);
        putLocalStorageData(data.venta.ven_id.toString());
      } else {
        console.error("Error al crear la nota pedido");
        setCorrecto({
          estado: true,
          mensaje: "NO SE PUDO CREAR LA NOTA DE PEDIDO",
          color: "yellow",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
      setCorrecto({
        estado: true,
        mensaje: "NO SE PUDO CREAR LA NOTA DE PEDIDO",
        color: "red",
      });
    }
  };
  const handleInputProductoNotaPedido = (name, value, producto) => {
    const productoInCarrito = carritoProducto.findIndex(
      (item) => item.pr_id === producto.pr_id
    );
    if (productoInCarrito >= 0) {
      const updateProducto = structuredClone(carritoProducto);
      if (name === "pr_cantidad") {
        updateProducto[productoInCarrito].quantity = parseFloat(value, 2);
      } else if (name === "discount") {
        updateProducto[productoInCarrito].discount = parseFloat(value, 2);
      } else if (name === "pr_sprice") {
        updateProducto[productoInCarrito].pr_sprice = parseFloat(value, 2);
      }
      return setCarritoProducto(updateProducto);
    } else {
      return console.log("Producto no se puede actualizar cantidad");
    }
  };

  const eliminarProductoCarrito = (producto) => {
    const updateProducto = carritoProducto.filter((item) => item !== producto);
    return setCarritoProducto(updateProducto);
  };

  const putLocalStorageData = async (id) => {
    try {
      const response = await fetch(IMPRIMIR_NOTA_PEDIDO_ENDPOINT + id);
      const dataD = await response.json();
      setNotaPedidoImprimir(dataD);
    } catch (error) {
      console.log("Error fetching", error);
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
        setProductos([]);
      }
    };
    fetchsearchProduct();
  }, [searchProducto]);

  console.log(notaPedidoImprimir);
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
        carritoProducto,
        agregarAlCarrito,
        handleInputProductoNotaPedido,
        eliminarProductoCarrito,
        handleCrearSubmitNotaPedido,
        handleInputChangeCrearNotaPedido,
        notaPedido,
        vaciarCarrito,
        handleActualizarProductoSubmit,
        actualizarProducto,
        setActualizarProducto,
        handleInputChangeActualizarProducto,
        showModalActualizar,
        setShowModalActualizar,
        handleEliminarProducto,
        correcto,
        closeCorrecto,
        setCorrecto,
        notaPedidoImprimir,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
