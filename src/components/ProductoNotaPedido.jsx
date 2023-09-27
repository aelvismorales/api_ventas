import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";
function ProductoNotaPedido({ producto }) {
  const { handleInputProductoNotaPedido, eliminarProductoCarrito } =
    useContext(ProductContext);
  const handleInput = (event) => {
    const { name, value } = event.target;
    handleInputProductoNotaPedido(name, value, producto);
  };
  const handleClicks = () => {
    eliminarProductoCarrito(producto);
  };
  const totalPrice = isNaN(producto.pr_sprice * producto.quantity)
    ? 0.0
    : (producto.pr_sprice * producto.quantity).toFixed(2);
  return (
    <>
      <tr className="[&>td]:px-1 [&>td]:py-3 [&>td]:text-center border-b dark:border-neutral-500 hover:bg-blue-gray-50">
        <td>
          <input
            className=""
            type="number"
            name="pr_cantidad"
            step="0.1"
            value={producto.quantity}
            onChange={handleInput}
          />
        </td>
        <td className="">{producto.pr_name}</td>
        <td className="">
          <input
            className=""
            type="number"
            name="pr_sprice"
            step="0.1"
            value={producto.pr_sprice}
            onChange={handleInput}
          />
        </td>
        <td className="">{totalPrice}</td>
        <td>
          <div>
            <button
              onClick={handleClicks}
              className="bg-red-600 shadow hover:shadow-lg text-white px-4 py-2 rounded focus:bg-red-500"
            >
              ELIMINAR
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ProductoNotaPedido;
