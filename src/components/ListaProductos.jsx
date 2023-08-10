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
    <div className="flex flex-row justify-between gap-6">
      <div className="flex flex-col w-full">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
            <div className="overflow-hidden ">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Producto
                    </th>

                    <th scope="col" className="px-6 py-4">
                      Precio Compra
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Precio Venta
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Stock
                    </th>
                    <th scope="col" className=""></th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <ProductoCard key={producto.pr_id} producto={producto} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
