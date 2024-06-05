import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CompanyResponse } from "../../types/types";
import Header from "./components/HeaderSection";
import ContactSection from "./components/ContactSection";
import DescriptionSection from "./components/DescriptionSection";
import InternshipSection from "./components/InternshipSection";

export default function CompanyProfile() {
  const [companyResponse, setCompanyResponse] = useState<CompanyResponse>(
    {} as CompanyResponse
  );
  const [loading, setLoading] = useState(true);
  let params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/companies/${params.companyId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json;",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Company received:", data);
        setCompanyResponse(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.companyId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="font-body container mx-auto mb-5">
      <Header company={companyResponse.company} />
      <main className="xl:mx-64 px-10 space-y-5">
        <div className="lg:flex lg:space-x-10 justify-between">
          <DescriptionSection company={companyResponse.company} />
          <ContactSection company={companyResponse.company} />
        </div>
        <div className="flex flex-col">
          <section>
            <h1 className="text-xl font-bold w-full pb-1 my-3 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase">
              PORQUÉ ELEGIRNOS
            </h1>
            <p>{companyResponse.company.whyUs}</p>
          </section>
          <InternshipSection
            internships={companyResponse.company.internships}
          />
        </div>
      </main>
    </div>
  );
}
