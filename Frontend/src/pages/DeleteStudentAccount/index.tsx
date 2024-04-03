import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SuccesfulResponse from "../../components/ui/shared/SuccesfulResponse";

import { DeleteStudentFormValues } from "../../types/types";
import Loading from "../../components/ui/shared/Loading";
import { useAuth } from "../../components/context/AuthContext";
import { deleteStudent } from "../../api/api";

export default function DeleteStudentAccount() {
  let navigate = useNavigate();
  const [isStudentDeleted, setIsStudentDeleted] = useState(false);
  const [errorThrown, setErrorThrown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, register, handleSubmit, formState, setError, setValue } =
    useForm<DeleteStudentFormValues>();
  const { studentId } = useAuth();
  const { errors } = formState;
  const { updateUserAuthentication, updateAuthenticatedUserID } = useAuth();

  const deleteStudentHandler = (data: DeleteStudentFormValues) => {
    deleteStudent(studentId.toString(), data)
      .then((data) => {
        console.log("Student deleted:", data);

        if (data.status === 204) {
          localStorage.removeItem("authToken");
          updateUserAuthentication(false);
          updateAuthenticatedUserID(0);
          setIsStudentDeleted(true);
          setLoading(false);
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 3000);
        } else {
          setLoading(false);
          setErrorThrown(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        setErrorThrown(true);
      });
  };

  const onSubmit: SubmitHandler<DeleteStudentFormValues> = (data) => {
    console.log("Form", data);
    deleteStudentHandler(data);
    setLoading(true);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (!isStudentDeleted) {
    return (
      <>
        <div className="mx-5 my-10 md:container md:mx-auto md:w-fit">
          <header className="bg-primary mx-3 my-10 tracking-[0.5rem]">
            <h1 className="text-5xl py-4 font-bold text-center">
              BORRAR CUENTA
            </h1>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-4 border-primary rounded-xl font-body flex flex-col mt-3 mb-10 px-20 space-y-7 py-10"
            noValidate
          >
            <label className="flex gap-5">
              <input
                type="checkbox"
                {...register("removeAccountAgreement", {
                  required: {
                    value: true,
                    message:
                      "Debes aceptar estar de acuerdo en eliminar tu cuenta",
                  },
                })}
              ></input>
              <p>
                Estoy de acuerdo en eliminar mi cuenta de{" "}
                <span className="font-bold">EL PRACTICANTE</span>
              </p>
            </label>
            <p className="text-base font-light text-red">
              {errors.removeAccountAgreement?.message}
            </p>

            <label className="">
              <h1>
                Estámos tristes de que te marches. ¿Nos puedes decir el motivo
                por el cual quieres eliminar tu cuenta?
              </h1>
              <textarea
                {...register("feedback")}
                placeholder="¿Qué ha pasado? ¡Cuéntanos!"
                rows={6}
                className=" resize-none border focus:outline-none focus:border-secondary-100 mt-5
                w-3/4 py-2 pl-2 rounded font-normal "
              ></textarea>
            </label>

            {errorThrown && (
              <p className="font-bold text-red">
                {" "}
                ❌ ¡Ha ocurrido un error revisa el formulario!
              </p>
            )}
            <button
              type="submit"
              className="md:text-xl rounded border-cyan-600  bg-red text-white  py-2 font-bold uppercase tracking-[0.3rem] my-5  hover:bg-darkred"
            >
              ELIMINAR
            </button>
          </form>
          <DevTool control={control} />
        </div>
      </>
    );
  } else {
    return (
      <SuccesfulResponse message="¡La cuenta se ha eliminado con éxito!"></SuccesfulResponse>
    );
  }
}
