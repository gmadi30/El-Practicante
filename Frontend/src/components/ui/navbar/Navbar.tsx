import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import { useAuth } from "../../context/AuthContext";
import { accessToken, getAccessToken} from "../../../api/api";

const Navbar = () => {
  const {
    studentId,
    authenticated,
    updateUserAuthentication,
    updateAuthenticatedUserID,
  } = useAuth(); // Use the useAuth hook

  console.log(authenticated);

  console.log(getAccessToken());
  const handleLogout = () => {
    if (getAccessToken()) {
      console.log("Token dentro del if: ", accessToken);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken")
      updateUserAuthentication(false); // Update state to trigger re-render
      updateAuthenticatedUserID(0);
    }
  };

  console.log("Valor del studentID: ", studentId);

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
            <Link to="company/companies">Empresas</Link>
          </li>
          {authenticated && (
            <li className="hoverNavigation hidden md:block ">
              <Link to={`student/${studentId}/profile`}>Mi Perfil</Link>
            </li>
          )}
        </div>
        <div>
          <li className="hoverNavigation ml-5">
            {authenticated ? (
              <Link onClick={() => handleLogout()} to="/">
                Cerrar sesión
              </Link>
            ) : (
              <Link to="/login">Iniciar sesión</Link>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
