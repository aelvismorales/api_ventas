import ListaProductos from "./components/ListaProductos";
import { Filters } from "./components/Filters";
import NotaPedido from "./components/NotaPedido";
function App() {
  return (
    <div className="flex w-screen">
      <div className="w-70">
        <Filters />
        <ListaProductos />
      </div>
      <div className="border-solid border-6 border-black border-l-2 mx-5 p-5">
        <div className="w-30">
          <NotaPedido />
        </div>
      </div>
    </div>
  );
}

export default App;
