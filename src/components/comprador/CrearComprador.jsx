import React, { useContext } from "react";
import { CompradorContext } from "../../context/CompradorContext";
function CrearComprador() {
  const {
    showModalCrear,
    setShowModalCrear,
    handleCrearCompradorSubmit,
    handleInputCrearComprador,
  } = useContext(CompradorContext);
  return (
    <>
      <div className="flex justify-center mb-1 w-2/6">
        <button
          onClick={() => setShowModalCrear(true)}
          className="bg-pink-500 h-12 active:bg-pink-600 p-3 text-white font-bold uppercase mt-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 max-lg:p-3"
        >
          CREAR COMPRADOR
        </button>
      </div>
      {showModalCrear ? (
        <>
          <div className="flex fixed z-50 inset-0 justify-center items-center focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              <div className="border-0 rounded shadow-md focus:outline-none flex flex-col w-full bg-white">
                {/*header*/}
                <div className="flex items-start p-5 border-b">
                  <h3 className="text-3xl font-semibold">CREAR COMPRADOR</h3>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  <form
                    className="w-[512px] max-lg:w-[448px]"
                    onSubmit={handleCrearCompradorSubmit}
                  >
                    <div className="flex items-center mb-5">
                      <div className="w-1/3">
                        <label
                          className="block text-gray-500 font-bold"
                          htmlFor="comprador_name"
                        >
                          Comprador:
                        </label>
                      </div>
                      <div className="w-2/3">
                        <input
                          className="bg-gray-200 border rounded w-full py-2 pl-4 text-gray-700 appearance-none focus:outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight font-normal"
                          type="text"
                          name="com_name"
                          onChange={handleInputCrearComprador}
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
                          onChange={handleInputCrearComprador}
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
                          onChange={handleInputCrearComprador}
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
                          onChange={handleInputCrearComprador}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-5 border-t-2">
                      <button
                        className="text-red-500 uppercase bg-transparent font-bold px-6 py-3 mt-3 rounded hover:shadow-lg  outline-none focus:outline-none focus:bg-red-200 ease-linear transition-all duration-100"
                        type="button"
                        onClick={() => setShowModalCrear(false)}
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
          <div className="z-40 bg-black inset-0 fixed opacity-25"></div>
        </>
      ) : null}
    </>
  );
}

export default CrearComprador;
