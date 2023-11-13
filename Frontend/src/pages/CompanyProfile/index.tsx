import { TiMail, TiSocialLinkedin, TiHome } from "react-icons/ti";
import { ImStarFull, ImStarHalf } from "react-icons/im";
import indra from "../../assets/img/indra.png";
import me from "../../assets/img/me.png";
export default function CompanyProfile() {
  return (
    <>
      <div className="font-body container mx-auto  ">
        <header className="xl:mx-[10%]">
          <div className="flex justify-center items-center py-10 bg-primary h-[6rem] mt-20 ">
            <img
              src={indra}
              className="block w-[250px] h-[150px] object-cover border-4  border-secondary-300"
            ></img>
          </div>

          <div className="flex flex-col justify-center items-center my-14 rounded mx-1 p-3 ">
            <h3 className="lg:text-xl">
              Av. Madrid, 3, Madrid, Comunidad de Madrid{" "}
            </h3>
            <h3 className="text-sm lg:text-xl">
              {" "}
              30{" "}
              <span className="text-secondary-100 font-bold">
                Practicantes
              </span>{" "}
              de FP
            </h3>
            <h3 className="text-sm lg:text-xl">50.000 Empleados</h3>
          </div>
        </header>

        <main className="xl:mx-64 px-10 space-y-5">
          <div className="lg:flex lg:space-x-10 justify-between  ">
            <section className="flex flex-col lg:w-[75%] xl:w-1/2">
              <h1 className="text-xl text-bold w-full py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
                DESCRIPCIÓN PRINCIPAL
              </h1>
              <p className="">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Delectus architecto commodi veniam quidem autem provident
                tempore necessitatibus. Culpa autem dolores sint expedita
                facilis quasi quod, nam obcaecati asperiores sequi rerum?{" "}
              </p>
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
                      <h1>contacto@indra.com</h1>
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
              <p className="">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                nesciunt voluptates, voluptatem, assumenda esse voluptate totam
                unde deleniti, iusto quasi quidem error dignissimos animi sed
                perspiciatis facere nihil vero eum.
              </p>
            </section>

            <section className="">
              <h1 className="w-full text-xl text-bold  pb-1 my-3 py-1rounded indent-4 bg-secondary-100 text-primary uppercase ">
                OPINIONES
              </h1>

              <div className="flex mx-2">
                <div className="flex flex-col items-center justify-center text-center p-2 min-w-fit">
                  <img
                    className="max-h-25 rounded-full"
                    src={me}
                    alt=""
                    height={0}
                    width={120}
                  />
                  <div className="flex flex-col justify-center items-center text-sm my-3">
                    <h1 className="font-bold">Georges Madi</h1>
                    <h2>IES Francisco de Goya</h2>
                    <h2>Estudiante de DAM</h2>
                  </div>
                </div>
                <div className="flex flex-col w-full pb-1 bg-primary py-3 px-2">
                  <div className="text-sm">
                    <div className="flex">
                      <ImStarFull></ImStarFull>
                      <ImStarFull></ImStarFull>
                      <ImStarFull></ImStarFull>
                      <ImStarFull></ImStarFull>
                      <ImStarHalf></ImStarHalf>
                      <h1 className="font-semibold ml-2">
                        Experiencia increíble
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col space-between">
                    <p className="line-clamp-7 mt-1 text-left text-sm">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Voluptatibus inventore eveniet qui nesciunt nisi quasi
                      vero libero rem soluta ad, tenetur labore, tempore
                      necessitatibus, voluptatem porro? Asperiores nobis
                      consequuntur similique?
                    </p>
                    <p className="text-sm my-2">
                      <span className="text-secondary-100 font-bold mr-1">
                        Tecnologías:
                      </span>
                      Spring Boot, Java, Postman
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          ;
        </main>
      </div>
    </>
  );
}
