import { DevTool } from "@hookform/devtools";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Company,
  CompanySortBy,
  CreateIntershipFromValues,
  Degree,
  School,
  Technology,
} from "../../types/types";
import { useAuth } from "../../components/context/AuthContext";
import {
  getAllCompaniesSortedByFilter,
  getAllDegrees,
  getAllSchools,
  getAllTechnologies,
  postIntership,
} from "../../api/api";

export default function CreateInternship() {
  let navigate = useNavigate();
  const { watch, control, register, handleSubmit, formState, setError } =
    useForm<CreateIntershipFromValues>();
  const { errors } = formState;
  const { studentId } = useParams();
  const { authenticated } = useAuth();

  const [schools, setSchools] = useState<School[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isInternshipCreated, setIsInternshipCreated] = useState(false);
  const [errorThrown, setErrorThrown] = useState(false);
  const [validateDateDifferenceMessage, setValidateDateDifferenceMessage] =
    useState(false);

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const selectedTechnologies = watch([
    "technology1",
    "technology2",
    "technology3",
  ]);

  const isUnique = (arr: string[]) => {
    console.log("array de tecnologías", arr);
    if (arr[1] === "" && arr[2] === "") {
      return true;
    }
    return new Set(arr).size === arr.length;
  };

  useEffect(() => {
    const validateDateDifference = () => {
      if (startDate && endDate) {
        const differenceInTime =
          new Date(endDate).getTime() - new Date(startDate).getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if (differenceInDays <= 50) {
          setValidateDateDifferenceMessage(true);
        } else {
          setValidateDateDifferenceMessage(false);
        }
      }
    };

    validateDateDifference(); // Call the function when the component mounts and whenever startDate or endDate changes
  }, [startDate, endDate]); // Add dependencies to the useEffect hook

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

        const data = await getAllTechnologies();
        setTechnologies(data.technologies);
        console.log("Technologies updated:", companies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addInternship = async (data: CreateIntershipFromValues) => {
    console.log("Data collected to save in the DB" + data);

    try {
      if (!studentId) {
        throw new Error(`StudentID is null or undefined: ${studentId}`);
      }

      const createInternshipResponse = await postIntership(data, studentId);
      console.log("CreateInternship response:", createInternshipResponse);

      setIsInternshipCreated(true);
      setTimeout(() => {
        navigate(`/student/${studentId}/profile`, {
          state: { isAuthenticated: "true" },
          replace: true,
        });
      }, 3000);
    } catch (error) {
      setErrorThrown(true);
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit: SubmitHandler<CreateIntershipFromValues> = (
    data: CreateIntershipFromValues
  ) => {
    console.log("Formulario", data);
    addInternship(data);
  };

  if (authenticated) {
    console.log(authenticated);
    return (
      <div className="font-body mx-auto container  xl:w-[60%]">
        <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
          <h1 className="text-5xl font-semibold py-4 text-center">
            CREAR PRÁCTICA
          </h1>
        </header>

        <main className="m-3 mt-12 ">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <section className="my-10">
              <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                DATOS GENERALES
              </h1>
              <p className="my-2  xl:text-xl">
                ¿Ya acabaste tus prácticas? ¿Donde las hicistes? Cuentanos
                todo...
              </p>

              <div className="flex flex-col  gap-4  ">
                <div className="flex flex-col md:flex-row">
                  <label className="flex-grow">
                    <h1 className="text-secondary-100 my-2 font-bold">
                      Centro de educación
                    </h1>
                    <select
                      className=" 
                    border rounded py-2
                    pl-2 w-3/4 text-black
                     focus:focus:border-secondary-100"
                      {...register("schoolId", {
                        required: {
                          value: true,
                          message: "Este campo es obligatorio",
                        },
                      })}
                      id="school"
                    >
                      <option value="">
                        Selecciona un Centro de Educación
                      </option>
                      {(schools ?? [])
                        .filter((school: School) => school.id !== 0)
                        .map((school: School) => {
                          return (
                            <option value={school?.id}>{school?.name}</option>
                          );
                        })}
                    </select>
                    <p className="text-base font-light text-red">
                      {errors.schoolId?.message}
                    </p>
                  </label>
                  <label className="flex-grow">
                    <h1 className="text-secondary-100 my-2 font-bold">
                      Empresa
                    </h1>
                    <select
                      className=" 
                    border rounded py-2
                    pl-2  w-3/4 text-black
                     focus:focus:border-secondary-100"
                      {...register("companyId", {
                        required: {
                          value: true,
                          message: "Este campo es obligatorio",
                        },
                      })}
                      id="company"
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
                    <p className="text-base font-light text-red">
                      {errors.companyId?.message}
                    </p>
                  </label>
                </div>
                <div className="flex flex-col ">
                  <label className="md:w-1/2">
                    <div className="">
                      <h1 className="text-secondary-100 my-2 font-bold">
                        Grado profesional
                      </h1>
                      <select
                        {...register("degreeId", {
                          required: {
                            value: true,
                            message: "Este campo es obligatorio",
                          },
                        })}
                        className="border rounded py-2
                      pl-2 w-3/4  text-black
                       focus:focus:border-secondary-100"
                        id="degreeId"
                      >
                        <option value="" className="">
                          Selecciona un Grado
                        </option>
                        {(degrees ?? [])
                          .filter((degree: Degree) => degree.id !== 0)
                          .map((degree: Degree) => {
                            return (
                              <option value={degree?.id}>{degree?.name}</option>
                            );
                          })}
                      </select>
                    </div>
                    <p className="text-base font-light text-red">
                      {errors.degreeId?.message}
                    </p>
                  </label>
                </div>
                <div className="md:flex">
                  <label className="font-bold">
                    <h1 className="text-secondary-100 my-2">Fecha inicio</h1>
                    <input
                      {...register("startDate", {
                        required: {
                          value: true,
                          message: "Este campo es obligatorio",
                        },
                      })}
                      id="startDate"
                      type="date"
                      className="
          border
          focus:outline-none
          focus:border-secondary-100
          w-3/4
          md:w-fit
          py-2
          pl-2
          rounded
          font-normal"
                    />
                    <p className="text-base font-light text-red">
                      {errors.startDate?.message}
                    </p>
                  </label>

                  <label className="md:ml-10 font-bold">
                    <h1 className="text-secondary-100 my-2">Fecha fin</h1>
                    <input
                      {...register("endDate", {
                        required: {
                          value: true,
                          message: "Este campo es obligatorio",
                        },
                      })}
                      id="endDate"
                      type="date"
                      className="
          border
          focus:outline-none
          focus:border-secondary-100
          w-3/4
          md:w-fit
          py-2
          pl-2
          rounded
          font-normal"
                      disabled={startDate ? false : true}
                    />
                    <p className="text-base font-light text-red">
                      {errors.endDate?.message}
                    </p>
                  </label>
                </div>
              </div>
              <p className="text-base font-light text-red">
                {validateDateDifferenceMessage &&
                  "La fecha de fin no puede ser inferior a la fecha de inicio. Mínimo 50 días."}
              </p>
            </section>
            <section className="my-10">
              <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                DESCRIPCIÓN PRINCIPAL
              </h1>

              <p className="my-2  xl:text-xl">
                En esta sección comparte de forma general tús prácticas
              </p>
              <label className="font-bold">
                <h1 className="text-secondary-100 my-2">Titulo</h1>
                <input
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                  id="title"
                  type="text"
                  placeholder="Prácticas inolvidables"
                  className="
                          border
                          focus:outline-none
                          focus:border-secondary-100
                          w-3/4
                          py-2
                          pl-2
                          rounded
                          font-normal
                          my-1"
                />
                <p className="text-base font-light text-red">
                  {errors.best1?.message}
                </p>
              </label>
              <label>
                <h1 className="text-secondary-100 my-2 font-bold">
                  Descripción
                </h1>
                <textarea
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                  placeholder="He realizado mis prácticas en Indra y no puedo estar más contento de lo que he aprendido..."
                  rows={6}
                  className=" resize-none border focus:outline-none focus:border-secondary-100
                w-3/4  py-2 pl-2 rounded font-normal"
                ></textarea>
                <p className="text-base font-light text-red">
                  {errors.description?.message}
                </p>
              </label>
              <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                RATE IT!
              </h1>
              <p className="my-2  xl:text-xl">
                Califica tus prácticas del 1 a 5 (El 0 también es una opción 👀)
              </p>
              <label className="flex-grow">
                <h1 className="text-secondary-100 my-2 font-bold">
                  Calificación
                </h1>
                <select
                  className=" 
                    border rounded py-2
                    pl-2 w-fit text-black
                     focus:focus:border-secondary-100"
                  {...register("rating", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                  name="rating"
                  id="rating"
                >
                  <option value="">selecciona</option>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <p className="text-base font-light text-red">
                  {errors.rating?.message}
                </p>
              </label>
            </section>
            <section className="my-5 md">
              <h1 className="text-xl xl:text-2xl font-bold max-w-xs  mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                TECNOLOGÍAS
              </h1>
              <h2 className="xl:text-xl">¿Qué tecnologías utilizastes?</h2>
              <h3 className="text-gray xl:text-xl my-1">
                Es obligatorio completar al menos 1 opción
              </h3>
              {!isUnique(selectedTechnologies) && (
                <p className="text-base font-light text-red">
                  Las tecnologías no se pueden repetir.
                </p>
              )}

              <div className="flex flex-col gap-4">
                <label className="">
                  <h1 className="text-secondary-100 my-2 font-bold">
                    Opción 1
                  </h1>
                  <select
                    className=" 
                    border rounded py-2
                    pl-2  w-3/4 text-black
                     focus:focus:border-secondary-100"
                    {...register("technology1", {
                      required: {
                        value: true,
                        message: "Este campo es obligatorio",
                      },
                    })}
                    id="technology1"
                  >
                    <option value="">Selecciona una tecnología</option>
                    {(technologies ?? []).map((technology: Technology) => {
                      return (
                        <option value={technology?.id}>
                          {technology?.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-base font-light text-red">
                    {errors.technology1?.message}
                  </p>
                </label>
                <label className="">
                  <h1 className="text-secondary-100 my-2 font-bold">
                    Opción 2
                  </h1>
                  <select
                    className=" 
                    border rounded py-2
                    pl-2  w-3/4 text-black
                     focus:focus:border-secondary-100"
                    {...register("technology2", {
                      validate: () => {
                        if (!isUnique(selectedTechnologies)) {
                          return "Hay una tecnología repetida.";
                        }
                      },
                    })}
                    id="technology2"
                  >
                    <option value="">Selecciona una tecnología</option>
                    {(technologies ?? []).map((technology: Technology) => {
                      return (
                        <option value={technology?.id}>
                          {technology?.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className="">
                  <h1 className="text-secondary-100 my-2 font-bold">
                    Opción 3
                  </h1>
                  <select
                    className=" 
                    border rounded py-2
                    pl-2  w-3/4 text-black
                     focus:focus:border-secondary-100"
                    {...register("technology3", {
                      validate: () => {
                        if (!isUnique(selectedTechnologies)) {
                          return "Hay una tecnología repetida.";
                        }
                      },
                    })}
                    id="technology3"
                  >
                    <option value="">Selecciona una tecnología</option>
                    {(technologies ?? []).map((technology: Technology) => {
                      return (
                        <option value={technology?.id}>
                          {technology?.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
            </section>
            <section className="my-10">
              <h1 className="text-xl xl:text-2xl font-bold max-w-xs px-1 mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                LO MEJOR
              </h1>
              <h2 className="xl:text-xl">
                ¿Qué ha sido lo mejor de tus prácticas?
              </h2>
              <h3 className="text-gray  xl:text-xl text-sm my-1">
                Es obligatorio completar al menos 1 opción
              </h3>
              <div className="flex flex-col gap-4">
                <label className="font-bold">
                  <h1 className="text-secondary-100 my-2">Opción 1</h1>
                  <input
                    {...register("best1", {
                      required: {
                        value: true,
                        message: "Este campo es obligatorio",
                      },
                    })}
                    id="best1"
                    type="text"
                    placeholder="El ambiente de trabajo"
                    className="
                          border
                          focus:outline-none
                          focus:border-secondary-100
                          w-3/4
                          py-2
                          pl-2
                          rounded
                          font-normal"
                  />
                  <p className="text-base font-light text-red">
                    {errors.best1?.message}
                  </p>
                </label>
                <label className="font-bold">
                  {" "}
                  <h1 className="text-secondary-100 my-2">Opción 2</h1>
                  <input
                    {...register("best2")}
                    id="best2"
                    type="text"
                    placeholder="100% remoto"
                    className="
          border
          focus:outline-none
          focus:border-secondary-100
          w-3/4
          py-2
          pl-2
          rounded
          font-normal"
                  />
                </label>
                <label className="font-bold">
                  <h1 className="text-secondary-100 my-2">Opción 3</h1>
                  <input
                    {...register("best3")}
                    id="best3"
                    type="text"
                    placeholder="Los compañeros"
                    className="
          border
          focus:outline-none
          focus:border-secondary-100
          w-3/4
          py-2
          pl-2
          rounded
          font-normal"
                  />
                </label>
              </div>
            </section>
            <section className="my-10">
              <h1 className="text-xl xl:text-2xl font-bold max-w-xs pb-1 mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                LO PEOR
              </h1>
              <h2 className="xl:text-xl">
                ¿Qué ha sido lo peor de tus prácticas?
              </h2>
              <h3 className="text-gray  xl:text-xl text-sm my-1">
                Es obligatorio completar al menos 1 opción
              </h3>
              <div className="flex flex-col gap-4">
                <label className="font-bold">
                  {" "}
                  <h1 className="text-secondary-100 my-2">Opción 1</h1>
                  <input
                    {...register("worst1", {
                      required: {
                        value: true,
                        message: "Este campo es obligatorio",
                      },
                    })}
                    id="worst1"
                    type="text"
                    placeholder="El ordenador, poca calidad"
                    className="
          border
          focus:outline-none
          focus:border-secondary-100
          w-3/4
          py-2
          pl-2
          rounded
          font-normal"
                  />
                  <p className="text-base font-light text-red">
                    {errors.worst1?.message}
                  </p>
                </label>
                <label className="font-bold">
                  {" "}
                  <h1 className="text-secondary-100 my-2">Opción 2</h1>
                  <input
                    {...register("worst2")}
                    id="worst2"
                    type="text"
                    placeholder="El tutor no muy bueno"
                    className="
          border
          focus:outline-none
          focus:border-secondary-100
          w-3/4
          py-2
          pl-2
          rounded
          font-normal"
                  />
                </label>
                <label className="font-bold">
                  {" "}
                  <h1 className="text-secondary-100 my-2">Opción 3</h1>
                  <input
                    {...register("worst3")}
                    id="worst3"
                    type="text"
                    placeholder="Proyecto poco interesante"
                    className="
          border
          focus:outline-none
          focus:border-secondary-100
          w-3/4
          py-2
          pl-2
          rounded
          font-normal"
                  />
                </label>
              </div>
              <h1 className="my-10 text-2xl font-semibold">
                ¡PRACTICANTE! Revisa antes de enviar el formulario...{" "}
              </h1>
            </section>
            {errorThrown && (
              <p className="font-bold text-red">
                {" "}
                ❌ ¡Ha ocurrido un error revisa el formulario!
              </p>
            )}
            <div className="xl:flex ">
              <button
                type="submit"
                className="container mx-auto rounded max-w-sm xl:text-2xl text-xl border-cyan-600 bg-secondary-100 text-white py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
              >
                FINALIZAR
              </button>
            </div>
          </form>
          <DevTool control={control} />
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center mt-20 text-center">
        <h1 className="text-xl font-semibold border-8 p-10 rounded-3xl  border-red mx-10">
          No puedes acceder a esta URL
        </h1>
        <h1 className="mt-10 text-xl">
          Inicia sesión para acceder a todo el contenido
        </h1>
        <div>
          <div>
            <Link to="/login">
              <button className="rounded border-cyan-600 bg-secondary-100 text-white px-14 py-2 font-bold uppercase tracking-[0.5rem] my-5 hover:bg-secondary-200 xl:text-2xl w-full ">
                <p>Iniciar sesión</p>
              </button>
            </Link>
          </div>
          <p className="">
            ¿Todavía no tienes una cuenta?{" "}
            <Link to="/register">
              <span className="font-bold text-secondary-100 hover:underline">
                Createla aquí{" "}
              </span>
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
