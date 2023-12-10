import Card from "./Card";

const Cards = () => {
  return (
    <section className="my-20 xl:grid xl:grid-cols-3">
      <Card
        name="Tulio"
        lastName="Madi"
        school="IES Francisco de Goya"
        grade="DAM"
        websiteThoughts="
        Durante mis prácticas FCT, El Practicante fue esencial. La plataforma guió mi elección de empresa de manera efectiva, brindándome orientación valiosa para una decisión informada en mi trayectoria profesional."
        middle={false}
      ></Card>
      <Card
        name="Gonzalo"
        lastName="Ramiro"
        school="IES Francisco de Goya"
        grade="DAM"
        websiteThoughts="Mi experiencia en las prácticas FCT se enriqueció con El Practicante. Compartí mi vivencia en la web, aprovechando sus recursos para decisiones acertadas en la elección de la empresa. La plataforma fue esencial, guiándome efectivamente y contribuyendo a mi desarrollo profesional."
        middle={true}
      ></Card>
      <Card
        name="Cristian"
        lastName="Sánchez"
        school="IES Francisco de Goya"
        grade="DAM"
        websiteThoughts="
        Compartir mi experiencia no solo me permitió reflexionar sobre mi crecimiento, sino también ofrecer orientación y apoyo a otros estudiantes en la elección de prácticas FCT. La satisfacción de ser útil a otros hizo que compartir en la plataforma fuera significativo, enriqueciendo la comunidad estudiantil y fomentando la colaboración entre compañeros."
        middle={false}
      ></Card>
    </section>
  );
};

export default Cards;
