// src/components/Profile/NotAuthenticatedMessage.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotAuthenticatedMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-20 text-center">
      <h1 className="text-xl font-semibold border-8 p-10 rounded-3xl border-red mx-10">
        No puedes ver las reviews de este practicante
      </h1>
      <h1 className="mt-10 text-xl">
        Inicia sesión para acceder a todo el contenido
      </h1>
      <div>
        <Link to="/login">
          <button className="rounded border-cyan-600 bg-secondary-100 text-white px-14 py-2 font-bold uppercase tracking-[0.5rem] my-5 hover:bg-secondary-200 xl:text-2xl w-full">
            <p>Iniciar sesión</p>
          </button>
        </Link>
        <p className="mb-10">
          ¿Todavía no tienes una cuenta?{" "}
          <Link to="/register">
            <span className="font-bold text-secondary-100 hover:underline">
              Createla aquí
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotAuthenticatedMessage;
