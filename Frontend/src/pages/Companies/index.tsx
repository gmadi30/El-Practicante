import { useEffect, useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import CompanyCards from "./components/CompanyCards";
import { Company, CompanySortBy } from "../../types/types";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filterBy, setFilterBy] = useState<CompanySortBy>(
    CompanySortBy.ALPHABETICALLY
  );
  const [companySearched, setCompanySearched] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/companies?sortBy=${filterBy}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
      },
    })
      .then((response) => {
        console.log(response);
        response.json().then((data) => {
          console.log(data.companies);
          setCompanies(data.companies);
        });
      })
      .catch();
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
