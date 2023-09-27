import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ActualizarProducto from "./ActualizarProducto";
function ProductoCard({ producto }) {
  const {
    agregarAlCarrito,
    showModalActualizar,
    setShowModalActualizar,
    actualizarProducto,
    setActualizarProducto,
    handleInputChangeActualizarProducto,
    handleActualizarProductoSubmit,
    handleEliminarProducto,
  } = useContext(ProductContext);
  const handleAgregar = () => {
    agregarAlCarrito(producto);
  };

  const handleShowModal = () => {
    setShowModalActualizar(true);
    setActualizarProducto({
      pr_id: producto.pr_id,
      pr_name: producto.pr_name,
      pr_tipo: producto.pr_tipo,
      pr_bprice: producto.pr_bprice,
      pr_sprice: producto.pr_sprice,
      pr_quantity: producto.pr_quantity,
    });
  };
  const handleClickEliminarProducto = (event) => {
    handleEliminarProducto(event, producto.pr_id);
  };

  return (
    <>
      <tr className="border-b dark:border-neutral-500 hover:bg-slate-50">
        <td className="whitespace-nowrap font-medium px-6 py-2">
          {producto.pr_id}
        </td>
        <td className="whitespace-nowrap px-6 py-2">{producto.pr_tipo}</td>
        <td className="whitespace-nowrap px-6 py-2">{producto.pr_name}</td>
        <td className="whitespace-nowrap px-6 py-2">{producto.pr_bprice}</td>
        <td className="whitespace-nowrap px-6 py-2">{producto.pr_sprice}</td>
        <td className="whitespace-nowrap px-6 py-2">{producto.pr_quantity}</td>
        <td>
          <div className="flex gap-2 [&>button]:border [&>button]:rounded [&>button]:border-transparent [&>button]:p-1  [&>button]:text-white [&>button]:uppercase  [&>button]:font-normal [&>button]:shadow [&>button]:hover:shadow-lg [&>button]:outline-none [&>button]:focus:outline-none [&>button]:ease-linear [&>button]:transition-all duration-150">
            <button
              className="bg-lime-500 active:bg-lime-600 "
              onClick={handleAgregar}
            >
              Agregar
            </button>
            <>
              <button
                className="bg-amber-500 active:bg-amber-600"
                type="button"
                onClick={handleShowModal}
              >
                Actualizar
              </button>
              {showModalActualizar ? (
                <>
                  <div className="flex fixed z-50 inset-0 justify-center items-center focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto">
                      <div className="border-0 rounded shadow-md focus: outline-none flex flex-col w-full bg-white">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b">
                          <h3 className="text-3xl font-semibold ">
                            Actualizar Producto
                          </h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6">
                          <form
                            className="w-[512px] max-lg:w-[448px]"
                            onSubmit={handleActualizarProductoSubmit}
                          >
                            <div className="flex items-center mb-5">
                              <div className="w-1/3">
                                <label className="block text-gray-500 font-bold mb-1 pr-4">
                                  Producto:
                                </label>
                              </div>
                              <div className="w-2/3">
                                <input
                                  className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 appearance-none focus: outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight"
                                  type="text"
                                  name="pr_name"
                                  placeholder={actualizarProducto.pr_name}
                                  onChange={handleInputChangeActualizarProducto}
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
                                  className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 appearance-none focus: outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight"
                                  type="number"
                                  name="pr_bprice"
                                  step="0.1"
                                  value={actualizarProducto.pr_bprice}
                                  onChange={handleInputChangeActualizarProducto}
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
                                  className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 appearance-none focus: outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight"
                                  type="number"
                                  name="pr_sprice"
                                  step="0.1"
                                  value={actualizarProducto.pr_sprice}
                                  onChange={handleInputChangeActualizarProducto}
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
                                  className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 appearance-none focus: outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 leading-tight"
                                  type="number"
                                  name="pr_quantity"
                                  step="1"
                                  value={actualizarProducto.pr_quantity}
                                  onChange={handleInputChangeActualizarProducto}
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
                                  className="block bg-gray-200 border rounded py-2 px-2 text-gray-700 focus:outline-none foucs:ring focus:border-blue-400 ease-linear transition all duration-100 leading-tight focus:bg-white"
                                  name="pr_tipo"
                                  value={actualizarProducto.pr_tipo}
                                  onChange={handleInputChangeActualizarProducto}
                                >
                                  <option value="CONSTRUCCION">
                                    CONSTRUCCION
                                  </option>
                                  <option value="PINTURA">PINTURA</option>
                                  <option value="MATERIALES">MATERIALES</option>
                                  <option value="HERRAMIENTAS">
                                    HERRAMIENTAS
                                  </option>
                                  <option value="ADHESIVOS">ADHESIVOS</option>
                                  <option value="FONTANERIA">FONTANERIA</option>
                                  <option value="ELECTRICIDAD">
                                    ELECTRICIDAD
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="flex justify-end gap-5 mb-5 border-t-2 mt-5">
                              <button
                                className="text-red-500 bg-transparent font-bold uppercase px-6 py-3 mt-3 hover:shadow-lg hover:rounded outline-none focus:outline-none ease-linear transition-all duration-100 focus:bg-red-200"
                                type="button"
                                onClick={() => setShowModalActualizar(false)}
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
                  <div className="z-40 bg-black inset-0 opacity-5 fixed"></div>
                </>
              ) : null}
            </>
            <button
              className="bg-red-500 active:bg-amber-600"
              onClick={handleClickEliminarProducto}
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ProductoCard;
