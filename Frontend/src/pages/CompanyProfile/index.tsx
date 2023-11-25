import { TiMail, TiSocialLinkedin, TiHome } from "react-icons/ti";
import { ImStarFull, ImStarHalf } from "react-icons/im";
import { useState, useEffect } from "react";
import { CompanyProfileType } from "../../types/types";
import { useLocation, useParams } from "react-router-dom";

export default function CompanyProfile() {
  const [company, setCompany] = useState<CompanyProfileType>(
    {} as CompanyProfileType
  );
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState<string | null>(null);
  let location = useLocation();
  const params = useParams();

  const impagesFolderPath = "../../assets/img/";
  const imgUrl = new URL(
    `${impagesFolderPath}${company.name}.png`,
    import.meta.url
  ).href;

  const imgStudentProfile = (name: string) => {
    return new URL(`${impagesFolderPath}${name}.png`, import.meta.url).href;
  };

  console.log("URL", imgStudentProfile("Tulio"));
  console.log({
    path: location.pathname,
    state: location.state,
    params: params,
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/companies/${params.companyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          console.log("Empresa recuperada", data);
          setCompany(data);
        });
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("Company después del isLoading", company);
  return (
    <>
      <div className="font-body container mx-auto ">
        <header className="">
          <div className="flex justify-center items-center py-10 bg-primary h-[6rem] mt-20 xl:mx-64 ">
            <img
              src={imgUrl}
              className="bg-white block w-[250px] h-[150px] object-cover border-4  border-secondary-300"
            ></img>
          </div>

          <div className="flex flex-col justify-center items-center my-14 rounded mx-1 p-3 ">
            <h1 className="text-4xl font-semibold mb-3">{company.name}</h1>
            <h3 className="lg:text-xl">
              {company.city}, {company.autonomousCommunity}{" "}
            </h3>
            <h3 className="text-sm lg:text-xl">
              {" "}
              {company.interships && company.interships.length}{" "}
              <span className="text-secondary-100 font-bold">Practicantes</span>{" "}
              de FP
            </h3>
            <h3 className="text-sm lg:text-xl">
              {company.employeesAmount} Empleados
            </h3>
          </div>
        </header>

        <main className="xl:mx-64 px-10 space-y-5">
          <div className="lg:flex lg:space-x-10 justify-between  ">
            <section className="flex flex-col lg:w-[75%] xl:w-1/2">
              <h1 className="text-xl text-bold w-full py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                DESCRIPCIÓN PRINCIPAL
              </h1>
              <p className="">{company.aboutUs}</p>
              <div className="">
                <h2 className="font-semibold text-xl text-darkgray">
                  PRÁCTICAS FCT PARA
                </h2>
                <h3 className="mt-1">DAM, DAW Y ASIR</h3>
              </div>
              <div className="mt-5">
                <h2 className="font-semibold text-xl text-darkgray">
                  MODALIDAD DE TRABAJO
                </h2>
                <h3 className="mt-1">Trabajo híbrido</h3>
              </div>
              <div className="mt-5">
                <h2 className="font-semibold text-xl text-darkgray">
                  BENEFICIOS DE LA EMPRESA
                </h2>
                <ul className="mt-1">
                  <li>Lugar de trabajo flexible</li>
                  <li>Seguro médico</li>
                  <li>Formación continua</li>
                </ul>
              </div>
            </section>
            <section className="flex ">
              <aside className="w-full">
                <h1 className="text-xl text-bold w-full pb-1 py-1  mb-4 rounded indent-4 text-secondary-100 bg-primary uppercase  ">
                  CONTACTO
                </h1>
                <ul className=" ">
                  <li>
                    <div className="flex items-center">
                      <div className="text-secondary-100 text-xl mr-1">
                        <TiMail></TiMail>
                      </div>
                      <h1>{company.email}</h1>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <div className="text-secondary-100 text-xl mr-1">
                        <TiSocialLinkedin></TiSocialLinkedin>
                      </div>
                      <h1>Linkedin</h1>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <div className="text-secondary-100 text-xl mr-1">
                        <TiHome></TiHome>
                      </div>
                      <h1>https://www.indra.com</h1>
                    </div>
                  </li>
                </ul>
              </aside>
            </section>
          </div>
          <div className="flex flex-col ">
            <section className="">
              {" "}
              <h1 className="text-xl text-bold w-full pb-1 my-3 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                PORQUÉ ELEGIRNOS
              </h1>
              <p className="">{company.whyUs}</p>
            </section>

            <section className="">
              <h1 className="w-full text-xl text-bold  pb-1 my-3 py-1rounded indent-4 bg-secondary-100 text-primary uppercase ">
                OPINIONES
              </h1>

              {company.interships &&
                company.interships.map((intership, index) => {
                  return (
                    <div className="flex mx-2 space-y-2">
                      <div className="flex flex-col items-center justify-center text-center p-2 min-w-fit">
                        <img
                          className="max-h-25 rounded-full"
                          src={imgStudentProfile(intership?.student?.name)}
                          alt=""
                          height={0}
                          width={120}
                        />
                        <div className="flex flex-col justify-center items-center text-sm my-3">
                          <h1 className="font-bold">
                            {intership.student.name}{" "}
                            {intership.student.lastName}
                          </h1>
                          <h2>{intership.schoolName}</h2>
                          <h2>Estudiante de {intership.degreeName}</h2>
                        </div>
                      </div>
                      <div className="flex flex-col w-full pb-1 bg-primary py-3 px-2 justify-between">
                        <div className="text-sm">
                          <div className="flex">
                            <ImStarFull></ImStarFull>
                            <ImStarFull></ImStarFull>
                            <ImStarFull></ImStarFull>
                            <ImStarFull></ImStarFull>
                            <ImStarHalf></ImStarHalf>
                            <h1 className="font-semibold ml-2">EMPRESA TOP!</h1>
                          </div>
                          <div className="flex flex-col space-between">
                            <p className="line-clamp-7 mt-1 text-left text-sm">
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Soluta voluptas fugit voluptates
                              consequatur distinctio tempora exercitationem
                              corporis reiciendis. Dolore accusantium, qui animi
                              voluptas quisquam voluptate quasi libero a et
                              ipsum?
                            </p>
                          </div>
                        </div>

                        <p className="flex text-sm my-2">
                          <span className="text-secondary-100 font-bold mr-1">
                            Tecnologías:
                            <span> {intership?.technologyList[0]?.name}, </span>
                            <span>{intership?.technologyList[1]?.name}, </span>
                            <span>{intership?.technologyList[2]?.name}</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
