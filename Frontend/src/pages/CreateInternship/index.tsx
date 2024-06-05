import { FC, useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Company,
  CompanySortBy,
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
import GeneralInfoSection from "./components/GeneralInfoSection";
import BestSection from "./components/BestSection";
import RatingSection from "./components/RatingSection";
import TechnologiesSection from "./components/TechnologiesSection";
import WorstSection from "./components/WorstSection";
import DescriptionSection from "./components/DescriptionSection";

const CreateInternship: FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const methods = useForm();

  const [schools, setSchools] = useState<School[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [errorThrown, setErrorThrown] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsData = await getAllSchools();
        setSchools(schoolsData.schools);

        const companiesData = await getAllCompaniesSortedByFilter(
          CompanySortBy.ALPHABETICALLY
        );
        setCompanies(companiesData.companies);

        const degreesData = await getAllDegrees();
        setDegrees(degreesData.degrees);

        const technologiesData = await getAllTechnologies();
        setTechnologies(technologiesData.technologies);
        console.log("Technologies updated:", companies);

        console.log("ExperienceForm schools: ", schools);
        console.log("ExperienceForm degrees: ", degrees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      if (!studentId) {
        throw new Error(`StudentID is null or undefined: ${studentId}`);
      }

      const createInternshipResponse = await postIntership(data, studentId);
      console.log("CreateInternship response:", createInternshipResponse);

      setTimeout(() => {
        navigate(`/student/${studentId}/profile`, {
          state: { isAuthenticated: true },
          replace: true,
        });
      }, 3000);
    } catch (error) {
      setErrorThrown(true);
      console.error("Error fetching data:", error);
    }
  };

  if (authenticated) {
    return (
      <div className="font-body mx-auto container xl:w-[60%]">
        <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
          <h1 className="text-5xl font-semibold py-4 text-center">
            CREAR PRÁCTICA
          </h1>
        </header>
        <main className="m-3 mt-12">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <GeneralInfoSection
                schools={schools}
                companies={companies}
                degrees={degrees}
              />
              <DescriptionSection></DescriptionSection>
              <RatingSection />
              <TechnologiesSection technologies={technologies} />
              <BestSection />
              <WorstSection />
              {errorThrown && (
                <p className="font-bold text-red-500">
                  ❌ ¡Ha ocurrido un error revisa el formulario!
                </p>
              )}
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-secondary-100 text-primary px-4 py-2 rounded-md text-lg font-semibold transition duration-300 hover:bg-secondary-200"
                >
                  FINALIZAR
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
        <h1 className="text-xl font-semibold border-8 p-10 rounded-3xl">
          Debes iniciar sesión para acceder a esta página
        </h1>
        <Link to="/login" className="text-blue-500 underline">
          Iniciar Sesión
        </Link>
      </div>
    );
  }
};

export default CreateInternship;
