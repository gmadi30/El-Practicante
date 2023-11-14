import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function CreateReview() {
  const form = useForm();
  const { control, register, handleSubmit } = form;
  return (
    <div className="font-body mx-auto container  xl:w-[60%]">
      <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
        <h1 className="text-5xl font-semibold py-4 text-center">REVIEW</h1>
      </header>

      <main className="m-3 mt-12 ">
        <form>
          <section className="my-10">
            <h1 className="text-xl xl:text-2xl text-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase ">
              DATOS GENERALES
            </h1>
            <p className="my-2  xl:text-xl">
              ¿Ya acabaste tus prácticas? ¿Donde las hicistes? Cuentanos todo...
            </p>

            <div className="flex flex-col  gap-4  ">
              <div className="flex flex-col md:flex-row">
                <label className="flex-grow">
                  <h1 className="text-secondary-100 my-2 font-bold">
                    Centro de educación
                  </h1>
                  <select
                    className=" 
                  border rounded py-2
                  pl-2 w-3/4 text-black
                   focus:focus:border-secondary-100"
                    {...register("school")}
                    name="school"
                    id="school"
                  >
                    <option value="selecciona">
                      Selecciona un Centro de Educación
                    </option>
                    <option value=""> No aparece</option>
                    <option id="" value="IES Francisco de Goya">
                      IES Francisco de Goya
                    </option>
                  </select>
                </label>
                <label className="flex-grow">
                  <h1 className="text-secondary-100 my-2 font-bold">Empresa</h1>
                  <select
                    className=" 
                  border rounded py-2
                  pl-2  w-3/4 text-black
                   focus:focus:border-secondary-100"
                    {...register("company")}
                    name="company"
                    id="company"
                  >
                    <option value="selecciona">Selecciona una Empresa</option>
                    <option id="0" value="">
                      No aparece
                    </option>
                    <option value="Indra"> Indra</option>
                    <option value="Accenture"> Accenture</option>
                    <option id="1" value="DXC Technology">
                      {" "}
                      DXC Technology
                    </option>
                  </select>
                </label>

                <label className="md:ml-10 flex-shrink">
                  <div className="">
                    <h1 className="text-secondary-100 my-2 font-bold">
                      Grado profesional
                    </h1>
                    <select
                      {...register("degree")}
                      className="border rounded py-2
                    pl-2 w-3/4  text-black
                     focus:focus:border-secondary-100"
                      id="degree"
                    >
                      <option value="selecciona" className="">
                        Selecciona un Grado
                      </option>
                      <option value=""> No aparece</option>
                      <option value="DAM"> DAM</option>
                      <option value="DAW"> DAW</option>
                      <option value="ASIR"> ASIR</option>
                    </select>
                  </div>
                </label>
              </div>
              <div className="md:flex">
                <label className="font-bold">
                  <h1 className="text-secondary-100 my-2">Fecha inicio</h1>
                  <input
                    {...register("startDate")}
                    id="startDate"
                    type="date"
                    placeholder="Spring Boot"
                    className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        md:w-fit
        py-2
        pl-2
        rounded
        font-normal"
                  />
                </label>

                <label className="md:ml-10 font-bold">
                  <h1 className="text-secondary-100 my-2">Fecha fin</h1>
                  <input
                    {...register("endDate")}
                    id="endDate"
                    type="date"
                    placeholder="Spring Boot"
                    className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        md:w-fit
        py-2
        pl-2
        rounded
        font-normal"
                  />
                </label>
              </div>
            </div>
          </section>
          <section className="my-10">
            <h1 className="text-xl xl:text-2xl text-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase ">
              DESCRIPCIÓN PRINCIPAL
            </h1>

            <p className="my-2  xl:text-xl">
              En esta sección comparte de forma general tús prácticas
            </p>
            <label>
              <textarea
                {...register("description")}
                placeholder="He realizado mis prácticas en Indra y no puedo estar más contento de lo que he aprendido..."
                rows={6}
                className=" resize-none border focus:outline-none focus:border-secondary-100
              w-3/4  py-2 pl-2 rounded font-normal"
              ></textarea>
            </label>
          </section>
          <section className="my-5 md">
            <h1 className="text-xl xl:text-2xl text-bold max-w-xs  mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
              TECNOLOGÍAS
            </h1>
            <h2 className="xl:text-xl">¿Qué tecnologías utilizastes?</h2>
            <h3 className="text-gray xl:text-xl my-1">
              Es obligatorio rellenar al menos 1 opción
            </h3>
            <div className="flex flex-col gap-4">
              <label className="font-bold">
                <h1 className="text-secondary-100 my-2">Opción 1</h1>
                <input
                  {...register("technology1")}
                  id="technology1"
                  type="text"
                  placeholder="Spring Boot"
                  className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        py-2
        pl-2
        rounded
        font-normal"
                />
              </label>
              <label className=" font-bold">
                <h1 className="text-secondary-100 my-2">Opción 2</h1>
                <input
                  {...register("technology2")}
                  id="technology2"
                  type="text"
                  placeholder="Postman"
                  className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        py-2
        pl-2
        rounded
        font-normal"
                />
              </label>
              <label className="font-bold">
                <h1 className="text-secondary-100 my-2">Opción 3</h1>
                <input
                  {...register("technology3")}
                  id="technology3"
                  type="text"
                  placeholder="Java"
                  className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        py-2
        pl-2
        rounded
        font-normal"
                />
              </label>
            </div>
          </section>
          <section className="my-10">
            <h1 className="text-xl xl:text-2xl text-bold max-w-xs px-1 mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
              LO MEJOR
            </h1>
            <h2 className="xl:text-xl">
              ¿Qué ha sido lo mejor de tus prácticas?
            </h2>
            <h3 className="text-gray  xl:text-xl text-sm my-1">
              Es obligatorio rellenar al menos 1 opción
            </h3>
            <div className="flex flex-col gap-4">
              <label className="font-bold">
                <h1 className="text-secondary-100 my-2">Opción 1</h1>
                <input
                  {...register("best1")}
                  id="best1"
                  type="text"
                  placeholder="El ambiente de trabajo"
                  className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        py-2
        pl-2
        rounded
        font-normal"
                />
              </label>
              <label className="font-bold">
                {" "}
                <h1 className="text-secondary-100 my-2">Opción 2</h1>
                <input
                  {...register("best2")}
                  id="best2"
                  type="text"
                  placeholder="100% remoto"
                  className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        py-2
        pl-2
        rounded
        font-normal"
                />
              </label>
              <label className="font-bold">
                <h1 className="text-secondary-100 my-2">Opción 3</h1>
                <input
                  {...register("best3")}
                  id="best3"
                  type="text"
                  placeholder="Los compañeros"
                  className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        py-2
        pl-2
        rounded
        font-normal"
                />
              </label>
            </div>
          </section>
          <section className="my-10">
            <h1 className="text-xl xl:text-2xl text-bold max-w-xs pb-1 mt-3 mb-2 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase ">
              LO PEOR
            </h1>
            <h2 className="xl:text-xl">
              ¿Qué ha sido lo peor de tus prácticas?
            </h2>
            <h3 className="text-gray  xl:text-xl text-sm my-1">
              Es obligatorio rellenar al menos 1 opción
            </h3>
            <div className="flex flex-col gap-4">
              <label className="font-bold">
                {" "}
                <h1 className="text-secondary-100 my-2">Opción 1</h1>
                <input
                  {...register("worst1")}
                  id="worst1"
                  type="text"
                  placeholder="El ordenador, poca calidad"
                  className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        py-2
        pl-2
        rounded
        font-normal"
                />
              </label>
              <label className="font-bold">
                {" "}
                <h1 className="text-secondary-100 my-2">Opción 2</h1>
                <input
                  {...register("worst2")}
                  id="worst2"
                  type="text"
                  placeholder="El tutor no muy bueno"
                  className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        py-2
        pl-2
        rounded
        font-normal"
                />
              </label>
              <label className="font-bold">
                {" "}
                <h1 className="text-secondary-100 my-2">Opción 3</h1>
                <input
                  {...register("worst3")}
                  id="worst3"
                  type="text"
                  placeholder="Proyecto poco interesante"
                  className="
        border
        focus:outline-none
        focus:border-secondary-100
        w-3/4
        py-2
        pl-2
        rounded
        font-normal"
                />
              </label>
            </div>
            <h1 className="my-10 text-2xl font-semibold">
              ¡PRACTICANTE! Revisa antes de enviar el formulario...{" "}
            </h1>
          </section>
          <div className="xl:flex ">
            <button
              type="submit"
              className="container mx-auto rounded max-w-sm xl:text-2xl text-xl border-cyan-600 bg-secondary-100 text-white py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
            >
              FINALIZAR
            </button>
          </div>
        </form>
        <DevTool control={control} />
      </main>
    </div>
  );
}
