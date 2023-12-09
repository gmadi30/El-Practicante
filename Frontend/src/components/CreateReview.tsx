import { DevTool } from "@hookform/devtools";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SuccesfulResponse from "./ui/SuccesfulResponse";
import { useEffect, useState } from "react";
import { Company, Degree, School } from "../types/types";

type FormValues = {
  schoolId: string;
  companyId: string;
  degreeId: string;
  startDate: string;
  endDate: string;
  description: string;
  rating: string;
  technology1: string;
  technology2: string;
  technology3: string;
  best1: string;
  best2: string;
  best3: string;
  worst1: string;
  worst2: string;
  worst3: string;
};

export default function CreateReview() {
  let navigate = useNavigate();
  const { control, register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const params = useParams();
  let location = useLocation();

  const [schools, setSchools] = useState<School[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [isInternshipCreated, setIsInternshipCreated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsResponse = await fetch(
          "http://localhost:8080/api/v1/schools",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!schoolsResponse.ok) {
          throw new Error(`HTTP error! Status: ${schoolsResponse.status}`);
        }

        const data = await schoolsResponse.json();
        console.log("Schools received:", data);
        setSchools(data.schools);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const companyResponse = await fetch(
          "http://localhost:8080/api/v1/companies?sortBy=alphabetically",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!companyResponse.ok) {
          throw new Error(`HTTP error! Status: ${companyResponse.status}`);
        }

        const data = await companyResponse.json();
        console.log("Companies received:", data);
        setCompanies(data.companies);
        console.log("Companies updated:", companies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const degreeResponse = await fetch(
          "http://localhost:8080/api/v1/degrees",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!degreeResponse.ok) {
          throw new Error(`HTTP error! Status: ${degreeResponse.status}`);
        }

        const data = await degreeResponse.json();
        console.log("Degrees received:", data);
        setDegrees(data.degrees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log({
    param: params,
    path: location.pathname,
    state: location.state,
  });

  const addInternship = async (data: FormValues) => {
    console.log(
      "Este es el valor del studentId en el create rewview " +
        location.state.studentId
    );
    console.log("Valores a guardar en la Base de datos" + data);
    await fetch(`http://localhost:8080/api/v1/internships`, {
      method: "POST",
      body: JSON.stringify({
        schoolId: data.schoolId,
        companyId: data.companyId,
        degreeId: data.degreeId,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        rating: data.rating,
        technologies: [data.technology1, data.technology2, data.technology3],
        summaryBest: [data.best1, data.best2, data.best3],
        summaryWorst: [data.worst1, data.worst2, data.worst3],
        studentId: params.studentId,
      }),
      headers: {
        "Content-Type": "application/json;",
      },
    })
      .then((response) => {
        if (response.status == 201) {
          setIsInternshipCreated(true);
          setTimeout(() => {
            navigate(`/student/${params.studentId}/profile`, {
              state: { isAuthenticated: "true" },
              replace: true,
            });
          }, 3000);
        }
      })
      .catch((error: Error) => console.log("Este es el error: " + error));
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log("Formulario", data);
    addInternship(data);
  };

  if (!isInternshipCreated) {
    return (
      <div className="font-body mx-auto container  xl:w-[60%]">
        <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
          <h1 className="text-5xl font-semibold py-4 text-center">REVIEW</h1>
        </header>

        <main className="m-3 mt-12 ">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <section className="my-10">
              <h1 className="text-xl xl:text-2xl text-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase ">
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

                  <label className="md:ml-10 flex-shrink">
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
                      {...register("startDate")}
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
                      {...register("endDate")}
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
                    />
                    <p className="text-base font-light text-red">
                      {errors.endDate?.message}
                    </p>
                  </label>
                </div>
              </div>
            </section>
            <section className="my-10">
              <h1 className="text-xl xl:text-2xl text-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                DESCRIPCIÓN PRINCIPAL
              </h1>

              <p className="my-2  xl:text-xl">
                En esta sección comparte de forma general tús prácticas
              </p>
              <label>
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
              <h1 className="text-xl xl:text-2xl text-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase ">
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
              <h1 className="text-xl xl:text-2xl text-bold max-w-xs  mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                TECNOLOGÍAS
              </h1>
              <h2 className="xl:text-xl">¿Qué tecnologías utilizastes?</h2>
              <h3 className="text-gray xl:text-xl my-1">
                Es obligatorio rellenar al menos 1 opción
              </h3>
              <div className="flex flex-col gap-4">
                <label className="font-bold">
                  <h1 className="text-secondary-100 my-2">Opción 1</h1>
                  <input
                    {...register("technology1", {
                      required: {
                        value: true,
                        message: "Este campo es obligatorio",
                      },
                    })}
                    id="technology1"
                    type="text"
                    placeholder="Spring Boot"
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
                    {errors.technology1?.message}
                  </p>
                </label>
                <label className=" font-bold">
                  <h1 className="text-secondary-100 my-2">Opción 2</h1>
                  <input
                    {...register("technology2")}
                    id="technology2"
                    type="text"
                    placeholder="Postman"
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
                    {...register("technology3")}
                    id="technology3"
                    type="text"
                    placeholder="Java"
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
              <h1 className="text-xl xl:text-2xl text-bold max-w-xs px-1 mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                LO MEJOR
              </h1>
              <h2 className="xl:text-xl">
                ¿Qué ha sido lo mejor de tus prácticas?
              </h2>
              <h3 className="text-gray  xl:text-xl text-sm my-1">
                Es obligatorio rellenar al menos 1 opción
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
              <h1 className="text-xl xl:text-2xl text-bold max-w-xs pb-1 mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                LO PEOR
              </h1>
              <h2 className="xl:text-xl">
                ¿Qué ha sido lo peor de tus prácticas?
              </h2>
              <h3 className="text-gray  xl:text-xl text-sm my-1">
                Es obligatorio rellenar al menos 1 opción
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
      <SuccesfulResponse message="¡Práctica creada con éxito!"></SuccesfulResponse>
    );
  }
}
