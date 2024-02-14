import { useEffect, useState } from "react";
import SearchBar from "../../components/ui/navbar/SearchBar";
import CompanyCards from "./components/CompanyCards";
import { Company, CompanySortBy } from "../../types/types";
import { getAllCompaniesSortedByFilter } from "../../api/api";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filterBy, setFilterBy] = useState<CompanySortBy>(
    CompanySortBy.ALPHABETICALLY
  );
  const [companySearched, setCompanySearched] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesResponse = await getAllCompaniesSortedByFilter(filterBy);

        console.log("Companies sorted received:", companiesResponse);
        setCompanies(companiesResponse.companies);
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
