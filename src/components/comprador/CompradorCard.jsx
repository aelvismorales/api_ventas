import React, { useContext, useState } from "react";
import { CompradorContext } from "../../context/CompradorContext";
import CompraCard from "./CompraCard";
function CompradorCard({ comprador }) {
  const {
    actualizarComprador,
    setActualizarComprador,
    showModalActualizar,
    setShowModalActualizar,
    handleActualizarProductoSubmit,
    handleInputActualizarComprador,
    showModalCompras,
    setShowModalCompras,
    compras,
    fetchCompras,
  } = useContext(CompradorContext);

  const handleShowModalActualizar = () => {
    setShowModalActualizar(true);
    setActualizarComprador({
      com_id: comprador.com_id,
      com_name: comprador.com_name,
      com_address: comprador.com_address,
      com_telefono: comprador.com_telefono,
      com_dni: comprador.com_dni,
    });
  };

  const handleSubmitActualizar = (event) => {
    handleActualizarProductoSubmit(event, actualizarComprador.com_id);
  };

  const handleShowModalCompras = () => {
    setShowModalCompras(true);
    fetchCompras(comprador.com_id);
  };
  return (
    <>
      <tr className="border-b dark:border-neutral-500 hover:bg-slate-50">
        <td className="whitespace-nowrap font-medium px-6 py-2">
          {comprador.com_id}
        </td>
        <td className="whitespace-nowrap px-6 py-2">{comprador.com_name}</td>
        <td className="whitespace-nowrap px-6 py-2">{comprador.com_address}</td>
        <td className="whitespace-nowrap px-6 py-2">
          {comprador.com_telefono}
        </td>
        <td className="whitespace-nowrap px-6 py-2">{comprador.com_dni}</td>
        <td>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 mr-2 bg-yellow-400 font-medium rounded focus:bg-yellow-500 focus:shadow-md text-white"
              type="button"
              onClick={handleShowModalCompras}
            >
              Compras
            </button>
            {showModalCompras ? (
              <>
                <div className="flex justify-center items-center z-50 fixed inset-0 focus:outline-none">
                  <div className="relative w-[80vw] my-6 mx-auto border-0 rounded shadow bg-white">
                    <div className="flex justify-between mx-10 my-5 border-b-2 py-5">
                      <div>
                        <h2 className="font-bold text-3xl uppercase">
                          Notas de pedido
                        </h2>
                      </div>
                      <select
                        className="border rounded"
                        name="select-sort-compras"
                      >
                        <option value="">Ordenar por:</option>
                        <option value="RECIENTE">
                          Ordenar por mas reciente
                        </option>
                        <option value="ANTIGUOS">
                          Ordenar por mas antiguos
                        </option>
                      </select>
                    </div>
                    <div className="h-[80vh] overflow-y-auto">
                      {compras.length > 0 ? (
                        <table className="min-w-full text-center text-base font-light ">
                          <thead className="border-b-2 font-medium">
                            <tr className="text-gray-800 [&>th]:px-6 [&>th]:pb-4 [&>th]:uppercase ">
                              <th scope="col">#</th>
                              <th scope="col">Fecha</th>
                              <th scope="col">Tipo</th>
                              <th scope="col">Direccion</th>
                              <th scope="col">Total</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
                            {compras.map((compra) => (
                              <CompraCard
                                key={compra.ven_id}
                                compra={compra}
                              ></CompraCard>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <h1 className="font-bold text-center text-3xl">
                          No se ha encontrado notas de pedido.
                        </h1>
                      )}
                      <div className="flex justify-end mx-5 border-t-2">
                        <button
                          className="text-red-500 uppercase bg-transparent font-bold px-6 py-3 mt-3 rounded hover:shadow-lg  outline-none focus:outline-none focus:bg-red-200 ease-linear transition-all duration-100"
                          type="button"
                          onClick={() => setShowModalCompras(false)}
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="z-40 bg-black inset-0 opacity-5 fixed"></div>
              </>
            ) : null}
            <button
              className="px-4 py-2 ml-2 bg-amber-500 active:bg-amber-600  focus:shadow-md font-medium rounded text-white"
              type="button"
              onClick={handleShowModalActualizar}
            >
              Actualizar
            </button>
            {showModalActualizar ? (
              <>
                <div className="flex fixed inset-0 justify-center items-center z-50 focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto ">
                    <div className="border-0 rounded shadow-md bg-white flex flex-col w-full">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5  border-b m-2">
                        <h3 className="text-3xl font-semibold">
                          Actualizar Comprador
                        </h3>
                      </div>
                      {/*body*/}
                      <div className="relative p-6">
                        <form
                          className="w-[512px] max-lg:w-[448px]"
                          onSubmit={handleSubmitActualizar}
                        >
                          <div className="flex items-center mb-5">
                            <div className="w-1/3">
                              <label className="block text-gray-500 font-bold mb-1 pr-4">
                                Comprador:
                              </label>
                            </div>
                            <div className="w-2/3">
                              <input
                                className="bg-gray-200 border rounded w-full py-2 pl-4 text-gray-700 appearance-none focus: outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight"
                                type="text"
                                name="com_name"
                                placeholder={actualizarComprador.com_name}
                                onChange={handleInputActualizarComprador}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex items-center mb-5">
                            <div className="w-1/3">
                              <label
                                className="block text-gray-500 font-bold"
                                htmlFor="comprador_address"
                              >
                                Direccion:
                              </label>
                            </div>
                            <div className="w-2/3">
                              <input
                                className="bg-gray-200 border rounded w-full py-2 pl-4 text-gray-700 appearance-none focus:outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight font-normal"
                                type="text"
                                name="com_address"
                                value={actualizarComprador.com_address}
                                onChange={handleInputActualizarComprador}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex items-center mb-5">
                            <div className="w-1/3">
                              <label
                                className="block text-gray-500 font-bold"
                                htmlFor="comprador_telefono"
                              >
                                Telefono:
                              </label>
                            </div>
                            <div className="w-2/3">
                              <input
                                className="bg-gray-200 border rounded w-full py-2 pl-4 text-gray-700 appearance-none focus:outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight font-normal"
                                type="text"
                                name="com_telefono"
                                value={actualizarComprador.com_telefono}
                                onChange={handleInputActualizarComprador}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex items-center mb-5">
                            <div className="w-1/3">
                              <label
                                className="block text-gray-500 font-bold"
                                htmlFor="comprador_dni"
                              >
                                DNI:
                              </label>
                            </div>
                            <div className="w-2/3">
                              <input
                                className="bg-gray-200 border rounded w-full py-2 pl-4 text-gray-700 appearance-none focus:outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight font-normal"
                                type="text"
                                name="com_dni"
                                value={actualizarComprador.com_dni}
                                onChange={handleInputActualizarComprador}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-5 border-t-2">
                            <button
                              className="text-red-500 uppercase bg-transparent font-bold px-6 py-3 mt-3 rounded hover:shadow-lg  outline-none focus:outline-none focus:bg-red-200 ease-linear transition-all duration-100"
                              type="button"
                              onClick={() => setShowModalActualizar(false)}
                            >
                              Cerrar
                            </button>
                            <button
                              className="bg-lime-500 text-white active:bg-lime-600 font-bold px-6 py-3 mt-3 rounded shadow outline-none hover:shadow-lg focus:outline-none ease-linear transition-all duration-100 "
                              type="submit"
                            >
                              Guardar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="z-40 bg-black inset-0 opacity-5 fixed"></div>
              </>
            ) : null}
          </div>
        </td>
      </tr>
    </>
  );
}

export default CompradorCard;
