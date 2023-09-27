import React from "react";
import ListaProductos from "./ListaProductos";
import { Filters } from "./Filters";
import NotaPedido from "./NotaPedido";
import { useId, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
function Root() {
  const { handleChangeSortOrder } = useContext(ProductContext);
  const selectsortProductsID = useId();
  return (
    <div className="max-w-full flex bg-slate-800 h-full max-lg:flex-col">
      <div className=" bg-white text-black font-bold w-7/12 max-lg:w-full max-lg:h-3/5">
        <div className="flex justify-center items-center gap-10 max-w-full h-40 max-lg:justify-start max-lg: ml-6">
          <Filters />
        </div>
        <div className="flex justify-end mr-5 font-normal">
          <select
            className="border rounded"
            name="select-sort-products"
            id={selectsortProductsID}
            onChange={handleChangeSortOrder}
          >
            <option value="">Ordenar por:</option>
            <option value="Ascendente">Precio de menor a Mayor</option>
            <option value="Descendente"> Precio de Mayor a menor</option>
          </select>
        </div>
        <ListaProductos />
      </div>
      <div className="bg-white text-black w-5/12 border-l-4 border-black max-lg:h-[600px] max-lg:w-full max-lg:border-t-4 max-lg:border-l-0 max-lg:overflow-y-auto">
        <NotaPedido />
      </div>
    </div>
  );
}

export default Root;
