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

  const companySearchedToLowerCase = props.companySearched.toLowerCase();
  let companiesFiltered = companies?.filter((company) => {
    return (
      company.companyName.toLowerCase().includes(companySearchedToLowerCase) &&
      company.companyId !== 0
    );
  });

  return (
    <section className="flex flex-col ">
      {companiesFiltered?.map((company, index) => {
        return (
          <div>
            <Card
              key={company.companyId.toString()}
              companyId={company.companyId}
              companyName={company.companyName}
              companyReviewsAmount={
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
