import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
export const CompradorContext = createContext();

const LIST_COMPRADOR_SEARCH_ENDPOINT =
  "http://127.0.0.1:5000/comprador/buscar/";
const CREAR_COMPRADOR_ENDPOINT = "http://127.0.0.1:5000/comprador/crear";
const ACTUALIZAR_COMPRADOR_ENDPOINT =
  "http://127.0.0.1:5000/comprador/actualizar/";
const OBTENER_COMPRAS_ENDPOINT = "http://127.0.0.1:5000/venta/buscar/";
const DETALLE_COMPRAS_ENDPOINT = "http://127.0.1:5000/venta/ver/";
export function CompradorContextProvider(props) {
  const { setCorrecto } = useContext(ProductContext);
  const [compradores, setCompradores] = useState([]);
  const [searchComprador, setSearchComprador] = useState("");
  const [showModalCrear, setShowModalCrear] = useState(false);
  const [crearComprador, setCrearComprador] = useState({
    com_name: "",
    com_address: "",
    com_telefono: "",
    com_dni: "",
  });

  const [actualizarComprador, setActualizarComprador] = useState({
    com_id: null,
    com_name: "",
    com_address: "",
    com_telefono: "",
    com_dni: "",
  });

  const [showModalActualizar, setShowModalActualizar] = useState(false);
  const [showModalCompras, setShowModalCompras] = useState(false);
  const [compras, setCompras] = useState([]);
  const [productosCompras, setProductosCompras] = useState({});
  const [dataproductos, setDataProductos] = useState([]);
  useEffect(() => {
    const fetchsearchCompradores = async () => {
      try {
        const response = await fetch(
          LIST_COMPRADOR_SEARCH_ENDPOINT + searchComprador.replace(/ /g, "_")
        );
        const data = await response.json();
        setCompradores(data.compradores);
      } catch (error) {
        console.log("Error al obtener compradores:", error);
      }
    };
    fetchsearchCompradores();
  }, [searchComprador]);

  const handleChangeSearchComprador = (event) => {
    setSearchComprador(event.target.value || "");
  };

  /*SHOW MODAL CREAR */
  const handleCrearCompradorSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(CREAR_COMPRADOR_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crearComprador),
      });
      if (response.ok) {
        const data = await response.json();
        setShowModalCrear(false);
        setCrearComprador({
          com_id: null,
          com_name: "",
          com_addres: "",
          com_telefono: "",
          com_dni: "",
        });
        setCorrecto({
          estado: true,
          mensaje: "SE CREO EL COMPRADOR CORRECTAMENTE",
          color: "green",
        });
      }
    } catch (error) {
      setCorrecto({
        estado: true,
        mensaje: "NO SE PUDO CREAR AL COMPRADOR",
        color: "yellow",
      });
      console.error("Error en la solicitud", error);
    }
  };
  /* HANDLE INPUTS CREAR COMPRADOR */
  const handleInputCrearComprador = (event) => {
    const { name, value } = event.target;
    setCrearComprador((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /* HANDLE INPUT ACTUALIZAR COMPRADOR */
  const handleInputActualizarComprador = (event) => {
    const { name, value } = event.target;
    setActualizarComprador((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleActualizarProductoSubmit = async (event, id_) => {
    event.preventDefault();
    try {
      const response = await fetch(
        ACTUALIZAR_COMPRADOR_ENDPOINT + id_.toString(),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(actualizarComprador),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Comprador Actualizado", data);
        setShowModalActualizar(false);
        setActualizarComprador({
          com_name: "",
          com_addres: "",
          com_telefono: "",
          com_dni: "",
        });
        setCorrecto({
          estado: true,
          mensaje: "SE ACTUALIZARON LOS DATOS DEL COMPRADOR",
          color: "green",
        });
      }
    } catch (error) {
      setCorrecto({
        estado: true,
        mensaje: "NO SE PUDO ACTUALIZAR LOS DATOS",
        color: "yellow",
      });
      console.log("Error en la solicitud:", error);
    }
  };
  /*--*/

  const fetchCompras = async (id_) => {
    try {
      const response = await fetch(OBTENER_COMPRAS_ENDPOINT + id_);
      if (response.ok) {
        const data = await response.json();
        setCompras(data.compras);
        console.log("Se obtuvo los datos de sus compras");
      } else {
        setCompras([]);
        console.log("No se pueden obtener los datos");
      }
    } catch (error) {
      console.log("No se pudo realizar la petición", error);
    }
  };

  const fetchDetalleCompras = async (id_) => {
    try {
      const response = await fetch(DETALLE_COMPRAS_ENDPOINT + id_);

      if (response.ok) {
        const data = await response.json();
        setProductosCompras(data);
        if (data.productos) {
          setDataProductos(data.productos);
        } else {
          setDataProductos([]);
        }

        console.log("Se obtuvieron los productos de la venta.");
      } else {
        setProductosCompras({});
        console.log("No se pudo obtener los productos");
      }
    } catch (error) {
      console.log("No se pudo realizar la petición", error);
    }
  };
  return (
    <CompradorContext.Provider
      value={{
        compradores,
        handleChangeSearchComprador,
        crearComprador,
        showModalCrear,
        setShowModalCrear,
        handleCrearCompradorSubmit,
        handleInputCrearComprador,
        actualizarComprador,
        setActualizarComprador,
        showModalActualizar,
        setShowModalActualizar,
        handleInputActualizarComprador,
        handleActualizarProductoSubmit,
        showModalCompras,
        setShowModalCompras,
        compras,
        fetchCompras,
        productosCompras,
        fetchDetalleCompras,
        dataproductos,
      }}
    >
      {props.children}
    </CompradorContext.Provider>
  );
}
