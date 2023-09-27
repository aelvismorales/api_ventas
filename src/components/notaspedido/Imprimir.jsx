import React, { useContext } from "react";
import { CompradorContext } from "../../context/CompradorContext";
import ProductoDetalleCard from "../comprador/ProductoDetalleCard";
function Imprimir() {
  const { productosCompras, dataproductos } = useContext(CompradorContext);
  const ferreteria_nombre = "FERRETERIA PERALVILLO E.I.R.L";
  const ferreteria_direccion =
    "Av.San Martin Mz `G5` lote 04. Peralvillo (al costado del estadio de peravillo)";
  const ferreteria_numeros = "Telefono: (01)-758 9381 Celular: 981193256";
  const ferreteria_adicional =
    "VENTA DE AGREGADOS Y MATERIALES DE CONSTRUCCION";
  const total = dataproductos.reduce((sum, producto) => {
    return sum + producto.pr_sprice * producto.dv_quantity;
  }, 0);
  return (
    <div
      style={{
        position: "fixed",
        color: "black",
        visibility: "hidden",
      }}
      id="TodoImprimir"
    >
      <div
        style={{
          position: "relative",
          border: "none",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            borderBottom: "1px solid gray",
          }}
        >
          <h3
            style={{
              fontSize: "25px",
              fontWeight: "semibold",
              lineHeight: "28px",
              textTransform: "uppercase",
              margin: "1px",
            }}
          >
            Nota de Pedido
          </h3>
        </div>
        {/* body */}
        <div style={{ position: "relative", marginTop: "20px" }}>
          <div
            style={{
              fontSize: "36px",
              lineHeight: "40px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {ferreteria_nombre}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <div>
              <p style={{ margin: "0px" }}>{ferreteria_direccion}</p>
              <p style={{ margin: "0px" }}>{ferreteria_numeros}</p>
              <p style={{ fontStyle: "italic", margin: "0px" }}>
                {ferreteria_adicional}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                border: "2px solid black",
                padding: "8px",
                flexDirection: "column",
              }}
            >
              <h3 style={{ fontWeight: "bold", margin: "0px" }}>
                NOTA DE PEDIDO
              </h3>
              <p style={{ margin: "2px" }}>N: {productosCompras.ven_id}</p>
              <h3 style={{ fontWeight: "bold", margin: "0px" }}>ESTADO:</h3>
              <p style={{ margin: "2px" }}>{productosCompras.ven_tipo}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                <h3 style={{ fontWeight: "bold", margin: "0px" }}>Sr.es:</h3>
                <p style={{ fontWeight: "normal", margin: "0px" }}>
                  {productosCompras.comp_name}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <h3 style={{ fontWeight: "bold", margin: "0px" }}>Fecha:</h3>
                <p style={{ fontWeight: "normal", margin: "0px" }}>
                  {productosCompras.ven_date}
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <h3 style={{ fontWeight: "bold", margin: "0px" }}>
                  Dirección:
                </h3>
                <p style={{ margin: "0px" }}>
                  {productosCompras.com_addresses}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <h3 style={{ fontWeight: "bold", margin: "0px" }}>Telefono:</h3>
                <p style={{ margin: "0px" }}>{productosCompras.com_telefono}</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <h3 style={{ fontWeight: "bold", margin: "0px" }}>DNI:</h3>
                <p style={{ margin: "0px" }}>{productosCompras.com_dni}</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "16px", marginBottom: "16px" }}>
            <table style={{ minWidth: "100%", borderCollapse: "collapse" }}>
              <thead
                style={{
                  fontWeight: "medium",
                  borderColor: "black",
                }}
              >
                <tr style={{ borderBottom: "1px solid black" }}>
                  <th style={{ padding: "5px" }} scope="col">
                    Cantidad
                  </th>
                  <th style={{ padding: "5px" }} scope="col">
                    Producto
                  </th>
                  <th style={{ padding: "5px" }} scope="col">
                    Precio
                  </th>
                  <th style={{ padding: "5px" }} scope="col">
                    Sub Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataproductos.map((producto) => (
                  <ProductoDetalleCard
                    key={producto.pr_name}
                    producto={producto}
                  />
                ))}
              </tbody>
              <tfoot>
                <tr style={{ paddingTop: "8px", borderTop: "8px" }}>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      fontWeight: "bold",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    Total:
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    {total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div>
            <p
              style={{
                fontWeight: "bold",
                height: "25px",
                fontSize: "80%",
                textAlign: "center",
              }}
            >
              UNICO COMPROBANTE PARA RECOGER SU MERCADERIA Y CAMBIARLA POR
              BOLETA O FACTURA
            </p>
            <p style={{ height: "25px", fontSize: "80%", textAlign: "center" }}>
              RECUERDE POR FAVOR REVISAR SU VUELTO Y LA MERCADERIA ANTES DE
              RETIRARSE DEL LOCAL. NO ESTA SUJETO A CAMBIO NI DEVOLUCION
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Imprimir;
