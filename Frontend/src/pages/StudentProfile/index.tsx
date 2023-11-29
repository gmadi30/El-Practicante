import Header from "./components/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentProfile } from "../../types/types";
import InternshipComponent from "./components/InternshipComponent";

export default function Profile() {
  const [student, setStudent] = useState<StudentProfile>({} as StudentProfile);
  const [loading, setLoading] = useState(true);
  let location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  let isAuthenticated = false;

  console.log({
    path: location.pathname,
    state: location.state,
  });

  if (location.state !== null) {
    isAuthenticated = location.state.isAuthenticated;
  }

  const handleNewIntershipOnClick = () => {
    navigate(`/student/${params.studentId}/create-review`, {
      state: { studentId: params.studentId },
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/students/${params.studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          console.log("Estudiante recuperado", data);
          setStudent(data);
          console.log("Objeto estudiante", student);
        });
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated) {
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
  } else {
    return (
      <>
        <div className="font-body md:container md:mx-auto">
          <Header student={student} />

          <h1>Oooops... No puedes ver la review de este practicante</h1>
          <h1>Inicia sesión para acceder a todo el contenido</h1>
          <Link to="/login">
            <button className=" rounded border-cyan-600 bg-secondary-100 text-white px-14 py-2 font-bold uppercase tracking-[0.5rem] my-5 hover:bg-secondary-200 xl:text-2xl">
              <p>Iniciar sesión</p>
            </button>
          </Link>
        </div>
      </>
    );
  }
}
