import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center font-body bg-secondary-100 w-full py-2 text-white text-sm lg:text-xl">
      <div className="w-fit">
        <img src={logo} width={50}></img>
      </div>
      <h1 className="min-w-max mr-5">El Practicante</h1>
      <ul className=" flex justify-between font-semibold tracking-wide uppercase md:container  md:mx-auto ml-5">
        <div className="flex gap-5 md:gap-10 ">
          <li className="hoverNavigation">
            <Link to="/">Inicio</Link>
          </li>
          <li className="hoverNavigation hidden md:block ">
            <Link to="#">Sobre nosotros</Link>
          </li>
          <li className="hoverNavigation">
            <Link to="#">Contacto</Link>
          </li>
        </div>

        <div>
          <li className="hoverNavigation ml-5">
            <Link to="/login">Iniciar sesión</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
