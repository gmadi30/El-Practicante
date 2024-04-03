import { ImCheckmark, ImCross, ImFloppyDisk } from "react-icons/im";
import { Internship } from "../../../types/types";
import Rating from "../../../components/ui/shared/Rating";
import { useNavigate } from "react-router-dom";

interface IntershipProps {
  internship: Internship;
}

const impagesFolderPath = "../../../assets/img/";
const imgCompanyProfile = (name: string) => {
  return new URL(`${impagesFolderPath}${name}.png`, import.meta.url).href;
};

const InternshipComponent: React.FC<IntershipProps> = (props) => {
  const navigate = useNavigate();

  const handleNavigate = (companyId: number) => {
    navigate(`/company/${companyId}/profile`);
  };
  const { internship } = props;
  return (
    <>
      <div className="lg:flex lg:justify-between lg:flex-col">
        <div className="lg:flex">
          <section className="m-3 mt-12 md:w-[75%]">
            <div>
              <div className="flex">
                <div className="flex-shrink-0 space-y-4 ">
                  <div>
                    <img
                      src={imgCompanyProfile(internship?.company?.companyName)}
                      className=" w-[110px] h-[110px] object-cover mb-3 cursor-pointer"
                      onClick={() =>
                        handleNavigate(internship?.company?.companyId)
                      }
                    ></img>
                  </div>

                  <div className="flex flex-col  justify-center items-center text-center">
                    <div className="text-xl">
                      <Rating rating={internship?.company?.rating}></Rating>
                    </div>

                    <p className="text-sm w-full">
                      <span className="font-bold">
                        {internship?.company?.intershipsAmount}
                      </span>{" "}
                      opiniones
                    </p>
                  </div>
                </div>
                <div className="px-10">
                  <h1 className="text-secondary-100 font-bold tracking-wider text-xl">
                    DESCRIPCIÓN
                  </h1>
                  <h2>Escuela: {internship?.school.name}</h2>
                  <h2>Empresa: {internship?.company.companyName}</h2>
                  <h2>Grado: {internship?.degree.name}</h2>
                  <h2>
                    Fecha de inicio:{" "}
                    {internship?.startDate &&
                      new Date(internship?.startDate).toLocaleDateString(
                        "en-GB"
                      )}
                  </h2>
                  <h2>
                    Fecha de fin:{" "}
                    {internship?.endDate &&
                      new Date(internship?.endDate).toLocaleDateString("en-GB")}
                  </h2>
                  <h2>Rating: {internship?.rating}/5</h2>
                  <h3>{internship?.title}</h3>
                  <p className="text-justify pr-1 pt-2 text-xl">
                    {internship?.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-5 flex flex-col m-3 mt-12 text-xl md:w-[75%] lg:w-[25%]">
            <div className="">
              <h1 className="rounded indent-4 font-bold mb-1 bg-secondary-100 text-white uppercase tracking-wider ">
                LO MEJOR
              </h1>
              <ul className="flex flex-col gap-3 list-none mt-4 leading-4 lg:text-xl">
                {internship?.summarizeList?.map((element) => {
                  if (element.type === "BEST" && element.name !== "") {
                    return (
                      <div className="flex items-center">
                        <div className="text-secondary-100">
                          <ImCheckmark></ImCheckmark>
                        </div>
                        <li className="ml-1">{element.name}</li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div>
              <h1 className="rounded indent-4 font-bold mb-1 bg-secondary-100 text-white uppercase tracking-wider text-xl">
                LO PEOR
              </h1>
              <ul className="flex flex-col gap-3 list-none mt-4 leading-4 lg:text-xl ">
                {internship?.summarizeList?.map((element) => {
                  if (element.type === "WORST" && element.name !== "") {
                    return (
                      <div className="flex items-center">
                        <div className="text-red">
                          <ImCross></ImCross>
                        </div>
                        <li className="ml-1">{element.name}</li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            <div>
              <h1 className="rounded indent-4 font-bold mb-1 bg-secondary-100 text-white uppercase tracking-wider text-xl">
                TECNOLOGÍAS
              </h1>
              <ul className="flex flex-col gap-3 list-none mt-4 sleading-4 lg:text-xl">
                {internship?.technologyList?.map((element) => {
                  return (
                    <div className="flex items-center">
                      <div className="text-secondary-100">
                        <ImFloppyDisk></ImFloppyDisk>
                      </div>
                      <li className="ml-1">{element.name}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InternshipComponent;
