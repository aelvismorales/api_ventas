import React from "react";
import BuscarNotas from "./BuscarNotas";
import ListaNotas from "./ListaNotas";
function RootNotas() {
  return (
    <div className="flex flex-col overflow-x-auto overflow-y-auto">
      <div className="ml-5 my-5">
        <BuscarNotas />
      </div>
      <div>
        <ListaNotas />
      </div>
    </div>
  );
}

export default RootNotas;
