import { Routes, Route, useLocation } from "react-router-dom";
import Root from "./components/Root";
import Nav from "./components/Nav";
import RootComprador from "./components/comprador/RootComprador";
import RootNotas from "./components/notaspedido/RootNotas";
import { useContext } from "react";
import { ProductContext } from "./context/ProductContext";
import ImprimirNota from "./components/ImprimirNota";
import EditarNotaPedido from "./components/notaspedido/EditarNotaPedido";
import ImprimirResumenNota from "./components/ImprimirResumenNota";
function App() {
  const { correcto, closeCorrecto } = useContext(ProductContext);
  const location = useLocation();
  const excludeNavPath = "/imprimir";
  const excludeNavPath2 = "/imprimir-resumen";
  return (
    <div className="w-full fixed flex flex-col top-0 left-0">
      {location.pathname !== excludeNavPath &&
        location.pathname !== excludeNavPath2 && <Nav />}

      {correcto.estado ? (
        <>
          <div
            className={`${
              correcto.color === "green" ? "bg-green-400" : "bg-yellow-400"
            } mx-2 rounded-md`}
          >
            <div className="flex justify-between p-4">
              <h2 className="text-gray-700 font-bold"> {correcto.mensaje}</h2>
              <div className="cursor-pointer" onClick={closeCorrecto}>
                <p>X</p>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/compradores" element={<RootComprador />} />
        <Route path="/notaspedido" element={<RootNotas />} />
        <Route path="/imprimir" element={<ImprimirNota />} />
        <Route path="/editar" element={<EditarNotaPedido />} />
        <Route path="/imprimir-resumen" element={<ImprimirResumenNota />} />
      </Routes>
    </div>
  );
}

export default App;
