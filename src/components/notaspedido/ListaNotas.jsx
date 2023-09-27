import React, { useContext } from "react";
import { NotaContext } from "../../context/NotaContext";
import NotaCard from "./NotaCard";
import { Link } from "react-router-dom";
function ListaNotas() {
  const { notas } = useContext(NotaContext);
  if (notas.length === 0 || null) {
    return (
      <h1 className="font-bold text-center">No se ha encontrado notas.</h1>
    );
  }
  const t_dia = notas.reduce((sum, nota) => {
    sum[nota.vent_tipo] =
      (sum[nota.vent_tipo] || 0.0) + parseFloat(nota.vent_total);
    return sum;
  }, {});
  return (
    <>
      <div className="h-[956px] mx-1 overflow-x-auto overflow-y-auto max-lg:max-h-[450px]">
        <table className="min-w-full text-center text-base font-light ">
          <thead className="border-b-2 dark:border-neutral-500 font-medium">
            <tr className="text-gray-800 [&>th]:px-6 [&>th]:pb-4 [&>th]:uppercase">
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Comprador</th>
              <th scope="col">Total</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha Cancelacion</th>
              <th scope="col">Comentario</th>
              <th scope="col">Deuda</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((nota) => (
              <NotaCard key={nota.ven_id} nota={nota} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-2 font-bold">
        <ul>
          <li>
            <Link
              className="text-white bg-sky-500 font-bold uppercase text-sm shadow rounded outline-none hover:shadow-lg focus:outline-none focus:bg-sky-600 ease-linear transition-all duration-150 px-6 py-2"
              to={"/imprimir-resumen"}
            >
              Imprimir Resumen
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            Total Venta del Dia:{" "}
            {t_dia["CANCELADO"] ? t_dia["CANCELADO"].toFixed(2) : 0.0}
          </li>
          <li>
            Total Venta del Dia VISA:{" "}
            {t_dia["CANCELADO-VISA"] ? t_dia["CANCELADO-VISA"].toFixed(2) : 0.0}
          </li>
          <li>
            Total Venta del Dia BCP:{" "}
            {t_dia["CANCELADO-BCP"] ? t_dia["CANCELADO-BCP"].toFixed(2) : 0.0}
          </li>
          <li>
            Total Venta del Dia BBVA:{" "}
            {t_dia["CANCELADO-BBVA"] ? t_dia["CANCELADO-BBVA"].toFixed(2) : 0.0}
          </li>
          <li>
            Total Venta del Dia YAPE:{" "}
            {t_dia["CANCELADO-YAPE"] ? t_dia["CANCELADO-YAPE"].toFixed(2) : 0.0}
          </li>
          <li>
            Total Venta del Dia POR CANCELAR:{" "}
            {t_dia["POR-CANCELAR"] ? t_dia["POR-CANCELAR"].toFixed(2) : 0.0}
          </li>
        </ul>
      </div>
    </>
  );
}

export default ListaNotas;
