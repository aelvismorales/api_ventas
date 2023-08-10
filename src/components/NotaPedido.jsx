import React from "react";
import ProductoNotaPedido from "./ProductoNotaPedido";
function NotaPedido() {
  return (
    <>
      <div>
        <table>
          <tr>
            <th scope="col">CANTIDAD</th>
            <th scope="col">PRODUCTO</th>
            <th scope="col">PRECIO</th>
            <th scope="col">SUBTOTAL</th>
            <th scope="col"></th>
          </tr>
          <tbody>
            <ProductoNotaPedido />
          </tbody>
        </table>
      </div>
    </>
  );
}
//cantidad - producto - precio -subtotal - delete
export default NotaPedido;
