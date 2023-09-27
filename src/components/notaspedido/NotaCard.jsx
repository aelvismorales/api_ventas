import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CompradorContext } from "../../context/CompradorContext";
import { NotaContext } from "../../context/NotaContext";
import ProductoDetalleCard from "../comprador/ProductoDetalleCard";
import Imprimir from "./Imprimir";
function NotaCard({ nota }) {
  const { productosCompras, dataproductos, fetchDetalleCompras } =
    useContext(CompradorContext);
  const {
    verModalNota,
    setVerModalNota,
    actualizarAnuladoNota,
    setNotaID,
    setDatosNota,
  } = useContext(NotaContext);
  const ferreteria_nombre = "FERRETERIA PERALVILLO E.I.R.L";
  const ferreteria_direccion =
    "Av.San Martin Mz `G5` lote 04. Peralvillo (al costado del estadio de peravillo)";
  const ferreteria_numeros = "Telefono: (01)-758 9381 Celular: 981193256";
  const ferreteria_adicional =
    "VENTA DE AGREGADOS Y MATERIALES DE CONSTRUCCION";
  const handleChangeVerNota = () => {
    fetchDetalleCompras(nota.ven_id);
    setVerModalNota(true);
  };
  // Calcular el total sumando los subtotales de los productos en el carrito
  const total = dataproductos.reduce((sum, producto) => {
    return sum + producto.pr_sprice * producto.dv_quantity;
  }, 0);

  const imprimirContenido = () => {
    const contenido = document.getElementById("TodoImprimir");
    const ventanaImpresion = window.open("", "_blank");
    ventanaImpresion.document.write(contenido.innerHTML);
    ventanaImpresion.document.close();
    ventanaImpresion.onload = () => {
      ventanaImpresion.print();
    };
  };
  return (
    <tr className="border-b dark:border-neutral-500 hover:bg-slate-50">
      <td className="whitespace-nowrap font-medium px-6 py-2">{nota.ven_id}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.ven_date}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.comp_name}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.vent_total}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.vent_tipo}</td>
      <td className="whitespace-nowrap px-6 py-2">
        {nota.ven_date_cancelacion}
      </td>
      <td className="whitespace-nowrap px-6 py-2">{nota.ven_comment}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.ven_acuenta}</td>
      <td>
        <div className="text-white flex gap-x-2">
          <button
            className="bg-sky-500 rounded px-6 py-2 uppercase hover:shadow-sm active:bg-sky-600 ease-linear transition-all duration-150"
            type="button"
            onClick={handleChangeVerNota}
          >
            Ver
          </button>
          {verModalNota ? (
            <>
              <div className="flex fixed inset-0 justify-center items-center z-100 focus:outline-none text-black">
                <div className="relative w-auto my-6 mx-auto">
                  <div className="border-0 rounded shadow-sm bg-gray-100 flex flex-col w-full">
                    {/*HEADER*/}
                    <div className="flex justify-between items-start p-5 border-b m-2">
                      <h3 className="text-xl font-semibold">Nota de Pedido</h3>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setVerModalNota(false);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    {/*body*/}
                    <div className="relative p-6">
                      <div className="text-4xl text-center font-bold">
                        {ferreteria_nombre}
                      </div>
                      <div className="flex justify-stretch py-6 gap-5">
                        <div>
                          <p>{ferreteria_direccion}</p>
                          <p>{ferreteria_numeros}</p>
                          <p className="italic">{ferreteria_adicional}</p>
                        </div>
                        <div className="flex border-2 px-6 flex-col">
                          <h3 className="font-bold">NOTA DE PEDIDO</h3>
                          <p>N: {productosCompras.ven_id}</p>
                          <h3 className="font-bold">ESTADO:</h3>
                          <p>{productosCompras.ven_tipo}</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <div className="flex gap-2">
                            <h3 className="font-bold">Sr.es:</h3>
                            <p className="font-normal">
                              {productosCompras.comp_name}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <h3 className="font-bold">Fecha:</h3>
                            <p className="font-normal">
                              {productosCompras.ven_date}
                            </p>
                          </div>
                        </div>
                        <div className="flex  justify-between">
                          <div className="flex gap-2">
                            <h3 className="font-bold">Dirección:</h3>
                            <p>{productosCompras.com_addresses}</p>
                          </div>
                          <div className="flex gap-2">
                            <h3 className="font-bold">Telefono:</h3>
                            <p>{productosCompras.com_telefono}</p>
                          </div>
                          <div className="flex gap-2">
                            <h3 className="font-bold">DNI:</h3>
                            <p>{productosCompras.com_dni}</p>
                          </div>
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
                            {dataproductos.map((producto) => (
                              <ProductoDetalleCard
                                key={producto.pr_name}
                                producto={producto}
                              />
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="py-2 border-t-2">
                              <td></td>
                              <td></td>
                              <td className="font-bold">Total:</td>
                              <td className="font-bold">{total.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      <div className="border-b">
                        <p className="font-bold">
                          UNICO COMPROBANTE PARA RECOGER SU MERCADERIA Y
                          CAMBIARLA POR BOLETA O FACTURA
                        </p>
                        <p className="text-xs">
                          RECUERDE PORFAVOR REVISAR SU VUELTO Y LA MERCADERIA
                          ANTES DE RETIRARSE DEL LOCAL. NO ESTA SUJETO A CAMBIO
                          NI DEVOLUCION
                        </p>
                      </div>
                      <div className="flex justify-center my-4">
                        <button
                          className="bg-blue-500 rounded px-6 py-2 uppercase text-white hover:bg-blue-400"
                          type="button"
                          onClick={imprimirContenido}
                        >
                          Imprimir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Imprimir />
            </>
          ) : null}
          <ul>
            <li className="bg-amber-500 rounded px-6 py-2 uppercase hover:shadow-sm active:bg-amber-600 ease-linear transition-all duration-150">
              <Link
                to={"/editar"}
                onClick={() => {
                  setNotaID(nota.ven_id);
                  setDatosNota({
                    ven_tipo: nota.vent_tipo,
                    ven_address: nota.ven_address,
                    comp_name: nota.comp_name,
                    ven_acuenta: nota.ven_acuenta,
                    ven_comment: nota.ven_comment,
                    ven_date_cancelacion: nota.ven_date_cancelacion,
                  });
                }}
              >
                Editar
              </Link>
            </li>
          </ul>

          <button
            className="bg-yellow-500 rounded px-6 py-2 uppercase hover:shadow-sm active:bg-yellow-600 ease-linear transition-all duration-150"
            onClick={() => actualizarAnuladoNota(nota.ven_id)}
          >
            Anular
          </button>
        </div>
      </td>
    </tr>
  );
}

export default NotaCard;
