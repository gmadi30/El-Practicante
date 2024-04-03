import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SuccesfulResponse from "../../components/ui/shared/SuccesfulResponse";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

import {
  Company,
  CompanySortBy,
  Degree,
  RegisterFormValues as FormValues,
  School,
} from "../../types/types";
import Loading from "../../components/ui/shared/Loading";
import {
  getAllCompaniesSortedByFilter,
  getAllDegrees,
  getAllSchools,
  postStudent,
} from "../../api/api";
import validatePassword, { FetchError } from "../../utils/errorUtils/errors";

export default function Register() {
  let navigate = useNavigate();
  const { watch, control, register, handleSubmit, formState, setError } =
    useForm<FormValues>();
  const { errors } = formState;
  const [isStudentCreated, setIsStudentCreated] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [errorThrown, setErrorThrown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const password = watch("password");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsData = await getAllSchools();
        setSchools(schoolsData.schools);
        console.log("Schools updated:", companies);

        const companiesData = await getAllCompaniesSortedByFilter(
          CompanySortBy.ALPHABETICALLY
        );
        setCompanies(companiesData.companies);
        console.log("Companies updated:", companies);

        const degreesData = await getAllDegrees();
        setDegrees(degreesData.degrees);
        console.log("Degrees updated:", companies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const addStudent = (data: FormValues) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("birthday", data.birthday);
    formData.append("city", "Madrid");
    formData.append("autonomousCommunity", "Comunidad de Madrid");
    formData.append("zipcode", "28033");
    // formData.append("dni", data.dni);
    formData.append("mobile", data.mobile);
    formData.append("schoolId", data.schoolId);
    formData.append("companyId", data.companyId);
    formData.append("degreeId", data.degreeId);
    if (data.profilePicture[0]) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    postStudent(formData)
      .then((data) => {
        console.log("Student created:", data);
        if (data) {
          console.log("Student created:", data);
          setIsStudentCreated(true);
          setLoading(false);
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 3000);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        if (error instanceof FetchError) {
          if (error.status === 409) {
            console.log("Error de DNI con el 409");
            /*
            if (error.errorResponseCode === 101) {
              setError("dni", { type: "custom", message: error.message });
            }
            */
            if (error.errorResponseCode === 102) {
              setError("email", { type: "custom", message: error.message });
            }
            if (error.errorResponseCode === 103) {
              setError("mobile", { type: "custom", message: error.message });
            }
          }
        }
      });
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form", data);
    addStudent(data);
    setLoading(true);
  };

  if (loading) {
    return <Loading></Loading>;
  }

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
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                    maxLength: {
                      value: 20,
                      message: "El nombre no puede exceder los 20 caracteres",
                    },
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
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                    maxLength: {
                      value: 20,
                      message: "El nombre no puede exceder los 20 caracteres",
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
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
            <div className="flex">
              <label
                htmlFor="password"
                className="text-sm font-bold md:text-xl flex-grow"
              >
                <h1 className="text-secondary-100">Contraseña</h1>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    validate: (value) =>
                      validatePassword(value, setPasswordIsValid),
                  })}
                  id="password"
                  type={showPassword ? "text" : "password"}
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
              <button
                className="h-20 md:h-24"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                <div className="bg-primary border p-2 rounded ml-1">
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </div>
              </button>
            </div>

            <div className="flex">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-bold md:text-xl flex-grow"
              >
                <h1 className="text-secondary-100">Confirmar contraseña</h1>
                <input
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  className={`border
                  focus:outline-none
                  focus:bg-primary
                  w-full
                  py-2
                  pl-2
                  rounded
                  font-normal
                  placeholder:opacity-60
                  ${password ? "" : "bg-gray placeholder:text-black"}`}
                  disabled={password ? false : true}
                />
                <p className="text-base font-light text-red">
                  {errors.confirmPassword?.message}
                </p>
              </label>
              <button
                type="button"
                className="h-20 md:h-24"
                onClick={togglePassword}
              >
                <div className="bg-primary border p-2 rounded ml-1">
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}{" "}
                </div>
              </button>
            </div>
            <label htmlFor="birthday" className="text-sm font-bold md:text-xl">
              <h1 className="text-secondary-100">Fecha de nacimiento</h1>
              <input
                {...register("birthday", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                  validate: (value) => {
                    // Custom validation logic to check if the birthday is in the past
                    console.log("validando");
                    const birthdayDate = new Date(value);
                    const currentDate = new Date();
                    const minimumAgeDate = new Date(
                      currentDate.getFullYear() - 18,
                      currentDate.getMonth(),
                      currentDate.getDate()
                    );

                    if (birthdayDate >= minimumAgeDate) {
                      return "Debes tener al menos 18 años para registrarte";
                    }
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
              <p className="text-base font-light text-red">
                {errors.profilePicture?.message}
              </p>
            </label>
            {/*
              Hay que revisar si el DNI es un dato que necesitamos en la aplicación
              
            <label htmlFor="DNI" className="text-sm font-bold md:text-xl">
              <h1 className="text-secondary-100">DNI</h1>
              <input
                {...register("dni", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                  pattern: {
                    value: /^(?:\d{8}[-]?[A-Z]|[XYZ]\d{7}[-]?[A-Z0-9])$/,
                    message: "Introduce un DNI, NIE o PASAPORTE válido",
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
             */}

            <label htmlFor="mobile" className="text-sm font-bold md:text-xl">
              <h1 className="text-secondary-100">Móvil</h1>
              <input
                {...register("mobile", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                  pattern: {
                    value: /^(\+\d{1,3})?\d{9,13}$/,
                    message:
                      "Por favor, introduce un número de teléfono válido",
                  },
                })}
                id="mobile"
                type="tel"
                placeholder="(+34 opcional)123456789"
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
                  {(schools ?? [])
                    .filter((school: School) => school.id !== 0)
                    .map((school: School) => {
                      return <option value={school?.id}>{school?.name}</option>;
                    })}
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
                  {(degrees ?? [])
                    .filter((degree: Degree) => degree.id !== 0)
                    .map((degree: Degree) => {
                      return <option value={degree?.id}>{degree?.name}</option>;
                    })}
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
                  {(companies ?? [])
                    .filter((company: Company) => company.companyId !== 0)
                    .map((company: Company) => {
                      return (
                        <option value={company?.companyId}>
                          {company?.companyName}
                        </option>
                      );
                    })}
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
            {errorThrown && (
              <p className="font-bold text-red">
                {" "}
                ❌ ¡Ha ocurrido un error revisa el formulario!
              </p>
            )}
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
