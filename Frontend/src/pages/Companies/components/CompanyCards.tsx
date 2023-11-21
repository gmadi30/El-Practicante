import Card from "./Card";
import { Company } from "../../../types/types";

type CompanyCardsProps = {
  companies: Company[];
  companySearched: string;
};

const CompanyCards: React.FC<CompanyCardsProps> = (
  props: CompanyCardsProps
) => {
  const { companies } = props;

  let companiesFiltered = companies.filter((company) => {
    return (
      company.companyName
        .toLowerCase()
        .includes(props.companySearched.toLowerCase()) &&
      company.companyId !== 0
    );
  });

  return (
    <section className="px-5 flex flex-col ">
      {companiesFiltered.map((company, index) => {
        return (
          <div>
            <Card
              key={company.companyId.toString()}
              companyName={company.companyName}
              companyReviewsAmout={
                company.intershipsAmount === null
                  ? "0"
                  : company.intershipsAmount.toString()
              }
              city={company.city}
              autonomousCommunity={company.autonomousCommunity}
              companyBest={[
                "Ambiente de trabajo",
                "Dinámica de equipo",
                "Ambiente competitivo",
              ]}
              grades={["DAM", "DAW", "ASIR"]}
              workTypes={["Hibrido", "Remoto"]}
              isEven={index % 2 ? true : false}
              profilePicture={company.companyName}
              companyRating={company.rating}
            />
          </div>
        );
      })}
    </section>
  );
};

export default CompanyCards;
