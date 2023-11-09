import Navbar from "../../components/ui/Navbar";
import Header from "./components/Header";
import Intership from "./components/Intership";
import indra from "../../assets/img/indra.png";
import accenture from "../../assets/img/accenture.png";

export default function Profile() {
  return (
    <>
      <Navbar></Navbar>
      <div className="font-body md:container md:mx-auto">
        <Header
          name="Georges"
          lastName="Madi"
          grade="DAM"
          school="IES Francisco de Goya"
          class="2022"
          city="Madrid"
          autonomousCommunity="Comunidad de Madrid"
        />
        <Intership
          company="Indra"
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
        <Intership
          company="Indra"
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
          profilePicture={accenture}
        />
      </div>
    </>
  );
}
