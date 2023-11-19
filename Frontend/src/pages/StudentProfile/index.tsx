import Header from "./components/Header";
import Intership from "./components/Intership";
import indra from "../../assets/img/indra.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Student } from "../../types/types";

export default function Profile() {
  const [student, setStudent] = useState<Student>({} as Student);
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

  const handleNewInterShipOnClick = () => {
    navigate(`/student/${params.studentId}/create-review`, {
      replace: true,
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
        });
      })
      .catch();
  }, []);

  if (isAuthenticated) {
    return (
      <>
        <div className="font-body md:container md:mx-auto">
          <Header
            name={student.name}
            lastName={student.lastName}
            grade="DAM"
            school="IES Francisco de Goya"
            class="2022"
            city="Madrid"
            autonomousCommunity="Comunidad de Madrid"
          />
          <Intership
            company={student?.companyName}
            companyReviewsAmout="20"
            intershipDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias magni atque laborum error, laboriosam eveniet blanditiis officia nostrum tempore repellendus, odio nemo deleniti architecto sequi. Dicta ratione alias voluptatibus veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias magni atque laborum error, laboriosam eveniet blanditiis officia nostrum tempore repellendus, odio nemo deleniti architecto sequi. Dicta ratione alias voluptatibus veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias magni atque laborum error, laboriosam eveniet blanditiis officia nostrum tempore repellendus, odio nemo deleniti architecto sequi. Dicta ratione alias voluptatibus veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias magni atque laborum error, laboriosam eveniet blanditiis officia nostrum tempore repellendus, odio nemo deleniti architecto sequi. Dicta ratione alias voluptatibus veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias magni atque laborum error, laboriosam eveniet blanditiis officia nostrum tempore repellendus, odio nemo deleniti architecto sequi. Dicta ratione alias voluptatibus veniam."
            intershipBest={[
              "Buen tutor",
              "Excelente ambiente de trabajo",
              "100% remoto",
            ]}
            intershipWorst={[
              "Proyectos irrelevantes",
              "Seguimiento pobre",
              "Equipos defectuosos",
            ]}
            technologies={["Spring Boot", "Java", "Postman"]}
            profilePicture={indra}
          />

          <button
            onClick={handleNewInterShipOnClick}
            className=" rounded border-cyan-600 bg-secondary-100 text-white px-14 py-2 font-bold uppercase tracking-[0.5rem] my-5 hover:bg-secondary-200 xl:text-2xl"
          >
            <p>AÑADIR PRÁCTICA</p>
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="font-body md:container md:mx-auto">
          <Header
            name={student?.name}
            lastName={student?.lastName}
            grade="DAM"
            school="IES Francisco de Goya"
            class="2022"
            city="Madrid"
            autonomousCommunity="Comunidad de Madrid"
          />

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
