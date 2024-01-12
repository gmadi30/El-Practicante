import { useEffect, useState } from "react";
import SearchBar from "../../components/ui/navbar/SearchBar";
import CompanyCards from "./components/CompanyCards";
import { Company, CompanySortBy } from "../../types/types";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filterBy, setFilterBy] = useState<CompanySortBy>(
    CompanySortBy.ALPHABETICALLY
  );
  const [companySearched, setCompanySearched] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesResponse = await fetch(
          `http://localhost:8080/api/v1/companies?sortBy=${filterBy}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json;",
            },
          }
        );

        if (!companiesResponse.ok) {
          throw new Error(`HTTP error! Status: ${companiesResponse.status}`);
        }

        const data = await companiesResponse.json();
        console.log("Companies sorted received:", data);
        setCompanies(data.companies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filterBy]);

  return (
    <>
      <SearchBar
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        companySearched={companySearched}
        setCompanySearched={setCompanySearched}
      />
      <CompanyCards
        companies={companies}
        companySearched={companySearched}
      ></CompanyCards>
    </>
  );
}
