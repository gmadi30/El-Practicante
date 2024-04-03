import { TiMail, TiHome } from "react-icons/ti";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../../components/ui/shared/Rating";
import Header from "./components/Header";
import { CompanyResponse } from "../../types/types";
import { imgStudentProfile } from "../../utils/ImagesUtils";

export default function CompanyProfile() {
  const [companyResponse, setCompanyResponse] = useState<CompanyResponse>(
    {} as CompanyResponse
  );
  const [loading, setLoading] = useState(true);
  let params = useParams();
  const navigate = useNavigate();

  const handleNavigate = (studentId: number) => {
    navigate(`/student/${studentId}/profile`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyResponse = await fetch(
          `http://localhost:8080/api/v1/companies/${params.companyId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json;",
            },
          }
        );

        if (!companyResponse.ok) {
          throw new Error(`HTTP error! Status: ${companyResponse.status}`);
        }

        const data = await companyResponse.json();
        console.log("Company received:", data);
        setCompanyResponse(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="font-body container mx-auto mb-5">
        <Header company={companyResponse?.company}></Header>
        <main className="xl:mx-64 px-10 space-y-5">
          <div className="lg:flex lg:space-x-10 justify-between  ">
            <section className="flex flex-col lg:w-[75%]">
              <h1 className="text-xl font-bold w-full py-1 mb-4 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                DESCRIPCIÓN PRINCIPAL
              </h1>
              <p className="">{companyResponse?.company?.aboutUs}</p>
              <div className="mt-5">
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
            <section className="flex">
              <aside className="w-full">
                <h1 className="text-xl font-bold w-full pb-1 py-1 mb-4 mt-5 lg:mt-0 rounded indent-4 text-secondary-100 bg-primary uppercase">
                  CONTACTO
                </h1>
                <ul className=" ">
                  <li>
                    <div className="flex items-center">
                      <div className="text-secondary-100 text-xl mr-1">
                        <TiMail></TiMail>
                      </div>
                      <h1>{companyResponse?.company?.email}</h1>
                    </div>
                  </li>
                  {/*
                    <li>
                    <div className="flex items-center">
                      <div className="text-secondary-100 text-xl mr-1">
                        <TiSocialLinkedin></TiSocialLinkedin>
                      </div>
                      <h1>Linkedin</h1>
                    </div>
                  </li>
                    */}
                  {companyResponse?.company?.website && (
                    <li>
                      <div className="flex items-center">
                        <div className="text-secondary-100 text-xl mr-1">
                          <TiHome></TiHome>
                        </div>
                        <h1></h1>

                        <a
                          href={`${companyResponse?.company?.website}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {companyResponse?.company?.website}
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
              </aside>
            </section>
          </div>
          <div className="flex flex-col ">
            <section className="">
              {" "}
              <h1 className="text-xl font-bold w-full pb-1 my-3 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                PORQUÉ ELEGIRNOS
              </h1>
              <p className="">{companyResponse?.company?.whyUs}</p>
            </section>

            <section className="">
              <h1 className="w-full text-xl font-bold  pb-1 my-3 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                OPINIONES
              </h1>

              {companyResponse?.company?.internships &&
                companyResponse?.company?.internships.map(
                  (internship, index) => {
                    return (
                      <div className="flex mx-2 space-y-2">
                        <div
                          onClick={() =>
                            handleNavigate(internship?.student?.id)
                          }
                          className="flex flex-col items-center justify-center text-center p-2 min-w-fit  cursor-pointer"
                        >
                          <img
                            className="float-left w-[100px] h-[100px] object-cover rounded-full mb-3"
                            src={imgStudentProfile(
                              internship?.student?.profilePictureName
                            )}
                            alt=""
                          />
                          <div className="flex flex-col justify-center items-center text-sm my-3">
                            <h1 className="font-bold">
                              {internship?.student?.name}{" "}
                              {internship?.student?.lastName}
                            </h1>
                            <h2>{internship?.school.name}</h2>
                            <h2>{internship?.degree?.name}</h2>
                          </div>
                        </div>
                        <div className="flex flex-col w-full h-fit pb-1 bg-primary py-3 px-2 ">
                          <div className="text-sm">
                            <div className="flex">
                              <Rating rating={internship?.rating}></Rating>
                              <h1 className="font-semibold ml-2">
                                {internship?.title}
                              </h1>
                            </div>
                            <div className="flex flex-col space-between">
                              <p className="line-clamp-3 mt-1 text-left text-sm">
                                {internship?.description}
                              </p>
                            </div>
                          </div>

                          <p className="flex text-sm my-2">
                            <span className="text-secondary-100 font-bold mr-1">
                              Tecnologías: {""}
                              {internship?.technologyList?.map((technology) => {
                                return (
                                  <span>
                                    {technology.name} {""}
                                  </span>
                                );
                              })}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
