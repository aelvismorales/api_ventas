import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
export const NotaContext = createContext();

const BUSCAR_NOTAS_COMPRADOR_ENDPOINT =
  "http://127.0.0.1:5000/venta/buscar/nombre/";
const BUSCAR_NOTAS_COMPRADOR_FECHAS_ENDPOINT =
  "http://127.0.0.1:5000/venta/buscar/fechas";

const ANULAR_NOTAS_COMPRADOR_ENDPOINT =
  "http://127.0.0.1:5000/venta/actualizar/anular/";
const ACTUALIZAR_NOTAS_COMPRADOR_ENDPOINT =
  "http://127.0.0.1:5000/venta/actualizar/venta_datos/";
export function NotaContextProvider(props) {
  const { setCorrecto } = useContext(ProductContext);
  const [searchNota, setSearchNota] = useState("");
  const [notas, setNotas] = useState([]);
  const [selectState, setSelectState] = useState("BUSCAR");
  const [searchNotaFecha, setSearchNotaFecha] = useState({
    fecha_inicio: "",
    fecha_final: "",
  });

  const [verModalNota, setVerModalNota] = useState(false);
  const [datosNota, setDatosNota] = useState({
    ven_tipo: "",
    ven_address: "",
    comp_name: "",
    ven_acuenta: "",
    ven_comment: "",
    ven_date_cancelacion: "",
  });
  const [notaId, setNotaID] = useState("");
  useEffect(() => {
    const fetchsearchNota = async () => {
      try {
        const response = await fetch(
          BUSCAR_NOTAS_COMPRADOR_ENDPOINT + searchNota.replace(/ /g, "_")
        );
        const data = await response.json();
        setNotas(data.compras);
      } catch (error) {
        console.log("Error al obtener los datos de Notas", error);
      }
    };
    fetchsearchNota();
  }, [searchNota]);

  useEffect(() => {
    const fetchsearchNotaFecha = async () => {
      try {
        const response = await fetch(BUSCAR_NOTAS_COMPRADOR_FECHAS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(searchNotaFecha),
        });
        const data = await response.json();
        setNotas(data.compras);
      } catch (error) {
        console.log("Error al obtener los datos de Notas", error);
      }
    };
    fetchsearchNotaFecha();
  }, [searchNotaFecha]);

  const handleChangeSearchNota = (event) => {
    setSearchNota(event.target.value || "");
  };

  const handleChangeSearchFecha = (event) => {
    const { name, value } = event.target;
    setSearchNotaFecha((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeState = (event) => {
    setSelectState(event.target.value);
  };

  const actualizarAnuladoNota = async (id_) => {
    try {
      const response = await fetch(
        ANULAR_NOTAS_COMPRADOR_ENDPOINT + id_.toString(),
        { method: "PUT" }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCorrecto({
          estado: true,
          mensaje: "SE ANULO LA NOTA DE PEDIDO CORRECTAMENTE",
          color: "green",
        });
      }
    } catch (error) {
      setCorrecto({
        estado: true,
        mensaje: "NO SE PUDO ANULAR LA NOTA DE PEDIDO",
        color: "yellow",
      });
      console.log("No se pudo actualizar a Anulado", error);
    }
  };
  const handleInputChangeEditarNotaPedido = (event) => {
    const { name, value } = event.target;
    setDatosNota((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const actualizarDatosNotaPedido = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        ACTUALIZAR_NOTAS_COMPRADOR_ENDPOINT + notaId.toString(),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosNota),
        }
      );
      if (response.ok) {
        const data = await response.json();

        console.log(data);
        setCorrecto({
          estado: true,
          mensaje:
            "SE ACTUALIZARON LOS DATOS EN LA NOTA DE PEDIDO" +
            " " +
            notaId.toString(),
          color: "green",
        });
      }
    } catch (error) {
      setCorrecto({
        estado: true,
        mensaje: "NO SE PUDO ACTUALIZAR LOS DATO DE LA NOTA DE PEDIDO",
        color: "yellow",
      });
      console.log("No se pudo actualizar la notaPedido", error);
    }
  };
  return (
    <NotaContext.Provider
      value={{
        notas,
        handleChangeSearchNota,
        selectState,
        handleChangeState,
        handleChangeSearchFecha,
        verModalNota,
        setVerModalNota,
        actualizarAnuladoNota,
        datosNota,
        handleInputChangeEditarNotaPedido,
        actualizarDatosNotaPedido,
        setDatosNota,
        setNotaID,
        searchNotaFecha,
      }}
    >
      {props.children}
    </NotaContext.Provider>
  );
}
