import React, { useContext } from "react";
import { NotaContext } from "../context/NotaContext";
import NotaCardResumen from "../components/notaspedido/NotaCardResumen";
function ImprimirResumenNota() {
  const { notas, searchNotaFecha } = useContext(NotaContext);
  const t_dia = notas.reduce((sum, nota) => {
    sum[nota.vent_tipo] =
      (sum[nota.vent_tipo] || 0.0) + parseFloat(nota.vent_total);
    return sum;
  }, {});
  return (
    <div className="overflow-y-auto h-screen">
      <div className="flex flex-col items-center my-5 gap-y-5">
        <h1 className="font-bold text-5xl">FERRETERIA PERALVILLO E.I.R.L</h1>
        <h1 className="font-bold text-3xl">
          RESUMEN DEL DIA:{" "}
          {searchNotaFecha.fecha_inicio
            ? searchNotaFecha.fecha_inicio
            : "yyyy-mm-dd"}
        </h1>
      </div>
      <div>
        <table className="min-w-full">
          <thead className="border-b-2 font-medium">
            <tr className="[&>th]:uppercase [&>th]:px-6">
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Comprador</th>
              <th scope="col">Total</th>
              <th scope="col">Estado</th>
              <th scope="col">Deuda</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((nota) => (
              <NotaCardResumen key={nota.ven_id} nota={nota} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-2 font-bold">
        <ul className="flex flex-col gap-y-2">
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
    </div>
  );
}

export default ImprimirResumenNota;
