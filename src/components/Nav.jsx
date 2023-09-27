import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div>
      <nav className="bg-gray-800 text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold">
              Logo
            </a>
          </div>

          <div className="flex">
            <ul className="flex">
              <li className="mr-4">
                <Link
                  to={"/"}
                  className="block md:inline-block text-white hover:text-gray-300"
                >
                  Inicio
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to={"/compradores"}
                  className="block md:inline-block text-white hover:text-gray-300"
                >
                  Compradores
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to={"/notaspedido"}
                  className="block md:inline-block text-white hover:text-gray-300"
                >
                  Notas de Pedido
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block md:inline-block text-white hover:text-gray-300"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
