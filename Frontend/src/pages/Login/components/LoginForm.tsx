import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import {
  RegisterFormValues as FormValues,
  LoginFormValues,
} from "../../../types/types";
import { login } from "../../../api/api";
import { useAuth } from "../../../components/context/AuthContext";
import FormInput from "./FormInput";

interface LoginFormProps {
  navigate: ReturnType<typeof useNavigate>;
}

const LoginForm: React.FC<LoginFormProps> = ({ navigate }) => {
  const form = useForm<FormValues>();
  const { control, register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [isCredentialsWrong, setIsCredentialsWrong] = useState(false);
  const { updateAuthenticatedUserID, updateUserAuthentication, studentId } =
    useAuth();

  const retrieveStudent = async (data: FormValues) => {
    const bodyValues: LoginFormValues = {
      studentEmail: data.email,
      password: data.password,
    };
    try {
      const loginResponse = await login(bodyValues);

      if (loginResponse) {
        updateAuthenticatedUserID(loginResponse.studentId);
        updateUserAuthentication(true);
        setTimeout(() => {
          navigateLoginResponse(loginResponse.studentId);
        }, 1000);
      }
    } catch (error) {
      setIsCredentialsWrong(true);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    retrieveStudent(data);
  };

  const navigateLoginResponse = (studentId: string) => {
    navigate(`/student/${studentId}/profile`, {
      state: { response: studentId, isAuthenticated: "true" },
      replace: true,
      relative: "path",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-6xl mx-auto mt-32 mb-6 space-y-6"
    >
      <h1 className="font-bold text-2xl lg:text-4xl">Iniciar sesión</h1>
      <FormInput
        label="Email"
        id="email"
        type="email"
        placeholder="Email"
        register={register("email", {
          required: "Este campo es obligatorio",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Introduce un email válido",
          },
        })}
        error={errors.email}
      />
      <FormInput
        label="Contraseña"
        id="password"
        type="password"
        placeholder="Contraseña"
        register={register("password", {
          required: "Este campo es obligatorio",
        })}
        error={errors.password}
      />
      {isCredentialsWrong && (
        <p className="font-bold text-red">
          ❌ ¡Las credenciales son incorrectas!
        </p>
      )}
      <div className="mt-1">
        <a href="#" className="underline hover:text-secondary-100">
          He olvidado mi contraseña
        </a>
      </div>
      <button
        type="submit"
        className="rounded border-cyan-600 w-full bg-secondary-100 text-white py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
      >
        <p>Iniciar sesión</p>
      </button>
      <p className="">
        ¿Todavía no tienes una cuenta?{" "}
        <Link to="/register">
          <span className="font-bold text-secondary-100 hover:underline">
            Createla aquí
          </span>
        </Link>
      </p>
      <DevTool control={control} />
    </form>
  );
};

export default LoginForm;
