import {
  ImStarFull,
  ImStarHalf,
  ImCheckmark,
  ImCross,
  ImFloppyDisk,
} from "react-icons/im";
import { Intership } from "../../../types/types";
import Rating from "../../../components/ui/Rating";

interface IntershipProps {
  intership: Intership;
}

const impagesFolderPath = "../../../assets/img/";
const imgCompanyProfile = (name: string) => {
  return new URL(`${impagesFolderPath}${name}.png`, import.meta.url).href;
};

const IntershipComponent: React.FC<IntershipProps> = (props) => {
  const { intership } = props;
  return (
    <>
      <div className="lg:flex lg:justify-between">
        <section className="m-3 mt-12 md:w-[75%]">
          <h1 className="text-xl text-bold  pb-1 py-1 mb-10 rounded indent-4 text-secondary-100 bg-primary uppercase ">
            Mis prácticas
          </h1>

          <div>
            <div className="flex">
              <div className=" space-y-4 ">
                <img
                  src={imgCompanyProfile(intership?.company?.companyName)}
                  className=" w-[110px] h-[110px] object-cover mb-3"
                ></img>

                <div className="flex flex-col  justify-center items-center text-center">
                  <div className="text-xl">
                    <Rating rating={intership?.company?.rating}></Rating>
                  </div>

                  <p className="text-sm w-full">
                    <span className="font-bold">
                      {intership?.company?.intershipsAmount}
                    </span>{" "}
                    opiniones
                  </p>
                </div>
              </div>
              <div className="px-10">
                <h1 className="text-secondary-100 font-bold tracking-wider text-xl">
                  DESCRIPCIÓN
                </h1>
                <h2>{intership?.schoolName}</h2>
                <h2>{intership?.degreeName}</h2>
                <h2>
                  Fecha de inicio{" "}
                  {intership?.startDate &&
                    new Date(intership?.startDate).toLocaleDateString("en-GB")}
                </h2>
                <h2>
                  Fecha de fin{" "}
                  {intership?.endDate &&
                    new Date(intership?.endDate).toLocaleDateString("en-GB")}
                </h2>
                <p className="text-justify pr-1 pt-2 text-xl">
                  {intership?.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5 flex flex-col m-3 mt-12 text-xl md:w-[75%] lg:w-fit">
          <div className=" ">
            <h1 className="rounded indent-4 font-bold mb-1 bg-secondary-100 text-white uppercase tracking-wider ">
              LO MEJOR
            </h1>
            <ul className="flex flex-col gap-3 list-none mt-4 leading-4 lg:text-xl">
              {intership?.summarizeList?.map((element) => {
                if (element.type === "BEST") {
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
              {intership?.summarizeList.map((element) => {
                if (element.type === "WORST") {
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
              {intership?.technologyList?.map((element) => {
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
    </>
  );
};

export default IntershipComponent;
