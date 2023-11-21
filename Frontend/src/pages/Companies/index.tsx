import { useEffect, useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import CompanyCards from "./components/CompanyCards";
import { Company, FilterParams } from "../../types/types";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filterBy, setFilterBy] = useState<FilterParams>("alphabetically");
  const [companySearched, setCompanySearched] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/companies?sortBy=${filterBy}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data.companyList);
          setCompanies(data.companyList);
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
