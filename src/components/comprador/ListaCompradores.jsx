import React, { useContext } from "react";
import { CompradorContext } from "../../context/CompradorContext";
import CompradorCard from "./CompradorCard";
function ListaCompradores() {
  const { compradores } = useContext(CompradorContext);
  if (compradores.length === 0 || null) {
    return (
      <h1 className="font-bold text-center">
        No se ha encontrado compradores.
      </h1>
    );
  }
  return (
    <div className="h-[1080px] mx-1 overflow-x-auto overflow-y-auto max-lg:max-h-[450px]">
      <table className="min-w-full text-center text-base font-light ">
        <thead className="border-b-2 dark:border-neutral-500 font-medium">
          <tr className="text-gray-800 [&>th]:px-6 [&>th]:pb-4 [&>th]:uppercase">
            <th scope="col">#</th>
            <th scope="col">Comprador</th>
            <th scope="col">Direccion</th>
            <th scope="col">Telefono</th>
            <th scope="col">Dni</th>
            <th scope="col">Ver Compras</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {compradores.map((comprador) => (
            <CompradorCard key={comprador.com_id} comprador={comprador} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCompradores;
