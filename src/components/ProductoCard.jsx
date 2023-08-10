function ProductoCard({ producto }) {
  return (
    <>
      <tr className="border-b dark:border-neutral-500 hover:bg-blue-gray-50">
        <td className="whitespace-nowrap px-6 py-4 font-medium">
          {producto.pr_id}
        </td>
        <td className="text-left">{producto.pr_tipo}</td>
        <td className="text-left">{producto.pr_name}</td>
        <td className="whitespace-nowrap px-12 py-4 ">{producto.pr_bprice}</td>
        <td className="whitespace-nowrap px-12 py-4 ">{producto.pr_sprice}</td>
        <td className="whitespace-nowrap px-6 py-4 ">{producto.pr_quantity}</td>
        <td>
          <div className="container flex gap-2">
            <button className="bg-light-green-600 hover:bg-light-green-500 text-white rounded-md whitespace-nowrap px-4 py-2">
              Agregar
            </button>
            <button className="bg-amber-600 hover:bg-amber-500 text-white rounded-md whitespace-nowrap px-4 py-2">
              Actualizar
            </button>
            <button className="bg-red-600 hover:bg-red-500  text-white rounded-md whitespace-nowrap px-4 py-2">
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ProductoCard;
