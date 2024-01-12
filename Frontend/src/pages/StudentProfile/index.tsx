import Header from "./components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentProfile } from "../../types/types";
import InternshipComponent from "./components/InternshipComponent";
import { useAuth } from "../../components/context/AuthContext";

export default function Profile() {
  const [student, setStudent] = useState<StudentProfile>({} as StudentProfile);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth(); // Use the useAuth hook

  const handleNewIntershipOnClick = () => {
    navigate(`/student/${params.studentId}/create-review`, {
      state: { studentId: params.studentId },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await fetch(
          `http://localhost:8080/api/v1/students/${params.studentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json;",
            },
          }
        );
        if (!studentResponse.ok) {
          throw new Error(`HTTP error! Status: ${studentResponse.status}`);
        }
        const data = await studentResponse.json();
        setStudent(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (isLoggedIn) {
    return (
      <>
        <div className="font-body md:container md:mx-auto">
          <Header student={student} />

          {student?.internships?.map((internship, index) => {
            console.log("Intership enviada al componente", internship);
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
  }
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
