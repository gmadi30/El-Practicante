import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../../api/api";
import SuccesfulResponse from "../../../components/ui/shared/SuccesfulResponse";
import LoginForm from "./LoginForm";

export default function Login() {
  const navigate = useNavigate();

  if (getAuthToken()) {
    return <SuccesfulResponse message={"¡Sesión iniciada con éxito!"} />;
  } else {
    return (
      <div className="container px-20 mx-auto max-w-screen-sm md:mx-auto lg:text-xl sm:w-[75%]">
        <LoginForm navigate={navigate} />
      </div>
    );
  }
}
