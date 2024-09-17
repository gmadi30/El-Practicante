import { DevTool } from "@hookform/devtools";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Company,
  CompanySortBy,
  CreateIntershipFromValues,
  Degree,
  School,
  Technology,
  Internship,
  Summary,
  StudentProfile,
} from "../../types/types";
import { useAuth } from "../../components/context/AuthContext";
import {
  getAllCompaniesSortedByFilter,
  getAllDegrees,
  getAllSchools,
  getAllTechnologies,
  getInternshipById,
  updateIntership,
} from "../../api/api";
import GeneralInfoSection from "./components/GeneralInfoSection";
import DescriptionSection from "./components/DescriptionSection";
import RatingSection from "./components/RatingSection";
import TechnologiesSection from "./components/TechnologiesSection";

export default function EditInternship() {
  let navigate = useNavigate();
  const methods = useForm<CreateIntershipFromValues>();
  const { errors } = methods.formState;
  const { studentId, internshipId } = useParams();
  const { authenticated } = useAuth();

  const [loading, isLoading] = useState(true);
  const [student, setStudent] = useState<StudentProfile>({} as StudentProfile);
  const [schools, setSchools] = useState<School[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [internship, setIntership] = useState<Internship | null>(null);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isInternshipUpdated, setIsInternshipUpdated] = useState(false);
  const [isEmptyTechnologyList, setIsEmptyTechnologyList] = useState(false);
  const [errorThrown, setErrorThrown] = useState(false);
  const [validateDateDifferenceMessage, setValidateDateDifferenceMessage] =
    useState(false);

  const startDate = methods.watch("startDate");
  const endDate = methods.watch("endDate");

  useEffect(() => {
    if (internship !== null) {
      methods.setValue("startDate", internship.startDate);
      methods.setValue("endDate", internship.endDate);
      internship.title != "" && methods.setValue("title", internship?.title);
      methods.setValue("description", internship.description);
      methods.setValue("rating", internship.rating?.toString());

      devideSummarizeArray(internship.summarizeList);
    }
  }, [internship]);

  const devideSummarizeArray = (summarizeList: Summary[]) => {
    const bestArray = summarizeList.filter(
      (summarize) => summarize.type === "BEST"
    );

    const worsttArray = summarizeList.filter(
      (summarize) => summarize.type === "WORST"
    );

    bestArray[0].name != "" && methods.setValue("best1", bestArray[0].name);
    bestArray[1]?.name != "" && methods.setValue("best2", bestArray[1]?.name);
    bestArray[2]?.name != "" && methods.setValue("best3", bestArray[2]?.name);

    worsttArray[0].name != "" &&
      methods.setValue("worst1", worsttArray[0].name);
    worsttArray[1]?.name != "" &&
      methods.setValue("worst2", worsttArray[1]?.name);
    worsttArray[2]?.name != "" &&
      methods.setValue("worst3", worsttArray[2]?.name);
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
        if (!internshipId) {
          throw new Error(`internshipId is null or undefined: ${studentId}`);
        }
        const internshipData = await getInternshipById(internshipId);
        if (!internshipData) {
          throw new Error(
            `internshipData is null or undefined: ${internshipData}`
          );
        }
        setIntership(internshipData.internship);
        console.log("Internship updated:", internship);

        const schoolsData = await getAllSchools();
        setSchools(schoolsData.schools);
        console.log("Schools updated:", schools);

        const companiesData = await getAllCompaniesSortedByFilter(
          CompanySortBy.ALPHABETICALLY
        );
        setCompanies(companiesData.companies);
        console.log("Companies updated:", companies);

        const degreesData = await getAllDegrees();
        setDegrees(degreesData.degrees);
        console.log("Degrees updated:", degrees);

        const technologiesData = await getAllTechnologies();
        setTechnologies(technologiesData.technologies);
        console.log("Technologies updated:", technologiesData);

        isLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        isLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (internship !== null) {
      methods.setValue("startDate", internship.startDate);
      methods.setValue("endDate", internship.endDate);
      internship.title != "" && methods.setValue("title", internship?.title);
      methods.setValue("description", internship.description);
      methods.setValue("rating", internship.rating?.toString());

      devideSummarizeArray(internship.summarizeList);
    }
  }, [internship]);

  const updateInternship = async (data: CreateIntershipFromValues) => {
    console.log("Data collected to save in the DB");

    if (null != internship && data.selectedTechnologies.length === 0) {
      console.log(
        "EditIntership - index.tsx - No Technology error" +
          internship.technologyList
      );
      setIsEmptyTechnologyList(true);
      return; // Prevent form submission if no technology is selected
    } else {
      console.log(
        "EditIntership - index.tsx - Technology list is not emptyh" + data
      );
      setIsEmptyTechnologyList(false);
    }

    try {
      if (!studentId) {
        throw new Error(`StudentID is null or undefined: ${studentId}`);
      }

      if (!internshipId) {
        throw new Error(`InternshipId is null or undefined: ${internshipId}`);
      }

      data.isAnonymous === null
        ? (data.isAnonymous = false)
        : (data.isAnonymous = true);

      console.log("EditIntership body:", data);

      const updateInternshipResponse = await updateIntership(
        data,
        studentId,
        internshipId
      );
      console.log("EditIntership response:", updateInternshipResponse);

      setIsInternshipUpdated(true);
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
    updateInternship(data);
  };

  if (!loading) {
    if (authenticated) {
      return (
        <div className="font-body mx-auto container  xl:w-[60%]">
          <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
            <h1 className="text-5xl font-semibold py-4 text-center">
              EDITAR PRÁCTICA
            </h1>
          </header>

          <main className="m-3 mt-12 ">
            <FormProvider {...methods}>
              <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                <GeneralInfoSection
                  schools={schools}
                  companies={companies}
                  degrees={degrees}
                  internship={internship}
                />
                <DescriptionSection internship={internship} />
                <RatingSection />
                <TechnologiesSection
                  availableTechnologies={technologies}
                  internshipTechnologies={
                    internship && internship !== undefined
                      ? internship.technologyList
                      : []
                  }
                  register={methods.register}
                  isEmptyTechnologyList={isEmptyTechnologyList}
                />

                <section className="my-10">
                  <h1 className="text-xl xl:text-2xl font-bold max-w-xs px-1 mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                    LO MEJOR
                  </h1>
                  <h2 className="xl:text-xl">
                    ¿Qué ha sido lo mejor de tus prácticas?
                  </h2>
                  <h3 className="text-gray  xl:text-xl text-sm my-1">
                    Es obligatorio añadir al menos 1 comentario{" "}
                  </h3>
                  <div className="flex flex-col gap-4">
                    <label className="font-bold">
                      <h1 className="text-secondary-100 my-2">Opción 1</h1>
                      <input
                        {...methods.register("best1", {
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
                        {...methods.register("best2")}
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
                        {...methods.register("best3")}
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
                    Es obligatorio añadir al menos 1 comentario
                  </h3>
                  <div className="flex flex-col gap-4">
                    <label className="font-bold">
                      {" "}
                      <h1 className="text-secondary-100 my-2">Opción 1</h1>
                      <input
                        {...methods.register("worst1", {
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
                        {...methods.register("worst2")}
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
                        {...methods.register("worst3")}
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
                <div className="flex flex-col max-w-sm  mx-auto container">
                  <button
                    type="submit"
                    className="rounded xl:text-2xl text-xl border-cyan-600 bg-secondary-100 text-white py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
                  >
                    EDITAR
                  </button>

                  <button className="md:text-xl rounded border-cyan-600 bg-red text-white  py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-darkred">
                    <Link to={``}>BORRAR CUENTA</Link>
                  </button>
                </div>
              </form>
              <DevTool control={methods.control} />
            </FormProvider>
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
  } else {
    {
      ("Data is loading");
    }
  }
}
