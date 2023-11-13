import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  dni: string;
  mobile: string;
  school: string;
  degree: string;
  company: string;
  city: string;
  autonomousCommunity: string;
  zipCode: string;
};

export default function Register() {
  let navigate = useNavigate();
  const form = useForm<FormValues>();
  const { control, register, handleSubmit } = form;

  const addStudent = async (data: FormValues) => {
    await fetch("http://localhost:8080/api/v1/students", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        birthDay: data.birthday,
        DNI: data.dni,
        mobile: data.mobile,
        school: "1",
        degree: "1",
        company: "1",
        city: "Madrid",
        autonomousCommunity: "Comunidad de Madrid",
        zipCode: "29044",
      }),
      headers: {
        "Content-Type": "application/json;",
      },
    })
      .then((response) => {
        if (response.status == 201) {
          navigate("/login", { replace: true });
        }
      })
      .catch((error: Error) => console.log("Este es el error: " + error));
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form", data);
    addStudent(data);
  };
  return (
    <>
      <div className="mx-5 my-10 md:container md:mx-auto md:w-fit">
        <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
          <h1 className="text-5xl py-4 text-center">REGISTRO</h1>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-4 border-primary rounded-xl font-body flex flex-col mt-3 mb-10 px-20 space-y-7 py-10"
        >
          <label htmlFor="name" className="text-sm font-bold md:text-xl">
            <h1 className="text-secondary-100">Nombre</h1>
            <input
              {...register("name")}
              id="name"
              type="text"
              placeholder="Nombre"
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
          <label htmlFor="lastName" className="text-sm font-bold md:text-xl">
            <h1 className="text-secondary-100">Apellido</h1>
            <input
              {...register("lastName")}
              id="lastName"
              type="text"
              placeholder="Nombre"
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
          <label htmlFor="email" className="text-sm font-bold md:text-xl">
            <h1 className="text-secondary-100">Email</h1>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Emal"
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
          <label
            htmlFor="confirmPassword"
            className="text-sm font-bold md:text-xl"
          >
            <h1 className="text-secondary-100">Confirmar contraseña</h1>
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
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
          <label htmlFor="birthday" className="text-sm font-bold md:text-xl">
            <h1 className="text-secondary-100">Fecha de nacimiento</h1>
            <input
              {...register("birthday")}
              id="birthday"
              type="date"
              placeholder="Introduce una fecha"
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

          <label htmlFor="DNI" className="text-sm font-bold md:text-xl">
            <h1 className="text-secondary-100">DNI</h1>
            <input
              {...register("dni")}
              id="DNI"
              type="text"
              placeholder="A1234591-B"
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

          <label htmlFor="mobile" className="text-sm font-bold md:text-xl">
            <h1 className="text-secondary-100">Móvil</h1>
            <input
              {...register("mobile")}
              id="mobile"
              type="tel"
              placeholder="123-45-50-41"
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
          <label className=" md:text-xl">
            <div className="text-sm">
              <h1 className="font-bold text-secondary-100 md:text-xl">
                Centro de educación
              </h1>
              <select
                className="md:text-xl px-2 py-4 border rounded w-full text-black focus:focus:border-secondary-100"
                {...register("school")}
                name="school"
                id="lang"
              >
                <option value="selecciona">
                  Selecciona un Centro de Educación
                </option>
                <option value=""> No aparece</option>
                <option id="" value="IES Francisco de Goya">
                  IES Francisco de Goya
                </option>
              </select>
            </div>

            <div className="mt-1">
              <a
                href="#"
                className="underline hover:text-secondary-100 text-sm md:text-xl"
              >
                ¿No aparece tu centro? Haz click aquí para añadirlo
              </a>
            </div>
          </label>

          <label className="">
            <div className="md:text-xl text-sm">
              <h1 className="font-bold text-secondary-100">
                Grado profesional
              </h1>
              <select
                {...register("degree")}
                className=" md:text-xl px-2 py-4 border rounded w-full focus:border-secondary-100"
                id="degree"
              >
                <option value="selecciona" className="">
                  Selecciona un Grado
                </option>
                <option value=""> No aparece</option>
                <option value="DAM"> DAM</option>
                <option value="DAW"> DAW</option>
                <option value="ASIR"> ASIR</option>
              </select>
            </div>

            <div className="mt-1">
              <a
                href="#"
                className="underline hover:text-secondary-100 text-sm md:text-xl"
              >
                ¿No aparece tu grado? Haz click aquí para añadirlo
              </a>
            </div>
          </label>
          <label>
            <div className="text-sm md:text-xl">
              <h1 className="font-bold text-secondary-100">Empresa</h1>
              <select
                className="px-2 py-4 border rounded w-full focus:border-secondary-100"
                {...register("company")}
                id="company"
              >
                <option value="selecciona">Selecciona una Empresa</option>
                <option id="0" value="">
                  No aparece
                </option>
                <option value="Indra"> Indra</option>
                <option value="Accenture"> Accenture</option>
                <option id="1" value="DXC Technology">
                  {" "}
                  DXC Technology
                </option>
              </select>
            </div>

            <div className="mt-1">
              <a
                href="#"
                className="underline hover:text-secondary-100 text-sm md:text-xl"
              >
                ¿No aparece tu empresa? Haz click aquí para añadirlo
              </a>
            </div>
          </label>

          <button
            type="submit"
            className="md:text-xl rounded border-cyan-600 bg-secondary-100 text-white  py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
          >
            Crear cuenta
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
}
