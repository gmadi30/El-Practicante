import { ImSearch } from "react-icons/im";
import { CompanySortBy } from "../../../types/types";

type SearchBarProps = {
  filterBy: CompanySortBy;
  setFilterBy: React.Dispatch<React.SetStateAction<CompanySortBy>>;
  companySearched: string;
  setCompanySearched: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const searchItems = (searchValue: string) => {
    props.setCompanySearched(searchValue);
  };

  const stringToCompanySortByEnum = (value: string): CompanySortBy => {
    switch (value) {
      case CompanySortBy.ALPHABETICALLY:
        return CompanySortBy.ALPHABETICALLY;
      case CompanySortBy.REVIEWS:
        return CompanySortBy.REVIEWS;
      case CompanySortBy.REVIEWSDESC:
        return CompanySortBy.REVIEWSDESC;
      case CompanySortBy.SCORING:
        return CompanySortBy.SCORING;
      case CompanySortBy.SCORINGDESC:
        return CompanySortBy.SCORINGDESC;
      default:
        console.error(`Invalid CompanySortBy value: ${value}`);
        return CompanySortBy.ALPHABETICALLY;
    }
  };

  return (
    <main className="flex flex-col container mx-auto  mb-10 max-w-[25%]   min-w-fit ">
      <section className="font-body ">
        <div className="">
          <form className="my-10">
            <label className="flex placeholder:text-sm text-secondary-100 font-bold  focus:border-secondary-100 border-2 px-4 rounded-full shadow">
              <input
                onChange={(e) => {
                  searchItems(e.target.value);
                }}
                type="search"
                placeholder="Qué empresa estás buscando..."
                size={30}
                className="
              focus:outline-none
            focus:border-secondary-100
              min-w-fit
              w-full
              py-2
              pl-2
              text-black
              font-normal
              "
              />
              <div className="flex items-center gap-1">
                <div className=" border-r-2 pl-2 h-6"></div>
                <div className="">
                  <ImSearch></ImSearch>
                </div>
                <button className="h-5">Buscar</button>
              </div>
            </label>
          </form>
        </div>
      </section>
      <section className="flex px-5 lg:hidden">
        <label className="w-sm">
          <div className="text-sm md:text-xl">
            <h1 className="font-bold text-secondary-100">Ordenar</h1>
            <select
              className="border rounded w-full focus:border-secondary-100"
              name="lenguajes"
              id="lang"
              onChange={(event) =>
                props.setFilterBy(stringToCompanySortByEnum(event.target.value))
              }
            >
              <option value="ALPHABETICALLY">Alfabéticamente</option>
              <option value="REVIEWS">Más reviews</option>
              <option value="REVIEWSDESC">Menos reviews</option>
              <option value="SCORING">Scoring ascendente</option>
              <option value="SCORINGDESC">Scoring descendente</option>
            </select>
          </div>
        </label>
      </section>

      <section className="border-t border-b py-3 border-gray hidden lg:block">
        <ul className="flex space-x-5">
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button
              onClick={() => props.setFilterBy(CompanySortBy.ALPHABETICALLY)}
            >
              Alfabéticamente
            </button>
          </li>
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button onClick={() => props.setFilterBy(CompanySortBy.REVIEWS)}>
              Más reviews
            </button>
          </li>
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button
              onClick={() => props.setFilterBy(CompanySortBy.REVIEWSDESC)}
            >
              Menos reviews
            </button>
          </li>
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button onClick={() => props.setFilterBy(CompanySortBy.SCORING)}>
              Scoring ascendente
            </button>
          </li>
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button
              onClick={() => props.setFilterBy(CompanySortBy.SCORINGDESC)}
            >
              Scoring descendente
            </button>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default SearchBar;
