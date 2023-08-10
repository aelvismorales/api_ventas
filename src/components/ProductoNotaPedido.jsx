function ProductoNotaPedido({ producto }) {
  return (
    <>
      <tr className="border-b dark:border-neutral-500 hover:bg-blue-gray-50">
        <td className="whitespace-nowrap px-6 py-4 ">
          <input type="number" step="0.01" />
        </td>
        <td className="text-left">b</td>
        <td className="whitespace-nowrap px-12 py-4 ">c</td>
        <td className="whitespace-nowrap px-12 py-4 ">50</td>
        <td>
          <div className="container flex gap-2">
            <button className="bg-red-600 hover:bg-red-500  text-white rounded-md whitespace-nowrap px-4 py-2">
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ProductoNotaPedido;
