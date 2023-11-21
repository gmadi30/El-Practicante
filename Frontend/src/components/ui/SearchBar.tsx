import { ImSearch } from "react-icons/im";
import { FilterParams } from "../../types/types";

type SearchBarProps = {
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterParams>>;
  companySearched: string;
  setCompanySearched: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const searchItems = (searchValue: string) => {
    props.setCompanySearched(searchValue);
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
            >
              <option value="ByAlphabet">Alfabéticamente</option>
              <option value="ByMoreReviews">Más reviews</option>
              <option value="ByLessReviews">Menos reviews</option>
              <option value="ByHighScore">Scoring ascendente</option>
              <option value="ByLowScore">Scoring descendente</option>
            </select>
          </div>
        </label>
      </section>

      <section className="border-t border-b py-3 border-gray hidden lg:block">
        <ul className="flex space-x-5">
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button onClick={() => props.setFilterBy("alphabetically")}>
              Alfabéticamente
            </button>
          </li>
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button onClick={() => props.setFilterBy("reviews")}>
              Más reviews
            </button>
          </li>
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button onClick={() => props.setFilterBy("reviewsDesc")}>
              Menos reviews
            </button>
          </li>
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button onClick={() => props.setFilterBy("scoring")}>
              Scoring ascendente
            </button>
          </li>
          <li className="border rounded p-2 border-secondary-300 hover:bg-primary font-semibold">
            <button onClick={() => props.setFilterBy("scoringDesc")}>
              Scoring descendente
            </button>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default SearchBar;
