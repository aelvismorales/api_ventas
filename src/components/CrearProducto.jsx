import { ProductContext } from "../context/ProductContext";
import { useContext, useId } from "react";
export default function CrearProducto() {
  const {
    showModal,
    setShowModal,
    crearProducto,
    handleInputChangeCrearProducto,
    handleCrearSubmit,
  } = useContext(ProductContext);
  const crearProductoID = useId();
  return (
    <>
      <button
        className="bg-pink-500 h-12 text-white active:bg-pink-600 font-bold uppercase text-sm p-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Crear Producto
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Crear Producto</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    onSubmit={handleCrearSubmit}
                    className="w-full max-w-sm"
                  >
                    <div class="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Producto:
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-light-green-500"
                          type="text"
                          name="pr_name"
                          value={crearProducto.pr_name}
                          onChange={handleInputChangeCrearProducto}
                          placeholder="Cemento Sol"
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Tipo:
                        </label>
                      </div>
                      <div className="relative">
                        <select
                          name="pr_tipo"
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-light-green-500"
                          id={crearProductoID}
                          value={crearProducto.pr_tipo}
                          onChange={handleInputChangeCrearProducto}
                        >
                          <option value="CONSTRUCCION">CONSTRUCCION</option>
                          <option value="PINTURA">PINTURA</option>
                          <option value="MATERIALES">MATERIALES</option>
                          <option value="HERRAMIENTAS">HERRAMIENTAS</option>
                          <option value="ADHESIVOS">ADHESIVOS</option>
                          <option value="FONTANERIA">FONTANERIA</option>
                          <option value="ELECTRICIDAD">ELECTRICIDAD</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            class="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Precio Compra:
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-light-green-500"
                          type="number"
                          name="pr_bprice"
                          step="0.01"
                          value={crearProducto.pr_bprice}
                          onChange={handleInputChangeCrearProducto}
                        />
                      </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Precio Venta:
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-light-green-500"
                          type="number"
                          name="pr_sprice"
                          step="0.01"
                          value={crearProducto.pr_sprice}
                          onChange={handleInputChangeCrearProducto}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Cantidad:
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-light-green-500"
                          type="number"
                          name="pr_quantity"
                          step="1"
                          value={crearProducto.pr_quantity}
                          onChange={handleInputChangeCrearProducto}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-red-50 rounded-md"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-light-green-700 text-white active:bg-light-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleCrearSubmit}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
