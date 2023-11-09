import {
  ImStarFull,
  ImStarHalf,
  ImCheckmark,
  ImCross,
  ImFloppyDisk,
} from "react-icons/im";

interface IntershipProps {
  company: string;
  companyReviewsAmout: string;
  intershipDescription: string;
  intershipBest: string[];
  intershipWorst: string[];
  technologies: string[];
  profilePicture: string;
}

const Intership: React.FC<IntershipProps> = (props) => {
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
                  src={props.profilePicture}
                  className=" w-[110px] h-[110px] object-cover mb-3"
                ></img>

                <div className="flex flex-col  justify-center items-center text-center">
                  <div className="flex text-xl">
                    <ImStarFull></ImStarFull>
                    <ImStarFull></ImStarFull>
                    <ImStarFull></ImStarFull>
                    <ImStarFull></ImStarFull>
                    <ImStarHalf></ImStarHalf>
                  </div>

                  <p className="text-sm w-full">
                    <span className="font-bold">
                      {props.companyReviewsAmout}
                    </span>{" "}
                    opiniones
                  </p>
                </div>
              </div>
              <div className="px-10">
                <h1 className="text-secondary-100 font-bold tracking-wider text-xl">
                  DESCRIPCIÓN DE MIS PRÁCTICAS
                </h1>
                <h2>IES Fransico de Goya</h2>
                <h2>DAM</h2>
                <h2>Fecha de inicio 01/03/2023</h2>
                <h2>Fecha de Fin 01/06/2023</h2>
                <p className="text-justify pr-1 pt-2 text-xl">
                  {props.intershipDescription}
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
              {props.intershipBest.map((element) => {
                return (
                  <div className="flex items-center">
                    <div className="text-secondary-100">
                      <ImCheckmark></ImCheckmark>
                    </div>
                    <li className="ml-1">{element}</li>
                  </div>
                );
              })}
            </ul>
          </div>
          <div>
            <h1 className="rounded indent-4 font-bold mb-1 bg-secondary-100 text-white uppercase tracking-wider text-xl">
              LO PEOR
            </h1>
            <ul className="flex flex-col gap-3 list-none mt-4 leading-4 lg:text-xl ">
              {props.intershipWorst.map((element) => {
                return (
                  <div className="flex">
                    <div className="text-red">
                      <ImCross></ImCross>
                    </div>
                    <li className="ml-1">{element}</li>
                  </div>
                );
              })}
            </ul>
          </div>
          <div>
            <h1 className="rounded indent-4 font-bold mb-1 bg-secondary-100 text-white uppercase tracking-wider text-xl">
              TECNOLOGÍAS
            </h1>
            <ul className="flex flex-col gap-3 list-none mt-4 sleading-4 lg:text-xl">
              {props.technologies.map((element) => {
                return (
                  <div className="flex items-center">
                    <div className="text-secondary-100">
                      <ImFloppyDisk></ImFloppyDisk>
                    </div>
                    <li className="ml-1">{element}</li>
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

export default Intership;
