import React, { useContext } from "react";
import ProductoDetalleCard from "./comprador/ProductoDetalleCard";
import { ProductContext } from "../context/ProductContext";

function ImprimirNota() {
  const { notaPedidoImprimir } = useContext(ProductContext);
  const ferreteria_nombre = "FERRETERIA PERALVILLO E.I.R.L";
  const ferreteria_direccion =
    "Av.San Martin Mz `G5` lote 04. Peralvillo (al costado del estadio de peravillo)";
  const ferreteria_numeros = "Telefono: (01)-758 9381 Celular: 981193256";
  const ferreteria_adicional =
    "VENTA DE AGREGADOS Y MATERIALES DE CONSTRUCCION";
  return (
    <>
      <div className="p-5 border-b m-2">
        <h1 className="font-bold text-3xl">NOTA PEDIDO</h1>
      </div>
      <div className="relative p-6">
        <div className="text-4xl text-center font-bold">
          {ferreteria_nombre}
        </div>
        <div className="flex justify-between py-6 gap-5">
          <div>
            <p>{ferreteria_direccion}</p>
            <p>{ferreteria_numeros}</p>
            <p className="italic">{ferreteria_adicional}</p>
          </div>
          <div className="flex border-2 px-6 flex-col">
            <h3 className="font-bold">NOTA DE PEDIDO</h3>
            <p>N: {notaPedidoImprimir.ven_id}</p>
            <h3 className="font-bold">ESTADO:</h3>
            <p>{notaPedidoImprimir.ven_tipo}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <h3 className="font-bold">Sr.es:</h3>
              <p className="font-normal">{notaPedidoImprimir.comp_name}</p>
            </div>
            <div className="flex gap-2">
              <h3 className="font-bold">Fecha:</h3>
              <p className="font-normal">{notaPedidoImprimir.ven_date}</p>
            </div>
          </div>
          <div className="flex  justify-between">
            <div className="flex gap-2">
              <h3 className="font-bold">Dirección:</h3>
              <p>{notaPedidoImprimir.com_addresses}</p>
            </div>
            <div className="flex gap-2">
              <h3 className="font-bold">Telefono:</h3>
              <p>{notaPedidoImprimir.com_telefono}</p>
            </div>
            <div className="flex gap-2">
              <h3 className="font-bold">DNI:</h3>
              <p>{notaPedidoImprimir.com_dni}</p>
            </div>
          </div>
          <div className="my-4">
            <table className="min-w-full">
              <thead className="border-b-2 font-medium">
                <tr>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {notaPedidoImprimir.productos.map((producto) => (
                  <ProductoDetalleCard
                    key={producto.pr_name}
                    producto={producto}
                  />
                ))}
              </tbody>
              <tfoot>
                <tr className="py-2 border-t-2 text-center">
                  <td></td>
                  <td></td>
                  <td className="font-bold">Total:</td>
                  <td className="font-bold">{notaPedidoImprimir.ven_total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="text-center">
            <p className="font-bold">
              UNICO COMPROBANTE PARA RECOGER SU MERCADERIA Y CAMBIARLA POR
              BOLETA O FACTURA
            </p>
            <p className="text-xs">
              RECUERDE PORFAVOR REVISAR SU VUELTO Y LA MERCADERIA ANTES DE
              RETIRARSE DEL LOCAL. NO ESTA SUJETO A CAMBIO NI DEVOLUCION
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImprimirNota;
