import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductoCard from "./ProductoCard";
export default function ListaProductos() {
  const { productos, sortOrder } = useContext(ProductContext);

  if (productos.length === 0) {
    return (
      <h1 className="font-bold text-center">No se ha encontrado productos.</h1>
    );
  }

  productos.sort((a, b) => {
    if (sortOrder === "Ascendente") {
      return parseFloat(a.pr_sprice, 2) - parseFloat(b.pr_sprice, 2);
    } else if (sortOrder === "Descendente") {
      return parseFloat(b.pr_sprice, 2) - parseFloat(a.pr_sprice, 2);
    } else {
      return a.pr_id - b.pr_id;
    }
  });

  return (
    <div className="max-h-full mx-1 overflow-x-auto overflow-y-auto max-lg:max-h-[450px]">
      <table className="min-w-full text-center text-base font-light">
        <thead className="border-b-2 dark:border-neutral-500 font-medium">
          <tr className="text-gray-800 [&>th]:px-6 [&>th]:pb-4 [&>th]:uppercase">
            <th scope="col">#</th>
            <th scope="col">Tipo</th>
            <th scope="col">Producto</th>
            <th scope="col">Precio Compra</th>
            <th scope="col">Precio Venta</th>
            <th scope="col">Stock</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <ProductoCard key={producto.pr_id} producto={producto} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
