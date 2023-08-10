import { useId, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import BuscarProductos from "./BuscarProductos";
import CrearProducto from "./CrearProducto";
export function Filters() {
  const { handleChangeSortOrder } = useContext(ProductContext);
  const selectsortProductsID = useId();
  return (
    <div className="flex justify-between gap-20 my-2">
      <BuscarProductos />
      <div className=""></div>
      <div className="flex flex-col gap-7">
        <div className="ml-8 h-12">
          <CrearProducto />
        </div>
        <div className="border  rounded-md mx-2">
          <select
            name="select-sort-products"
            id={selectsortProductsID}
            onChange={handleChangeSortOrder}
          >
            <option value="">Ordenar por:</option>
            <option value="Ascendente">Precio de menor a Mayor</option>
            <option value="Descendente"> Precio de Mayor a menor</option>
          </select>
        </div>
      </div>
    </div>
  );
}
