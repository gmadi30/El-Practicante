import { Link } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import InputForm from "../../components/form/InputForm";
export default function Login() {
  return (
    <>
      <Navbar></Navbar>
      <div className="container px-20 mx-auto max-w-screen-sm md:mx-auto lg:text-xl sm:w-[75%]">
        <form className="flex flex-col max-w-6xl mx-auto mt-32 mb-6  space-y-6">
          <h1 className="font-bold text-2xl lg:text-4xl">Iniciar sesión</h1>
          <InputForm type="Email" placeHolder="Email" title="Email" />
          <InputForm
            type="password"
            placeHolder="Contraseña"
            title="Contraseña"
          />

          <div className="mt-1">
            <a href="#" className="underline hover:text-secondary-100">
              He olvidado mi contraseña
            </a>
          </div>

          <Link to={"/profile"}>
            <button
              type="submit"
              className="rounded border-cyan-600 w-full bg-secondary-100 text-white  py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
            >
              <p>Iniciar sesión</p>
            </button>
          </Link>
        </form>

        <p className="">
          ¿Todavía no tienes una cuenta?{" "}
          <Link to="/signup">
            <span className="font-bold text-secondary-100 hover:underline">
              Createla aquí{" "}
            </span>
          </Link>
        </p>
      </div>
    </>
  );
}
