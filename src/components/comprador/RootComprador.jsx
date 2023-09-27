import React from "react";
import Filtros from "./Filtros";
import ListaCompradores from "./ListaCompradores";
function RootComprador() {
  return (
    <div className="max-w-full flex bg-slate-800 h-full max-lg:flex-col">
      <div className=" bg-white text-black font-bold w-full max-lg:w-full max-lg:h-3/5">
        <div className="flex justify-center items-center gap-10 max-w-full h-40 max-lg:justify-start max-lg: ml-6">
          <Filtros />
        </div>
        <ListaCompradores />
      </div>
    </div>
  );
}

export default RootComprador;
