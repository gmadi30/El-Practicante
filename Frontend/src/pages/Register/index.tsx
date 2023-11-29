import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SuccesfulResponse from "../../components/ui/SuccesfulResponse";
import { RegisterFormValues as FormValues } from "../../types/types";
export default function Register() {
  let navigate = useNavigate();
  const { control, register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const [isStudentCreated, setIsStudentCreated] = useState(false);

  const addStudent = async (data: FormValues) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("birthday", data.birthday);
    formData.append("city", "Madrid");
    formData.append("autonomousCommunity", "Comunidad de Madrid");
    formData.append("zipcode", "28033");
    formData.append("dni", data.dni);
    formData.append("mobile", data.mobile);
    formData.append("schoolId", data.schoolId);
    formData.append("companyId", data.companyId);
    formData.append("degreeId", data.degreeId);
    if (data.profilePicture[0]) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    await fetch("http://localhost:8080/api/v1/students", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status == 201) {
          setIsStudentCreated(true);
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 3000);
        }
      })
      .catch((error: Error) => console.log("Este es el error: " + error));
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form", data.profilePicture[0]);
    addStudent(data);
  };
  if (!isStudentCreated) {
    return (
      <>
        <div className="mx-5 my-10 md:container md:mx-auto md:w-fit">
          <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
            <h1 className="text-5xl py-4 font-bold text-center">REGISTRO</h1>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-4 border-primary rounded-xl font-body flex flex-col mt-3 mb-10 px-20 space-y-7 py-10"
            noValidate
          >
            <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-2">
              <label htmlFor="name" className="text-sm font-bold md:text-xl">
                <h1 className="text-secondary-100">Nombre</h1>
                <input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    minLength: 3,
                    maxLength: 20,
                  })}
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
                <p className="text-base font-light text-red">
                  {errors.name?.message}
                </p>
              </label>
              <label
                htmlFor="lastName"
                className="text-sm font-bold md:text-xl"
              >
                <h1 className="text-secondary-100">Apellido</h1>
                <input
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                  id="lastName"
                  type="text"
                  placeholder="Apellido"
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
                <p className="text-base font-light text-red">
                  {errors.lastName?.message}
                </p>
              </label>
            </div>
            <label htmlFor="email" className="text-sm font-bold md:text-xl">
              <h1 className="text-secondary-100">Email</h1>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Introduce un email valido",
                  },
                })}
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
              <p className="text-base font-light text-red">
                {errors.email?.message}
              </p>
            </label>
            <label htmlFor="password" className="text-sm font-bold md:text-xl">
              <h1 className="text-secondary-100">Contraseña</h1>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
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
              <p className="text-base font-light text-red">
                {errors.password?.message}
              </p>
            </label>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-bold md:text-xl"
            >
              <h1 className="text-secondary-100">Confirmar contraseña</h1>
              <input
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
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
              <p className="text-base font-light text-red">
                {errors.confirmPassword?.message}
              </p>
            </label>
            <label htmlFor="birthday" className="text-sm font-bold md:text-xl">
              <h1 className="text-secondary-100">Fecha de nacimiento</h1>
              <input
                {...register("birthday", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
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
              <p className="text-base font-light text-red">
                {errors.birthday?.message}
              </p>
            </label>

            <label
              htmlFor="profilePicture"
              className="text-sm font-bold md:text-xl"
            >
              <h1 className="text-secondary-100">Foto de perfil</h1>
              <p className="text-sm my-2">
                Si no eliges una foto de perfil se colocara una por defecto
              </p>
              <input
                {...register("profilePicture")}
                id="profilePicture"
                type="file"
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

            <label htmlFor="DNI" className="text-sm font-bold md:text-xl">
              <h1 className="text-secondary-100">DNI</h1>
              <input
                {...register("dni", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
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
              <p className="text-base font-light text-red">
                {errors.dni?.message}
              </p>
            </label>

            <label htmlFor="mobile" className="text-sm font-bold md:text-xl">
              <h1 className="text-secondary-100">Móvil</h1>
              <input
                {...register("mobile", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
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
              <p className="text-base font-light text-red">
                {errors.mobile?.message}
              </p>
            </label>
            <label className="md:text-xl">
              <div className="text-sm">
                <h1 className="font-bold text-secondary-100 md:text-xl">
                  Centro de educación
                </h1>
                <select
                  className="md:text-xl px-2 py-4 border rounded w-full text-black focus:focus:border-secondary-100"
                  {...register("schoolId", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                  name="schoolId"
                >
                  <option value="">Selecciona un Centro de Educación</option>
                  <option value={0}> No aparece</option>
                  <option value={1}>IES Francisco de Goya</option>
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
              <p className="text-base font-light text-red">
                {errors.schoolId?.message}
              </p>
            </label>

            <label className="">
              <div className="md:text-xl text-sm">
                <h1 className="font-bold text-secondary-100">
                  Grado profesional
                </h1>
                <select
                  {...register("degreeId", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                  className=" md:text-xl px-2 py-4 border rounded w-full focus:border-secondary-100"
                  id="degree"
                >
                  <option value="" className="">
                    Selecciona un Grado
                  </option>
                  <option value={0}> No aparece</option>
                  <option value={1}> DAM</option>
                  <option value={2}> DAW</option>
                  <option value={3}> ASIR</option>
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
              <p className="text-base font-light text-red">
                {errors.degreeId?.message}
              </p>
            </label>
            <label>
              <div className="text-sm md:text-xl">
                <h1 className="font-bold text-secondary-100">Empresa</h1>
                <select
                  className="px-2 py-4 border rounded w-full focus:border-secondary-100"
                  {...register("companyId", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                  id="companyId"
                >
                  <option value="">Selecciona una Empresa</option>
                  <option value={0}> No aparece</option>
                  <option value={1}>Accenture</option>
                  <option value={2}>DXC Technology</option>
                  <option value={3}>Indra</option>
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
              <p className="text-base font-light text-red">
                {errors.companyId?.message}
              </p>
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
  } else {
    return (
      <SuccesfulResponse message="¡Registro completado con éxito!"></SuccesfulResponse>
    );
  }
}
