import Header from "./components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentProfile } from "../../types/types";
import InternshipComponent from "./components/InternshipComponent";
import { getStudentById } from "../../api/api";
import { useAuth } from "../../components/context/AuthContext";
import Loading from "../../components/ui/shared/Loading";

export default function Profile() {
  const [student, setStudent] = useState<StudentProfile>({} as StudentProfile);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { authenticated, studentId } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.studentId !== undefined) {
          console.log("params.studentId ", params.studentId);
          console.log("studentId ", studentId);
          const data = await getStudentById(params.studentId);
          setStudent(data);

          console.log("Student ", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.studentId]);

  if (loading) {
    return <Loading></Loading>;
  }

  const handleNewIntershipOnClick = () => {
    navigate(`/student/${params.studentId}/create-internship`, {
      state: { studentId: params.studentId },
    });
  };

  if (authenticated && studentId.toString() == params.studentId) {
    console.log("Valor authenticated mi perfil: ", authenticated);

    return (
      <>
        <div className="font-body md:container md:mx-auto">
          <Header student={student} />
          <h1 className="text-xl font-bold  pb-1 py-1 mb-10 rounded indent-4 text-secondary-100 bg-primary uppercase ">
            Mis prácticas
          </h1>
          {student?.internships?.map((internship, index) => {
            return <InternshipComponent key={index} internship={internship} />;
          })}
          <div className="flex justify-center">
            <button
              onClick={handleNewIntershipOnClick}
              className="container w-fit  rounded border-cyan-600 bg-secondary-100 text-white px-5 py-2 font-bold uppercase tracking-[0.1rem] my-5 hover:bg-secondary-200 xl:text-2xl"
            >
              <p>AÑADIR PRÁCTICA</p>
            </button>
          </div>
        </div>
      </>
    );
  } else if (authenticated && studentId.toString() !== params.studentId) {
    console.log("Valor de authenticated no mi perfil: ", authenticated);

    return (
      <>
        <div className="font-body md:container md:mx-auto">
          <Header student={student} />
          {student?.internships?.map((internship, index) => {
            return <InternshipComponent key={index} internship={internship} />;
          })}
        </div>
      </>
    );
  } else {
    console.log("Valor de authenticated no Autenticado: ", authenticated);
    return (
      <>
        <div className="font-body md:container md:mx-auto ">
          <Header student={student} />

          <div className="flex flex-col items-center mt-20 text-center">
            <h1 className="text-xl font-semibold border-8 p-10 rounded-3xl  border-red mx-10">
              No puedes ver las reviews de este practicante
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
        </div>
      </>
    );
  }
}
