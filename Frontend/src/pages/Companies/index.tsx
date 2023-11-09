import Navbar from "../../components/ui/Navbar";
import SearchBar from "../../components/ui/SearchBar";
import CompanyCards from "./components/CompanyCards";

export default function Companies() {
  return (
    <>
      <Navbar></Navbar>
      <SearchBar />
      <CompanyCards></CompanyCards>
    </>
  );
}
