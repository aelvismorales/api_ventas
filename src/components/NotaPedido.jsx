import React, { useContext } from "react";
import ProductoNotaPedido from "./ProductoNotaPedido";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
function NotaPedido() {
  const {
    carritoProducto,
    handleInputChangeCrearNotaPedido,
    handleCrearSubmitNotaPedido,
    notaPedido,
    vaciarCarrito,
  } = useContext(ProductContext);
  // Calcular el total sumando los subtotales de los productos en el carrito
  const total = carritoProducto.reduce((sum, producto) => {
    return sum + producto.pr_sprice * producto.quantity;
  }, 0);

  return (
    <>
      <div className="flex justify-center items-center max-w-full h-40">
        <h1 className="font-bold text-4xl">NOTA PEDIDO</h1>
      </div>
      <div className="w-full max-lg:w-[650px] max-lg:flex max-lg:m-auto">
        <form className="w-full mt-3" onSubmit={handleCrearSubmitNotaPedido}>
          <div className="flex mb-5 px-3 w-full items-center">
            <div className="w-5/12">
              <label
                className="block text-gray-500 font-bold"
                htmlFor="com_name"
              >
                Nombre Comprador:
              </label>
            </div>
            <div className="w-7/12">
              <input
                className="w-full  appearance-none border rounded py-1 px-2 text-gray-700 outline-none focus:outline-none focus:bg-white focus:ring focus:border-blue-400 ease-linear transition-all duration-150"
                type="text"
                name="com_name"
                value={notaPedido.com_name}
                onChange={handleInputChangeCrearNotaPedido}
                placeholder="Elvis Morales"
                required
              />
            </div>
          </div>
          <div className="flex mb-5 px-3 w-full items-center">
            <div className="w-5/12">
              <label
                className="block text-gray-500 font-bold"
                htmlFor="com_address"
              >
                Direccion:
              </label>
            </div>
            <div className="w-7/12">
              <input
                className="w-full  appearance-none border rounded py-1 px-2 text-gray-700 outline-none focus:outline-none focus:bg-white focus:ring focus:border-blue-400 ease-linear transition-all duration-150"
                type="text"
                name="com_address"
                value={notaPedido.com_address}
                onChange={handleInputChangeCrearNotaPedido}
                placeholder="Av.San Martin"
                required
              />
            </div>
          </div>
          <div className="flex mb-5 px-3 w-full items-center">
            <div className="w-5/12">
              <label
                className="block text-gray-500 font-bold"
                htmlFor="com_telefono"
              >
                Telefono:
              </label>
            </div>
            <div className="w-7/12">
              <input
                className="w-full  appearance-none border rounded py-1 px-2 text-gray-700 outline-none focus:outline-none focus:bg-white focus:ring focus:border-blue-400 ease-linear transition-all duration-150"
                type="text"
                name="com_telefono"
                value={notaPedido.com_telefono}
                onChange={handleInputChangeCrearNotaPedido}
                placeholder="902 4xx xxx"
                required
              />
            </div>
          </div>
          <div className="flex mb-5 px-3 w-full items-center">
            <div className="w-5/12">
              <label
                className="block text-gray-500 font-bold"
                htmlFor="com_dni"
              >
                DNI:
              </label>
            </div>
            <div className="w-7/12">
              <input
                className="w-full  appearance-none border rounded py-1 px-2 text-gray-700 outline-none focus:outline-none focus:bg-white focus:ring focus:border-blue-400 ease-linear transition-all duration-150"
                type="text"
                name="com_dni"
                value={notaPedido.com_dni}
                onChange={handleInputChangeCrearNotaPedido}
                required
              />
            </div>
          </div>
          <div className="flex mb-5 px-3 w-full items-center">
            <div className="w-5/12">
              <label
                className="block text-gray-500 font-bold"
                htmlFor="com_dni"
              >
                Tipo:
              </label>
            </div>
            <div className="w-7/12">
              <select
                name="ven_tipo"
                className="block border rounded py-1 px-2 text-gray-700 focus:outline-none focus:bg-white focus:ring focus:border-blue-400 ease-linear transition-all duration-150"
                onChange={handleInputChangeCrearNotaPedido}
                value={notaPedido.ven_tipo}
              >
                <option value="CANCELADO">CANCELADO</option>
                <option value="CANCELADO-VISA">CANCELADO-VISA</option>
                <option value="CANCELADO-BBVA">CANCELADO-BBVA</option>
                <option value="CANCELADO-BCP">CANCELADO-BCP</option>
                <option value="CANCELADO-YAPE">CANCELADO-YAPE</option>
                <option value="POR-CANCELAR">POR-CANCELAR</option>
                <option value="PROFORMA">PROFORMA</option>
              </select>
            </div>
          </div>
          <div className="flex mb-5 px-3 w-full items-center">
            <div className="w-5/12">
              <label
                className="block text-gray-90000 font-bold"
                htmlFor="acuenta"
              >
                Acuenta:
              </label>
            </div>
            <div className="w-7/12">
              <input
                className="w-full  appearance-none border rounded py-1 px-2 text-gray-700 outline-none focus:outline-none focus:bg-white focus:ring focus:border-blue-400 ease-linear transition-all duration-150"
                type="number"
                name="acuenta"
                value={notaPedido.acuenta}
                step={0.1}
                onChange={handleInputChangeCrearNotaPedido}
                required
              />
            </div>
          </div>
          <div className="flex justify-end mx-5">
            <button
              type="submit"
              className="bg-green-600 text-white rounded px-6 py-2 uppercase font-bold shadow hover:shadow-lg focus:outline-none focus:bg-green-700 ease-linear transition-all duration-150"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-full overflow-x-auto mx-5 max-lg:w-[650px] max-lg:flex max-lg:m-auto">
        <table className="w-full max-lg:m-auto">
          <thead className="border-b font-medium dark:bg-neutral-500">
            <tr>
              <th scope="col" className=" py-4 px-1">
                CANTIDAD
              </th>
              <th scope="col" className=" py-4 px-1">
                PRODUCTO
              </th>
              <th scope="col" className=" py-4 px-2">
                PRECIO
              </th>
              <th scope="col" className=" py-4 px-2">
                SUBTOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            {carritoProducto.map((producto) => (
              <ProductoNotaPedido key={producto.pr_id} producto={producto} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td className="whitespace-nowrap px-2 py-4 font-bold text-center">
                Total:
              </td>
              <td className="whitespace-nowrap px-2 py-4 font-bold text-center">
                {total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex justify-between mx-5 max-lg:w-[650px]  max-lg:mx-auto mb-1">
        <ul>
          <li>
            <Link
              className="text-white bg-sky-500 font-bold uppercase text-sm shadow rounded outline-none hover:shadow-lg focus:outline-none focus:bg-sky-600 ease-linear transition-all duration-150 px-6 py-2"
              to={"/imprimir"}
            >
              Imprimir
            </Link>
          </li>
        </ul>

        <button
          onClick={vaciarCarrito}
          className="text-white bg-rose-500 font-bold uppercase px-6 py-2 text-sm outline-none rounded shadow hover:shadow-lg focus:outline-none focus:bg-rose-600  ease-linear transition-all duration-150 max-lg:mx-5"
        >
          Vaciar
        </button>
      </div>
    </>
  );
}

export default NotaPedido;
