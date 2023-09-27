import { useContext, useId } from "react";
import { ProductContext } from "../context/ProductContext";

function ActualizarProducto() {
  const {
    showModalActualizar,
    setShowModalActualizar,
    actualizarProducto,
    handleActualizarProductoSubmit,
    handleInputChangeActualizarProducto,
  } = useContext(ProductContext);

  const handleSubmit = (event) => {
    handleActualizarProductoSubmit(event, pr_id);
  };
  return (
    <>
      <button
        className="bg-amber-500 active:bg-amber-600"
        type="button"
        onClick={() => setShowModalActualizar(true)}
      >
        Actualizar
      </button>
      {showModalActualizar ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Actualizar Producto
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="md:flex md:items-center mb-6">
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
                          value={actualizarProducto.pr_name}
                          onChange={handleInputChangeActualizarProducto}
                          //placeholder={productos[productoIndex].pr_name}
                          required
                        />
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
                          value={actualizarProducto.pr_bprice}
                          onChange={handleInputChangeActualizarProducto}
                          required
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
                          value={actualizarProducto.pr_sprice}
                          onChange={handleInputChangeActualizarProducto}
                          required
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
                          value={actualizarProducto.pr_quantity}
                          onChange={handleInputChangeActualizarProducto}
                          required
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
                          value={actualizarProducto.pr_tipo}
                          onChange={handleInputChangeActualizarProducto}
                        >
                          <option value="CONSTRUCCION">CONSTRUCCION</option>
                          <option value="PINTURA">PINTURA</option>
                          <option value="MATERIALES">MATERIALES</option>
                          <option value="HERRAMIENTAS">HERRAMIENTAS</option>
                          <option value="ADHESIVOS">ADHESIVOS</option>
                          <option value="FONTANERIA">FONTANERIA</option>
                          <option value="ELECTRICIDAD">ELECTRICIDAD</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 bg-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:rounded hover:shadow-lg focus:bg-red-200"
                        type="button"
                        onClick={() => setShowModalActualizar(false)}
                      >
                        Cerrar
                      </button>
                      <button
                        className="bg-lime-500 text-white active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        //onClick={handleCrearSubmit}
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-[0.03] fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default ActualizarProducto;
