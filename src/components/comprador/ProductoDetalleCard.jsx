import React from "react";

function ProductoDetalleCard({ producto }) {
  const totalPrice = isNaN(producto.pr_sprice * producto.dv_quantity)
    ? 0.0
    : (producto.pr_sprice * producto.dv_quantity).toFixed(2);
  return (
    <tr>
      <td style={{ padding: "5px" }}>{producto.dv_quantity}</td>
      <td style={{ padding: "5px" }}>{producto.pr_name}</td>
      <td style={{ padding: "5px", textAlign: "center" }}>
        {producto.pr_sprice}
      </td>
      <td style={{ padding: "5px", textAlign: "center" }}>{totalPrice}</td>
    </tr>
  );
}

export default ProductoDetalleCard;
