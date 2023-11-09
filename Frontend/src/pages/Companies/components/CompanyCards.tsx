import Card from "./Card";
import indra from "../../../assets/img/indra.png";
import me from "../../../assets/img/accenture.png";

const CompanyCards = () => {
  return (
    <section className="px-5 flex flex-col ">
      <Card
        companyName="Indra"
        companyReviewsAmout="20"
        city="Madrid"
        autonomousCommunity="Comunidad de Madrid"
        companyBest={[
          "Ambiente de trabajo",
          "Dinámica de equipo",
          "Ambiente competitivo",
        ]}
        grades={["DAM", "DAW", "ASIR"]}
        workTypes={["Hibrido", "Remoto"]}
        isEven={true}
        profilePicture={indra}
      />

      <Card
        companyName="Accenture"
        companyReviewsAmout="20"
        city="Madrid"
        autonomousCommunity="Comunidad de Madrid"
        companyBest={[
          "Ambiente de trabajo",
          "Dinámica de equipo",
          "Ambiente competitivo",
        ]}
        grades={["DAM", "DAW", "ASIR"]}
        workTypes={["Hibrido", "Remoto"]}
        isEven={false}
        profilePicture={me}
      />
    </section>
  );
};

export default CompanyCards;
