import React from "react";

function NotaCardResumen({ nota }) {
  return (
    <tr className="border-b dark:border-neutral-500 hover:bg-slate-50 text-center">
      <td className="whitespace-nowrap font-medium px-6 py-2">{nota.ven_id}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.ven_date}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.comp_name}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.vent_total}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.vent_tipo}</td>
      <td className="whitespace-nowrap px-6 py-2">{nota.ven_acuenta}</td>
    </tr>
  );
}

export default NotaCardResumen;
