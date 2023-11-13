import Header from "./components/Header";
import Intership from "./components/Intership";
import indra from "../../assets/img/indra.png";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const [student, setStudent] = useState<any>(null);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/students/${params.studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setStudent(data);
        });
      })
      .catch();
  }, []);

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
        <Intership
          company={student?.companyDTO.name}
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
      </div>
    </>
  );
}
