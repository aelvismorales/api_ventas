import React, { useContext } from "react";
import { NotaContext } from "../../context/NotaContext";
function BuscarNotas() {
  const {
    handleChangeSearchNota,
    selectState,
    handleChangeState,
    handleChangeSearchFecha,
  } = useContext(NotaContext);
  return (
    <>
      <div className="flex flex-row-reverse justify-between">
        <div className="flex mr-auto ml-5">
          <select className="rounded bg-gray-200 " onChange={handleChangeState}>
            <option value="BUSCAR">Buscar</option>
            <option value="FECHA">Por Fechas</option>
          </select>
        </div>
        {selectState === "BUSCAR" ? (
          <div className="relative w-4/6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="text-gray-500 w-6 h-6"
              >
                <path
                  fill="currentColor"
                  d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"
                />
              </svg>
            </div>

            <input
              type="text"
              className="pl-10 pr-4 py-2 h-12 border rounded-md w-full focus:outline-none focus:bg-white focus:ring focus:border-blue-400 ease-linear transition-all duration-150"
              placeholder="Buscar compradores"
              onChange={handleChangeSearchNota}
            ></input>
          </div>
        ) : selectState === "FECHA" ? (
          <div className="flex gap-5">
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="fecha_inicio">Fecha Inicio</label>
              </div>
              <div>
                <input
                  className="px-5 py-2 border rounded-md  focus:outline-none focus:bg-white focus:ring focus:border-blue-400 ease-linear transition-all duration-150"
                  type="date"
                  name="fecha_inicio"
                  onChange={handleChangeSearchFecha}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="fecha_final">Fecha Fin</label>
              </div>
              <div>
                <input
                  className="px-5 py-2 border rounded-md  focus:outline-none focus:bg-white focus:ring focus:border-blue-400 ease-linear transition-all duration-150"
                  type="date"
                  name="fecha_final"
                  onChange={handleChangeSearchFecha}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default BuscarNotas;
