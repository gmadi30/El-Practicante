export default function CreateReview() {
  return (
    <div className="font-body mx-auto container  xl:w-[50%]">
      <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
        <h1 className="text-5xl font-semibold py-4 text-center">REVIEW</h1>
      </header>

      <main className="m-3 mt-12 ">
        <form>
          <section className="my-10">
            <h1 className="text-xl xl:text-2xl text-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase ">
              DESCRIPCIÓN PRINCIPAL
            </h1>
            <p className="my-2  xl:text-xl">
              En esta sección comparte de forma general tús prácticas
            </p>
            <label>
              <textarea
                placeholder="He realizado mis prácticas en Indra y no puedo estar más contento de lo que he aprendido..."
                rows={6}
                className=" resize-none border focus:outline-none focus:border-secondary-100
              w-full  py-2 pl-2 rounded font-normal"
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
      </main>
    </div>
  );
}
