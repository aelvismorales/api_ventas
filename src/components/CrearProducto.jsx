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
  return (
    <>
      <div className="flex justify-center mb-1 w-2/6 ">
        <button
          className=" bg-pink-500 h-12 active:bg-pink-600 p-3 text-white font-bold uppercase mt-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 max-lg:p-3"
          type="button"
          onClick={() => setShowModal(true)}
        >
          CREAR PRODUCTO
        </button>
      </div>

      {showModal ? (
        <>
          <div className="flex fixed z-50 inset-0 justify-center items-center focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              <div className="border-0 rounded shadow-md focus: outline-none flex flex-col w-full bg-white">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b">
                  <h3 className="text-3xl font-semibold ">Crear Producto</h3>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  <form
                    className="w-[512px] max-lg:w-[448px]"
                    onSubmit={handleCrearSubmit}
                  >
                    <div className="flex items-center mb-5">
                      <div className="w-1/3">
                        <label className="block text-gray-500 font-bold mb-1 pr-4">
                          Producto:
                        </label>
                      </div>
                      <div className="w-2/3">
                        <input
                          className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 appearance-none focus: outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight font-normal"
                          type="text"
                          name="pr_name"
                          placeholder="CEMENTO SOL .."
                          onChange={handleInputChangeCrearProducto}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div className="w-1/3">
                        <label className="block text-gray-500 font-bold mb-1 pr-4">
                          Precio Compra:
                        </label>
                      </div>
                      <div className="w-2/3">
                        <input
                          className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 appearance-none focus: outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight font-normal"
                          type="number"
                          name="pr_bprice"
                          step="0.1"
                          value={crearProducto.pr_bprice}
                          onChange={handleInputChangeCrearProducto}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div className="w-1/3">
                        <label className="block text-gray-500 font-bold mb-1 pr-4">
                          Precio Venta:
                        </label>
                      </div>
                      <div className="w-2/3">
                        <input
                          className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 appearance-none focus: outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight font-normal"
                          type="number"
                          name="pr_sprice"
                          step="0.1"
                          value={crearProducto.pr_sprice}
                          onChange={handleInputChangeCrearProducto}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div className="w-1/3">
                        <label className="block text-gray-500 font-bold mb-1 pr-4">
                          Stock:
                        </label>
                      </div>
                      <div className="w-2/3">
                        <input
                          className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 appearance-none focus: outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight font-normal"
                          type="number"
                          name="pr_quantity"
                          step="1"
                          value={crearProducto.pr_quantity}
                          onChange={handleInputChangeCrearProducto}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/3">
                        <label className="block text-gray-500 font-bold mb-1 pr-4">
                          Tipo:
                        </label>
                      </div>
                      <div className="w-2/3">
                        <select
                          className="block bg-gray-200 border rounded py-2 px-2 text-gray-700 focus:outline-none foucs:ring focus:border-blue-400 ease-linear transition all duration-100 leading-tight focus:bg-white font-normal"
                          name="pr_tipo"
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
                      </div>
                    </div>
                    <div className="flex justify-end gap-5 mb-5 border-t-2 mt-5">
                      <button
                        className="text-red-500 bg-transparent font-bold uppercase px-6 py-3 mt-3 hover:shadow-lg hover:rounded outline-none focus:outline-none ease-linear transition-all duration-100 focus:bg-red-200"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cerrar
                      </button>
                      <button
                        className="bg-lime-500 text-white active:bg-lime-600 font-bold uppercase px-6 py-3 mt-3 rounded shadow outline-none hover:shadow-lg focus:outline-none ease-linear transition-all duration-100"
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
          <div className="z-40 bg-black inset-0 opacity-25 fixed"></div>
        </>
      ) : null}
    </>
  );
}
