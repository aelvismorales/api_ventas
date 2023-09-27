import React, { useContext } from "react";
import { NotaContext } from "../../context/NotaContext";
import { Link } from "react-router-dom";
function EditarNotaPedido() {
  const {
    datosNota,
    handleInputChangeEditarNotaPedido,
    actualizarDatosNotaPedido,
  } = useContext(NotaContext);
  return (
    <>
      <div className="flex">
        <div className="w-auto my-6 mx-auto ">
          <div className="px-2 pt-2 pb-1 border-b-2 border-gray-900">
            <h3 className="text-2xl font-semibold">Editar Nota:</h3>
          </div>
          <div className="p-6">
            <form
              className="w-[768px] max-lg:w-[448px]"
              onSubmit={actualizarDatosNotaPedido}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="comp_name"> Comprador:</label>
                  <input
                    type="text"
                    name="comp_name"
                    value={datosNota.comp_name}
                    className="bg-gray-100 w-full rounded py-2 pl-4 appearance-none focus:outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 border"
                    onChange={handleInputChangeEditarNotaPedido}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="ven_address">Direccion:</label>
                  <input
                    type="text"
                    name="ven_address"
                    value={datosNota.ven_address}
                    onChange={handleInputChangeEditarNotaPedido}
                    className="bg-gray-100 rounded py-2 pl-4 appearance-none focus:outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 border"
                  />
                </div>
                <div className="flex">
                  <div className="flex gap-2  bg-gray-300 rounded items-center">
                    <label htmlFor="ven_tipo" className="font-bold mx-2">
                      Estado:
                    </label>
                    <p className="text-gray-400 mx-2">{datosNota.ven_tipo}</p>
                    <select
                      name="ven_tipo"
                      onChange={handleInputChangeEditarNotaPedido}
                      className="block bg-gray-100 border rounded py-2 px-2 text-gray-700 focus:outline-none focus:bg-white focus:ring focus:border-blue-400  ease-linear transition-all duration-100"
                    >
                      <option value="CANCELADO">CANCELADO</option>
                      <option value="CANCELADO-VISA">CANCELADO-VISA</option>
                      <option value="CANCELADO-BCP">CANCELADO-BCP</option>
                      <option value="CANCELADO-YAPE">CANCELADO-YAPE</option>
                      <option value="POR-CANCELAR">POR-CANCELAR</option>
                      <option value="PROFORMA">PROFORMA</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="ven_acuenta">Acuenta:</label>
                  <input
                    type="number"
                    name="ven_acuenta"
                    value={datosNota.ven_acuenta}
                    onChange={handleInputChangeEditarNotaPedido}
                    className="bg-gray-100 rounded py-2 pl-4 appearance-none focus:outline-none focus:ring focus:bg-white focus:border-blue-400 ease-linear transition-all duration-100 border"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="ven_date_cancelacion">
                    Fecha Cancelacion:
                  </label>
                  <input
                    type="date"
                    value={datosNota.ven_date_cancelacion}
                    onChange={handleInputChangeEditarNotaPedido}
                    name="ven_date_cancelacion"
                    className="py-1 rounded border"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="ven_comment">Comentario:</label>
                  <textarea
                    className="rounded border"
                    name="ven_comment"
                    value={datosNota.ven_comment}
                    onChange={handleInputChangeEditarNotaPedido}
                  ></textarea>
                </div>
                <div className="flex gap-4 text-white">
                  {/* TODO: COMPLETE BACK TO MY PAGE ,
                        COMPLETE SUBMIT OF FORM
                        */}
                  <ul>
                    <li className="bg-green-700 p-2 rounded hover:shadow-sm active:bg-green-800 ease-linear transition-all duration-100">
                      <Link to={"/notaspedido"}>Regresar</Link>
                    </li>
                  </ul>

                  <button
                    type="submit"
                    className="bg-sky-700 p-2 rounded hover:shadow-sm active:bg-sky-800 transition-all duration-100"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditarNotaPedido;
