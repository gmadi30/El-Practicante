import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  let navigate = useNavigate();
  const form = useForm<FormValues>();
  const { control, register, handleSubmit } = form;

  const retrieveStudent = async (data: FormValues) => {
    await fetch("http://localhost:8080/api/v1/students/login", {
      method: "POST",
      body: JSON.stringify({
        studentEmail: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json;",
      },
    })
      .then((response) => {
        if (response.status == 302) {
          console.log(response);
          response.json().then((response) => {
            console.log(response);
            navigate(`/student/${response.studentId}/profile`, {
              state: response,
              replace: true,
              relative: "path",
            });
          });
        }
      })
      .catch();
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log("Formulario", data);
    retrieveStudent(data);
  };
  return (
    <>
      <div className="container px-20 mx-auto max-w-screen-sm md:mx-auto lg:text-xl sm:w-[75%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-w-6xl mx-auto mt-32 mb-6  space-y-6"
        >
          <h1 className="font-bold text-2xl lg:text-4xl">Iniciar sesión</h1>

          <label htmlFor="email" className="text-sm font-bold md:text-xl">
            <h1 className="text-secondary-100">Email</h1>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Email"
              className="border
                    focus:outline-none
                    focus:bg-primary
                    w-full
                    py-2
                    pl-2
                    rounded
                    font-normal
                    placeholder:opacity-60
                    "
            />
          </label>
          <label htmlFor="password" className="text-sm font-bold md:text-xl">
            <h1 className="text-secondary-100">Contraseña</h1>
            <input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Contraseña"
              className="border
                    focus:outline-none
                    focus:bg-primary
                    w-full
                    py-2
                    pl-2
                    rounded
                    font-normal
                    placeholder:opacity-60
                    "
            />
          </label>

          <div className="mt-1">
            <a href="#" className="underline hover:text-secondary-100">
              He olvidado mi contraseña
            </a>
          </div>

          <button
            type="submit"
            className="rounded border-cyan-600 w-full bg-secondary-100 text-white  py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
          >
            <p>Iniciar sesión</p>
          </button>
        </form>
        <p className="">
          ¿Todavía no tienes una cuenta?{" "}
          <Link to="/signup">
            <span className="font-bold text-secondary-100 hover:underline">
              Createla aquí{" "}
            </span>
          </Link>
        </p>
        <DevTool control={control} />
      </div>
    </>
  );
}
