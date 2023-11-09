import Navbar from "./ui/Navbar";

export default function CreateReview() {
  return (
    <div className="font-body">
      <Navbar></Navbar>

      <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
        <h1 className="text-5xl py-4 text-center">REVIEW</h1>
      </header>

      <main className="m-3 mt-12">
        <form>
          <section className="my-10">
            <h1 className="text-xl text-bold max-w-xs pb-1 my-3 py-1rounded indent-4 bg-secondary-100 text-primary uppercase ">
              DESCRIPCIÓN PRINCIPAL
            </h1>
            <p className="text my-2">
              En esta sección comparte de forma general tús prácticas
            </p>
            <label>
              <textarea
                placeholder=""
                value={""}
                className=" resize-none border focus:outline-none focus:border-secondary-100
              w-full py-2 pl-2 rounded font-normal"
              ></textarea>
            </label>
          </section>
          <section className="my-5">
            <h1 className="text-xl text-bold max-w-xs pb-1 mt-3 mb-2 py-1rounded indent-4 bg-secondary-100 text-primary uppercase ">
              TECNOLOGÍAS
            </h1>
            <h2 className="text-xl">¿Qué tecnologías utilizastes?</h2>
            <h3 className="text-gray text-sm my-1">
              Es obligatorio rellenar al menos 1 opción
            </h3>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold">
                <h1 className="text-secondary-100 my-2">Opción 1</h1>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={""}
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
              <label className="text-sm font-bold">
                <h1 className="text-secondary-100 my-2">Opción 2</h1>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={""}
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
              <label className="text-sm font-bold">
                <h1 className="text-secondary-100 my-2">Opción 3</h1>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={""}
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
            <h1 className="text-xl text-bold max-w-xs pb-1 mt-3 mb-2 py-1rounded indent-4 bg-secondary-100 text-primary uppercase ">
              LO MEJOR
            </h1>
            <h2 className="text-xl">¿Qué ha sido lo mejor de tus prácticas?</h2>
            <h3 className="text-gray text-sm my-1">
              Es obligatorio rellenar al menos 1 opción
            </h3>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold">
                <h1 className="text-secondary-100 my-2">Opción 1</h1>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={""}
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
              <label className="text-sm font-bold">
                <h1 className="text-secondary-100 my-2">Opción 2</h1>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={""}
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
              <label className="text-sm font-bold">
                <h1 className="text-secondary-100 my-2">Opción 3</h1>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={""}
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
            <h1 className="text-xl text-bold max-w-xs pb-1 mt-3 mb-2 py-1rounded indent-4 bg-secondary-100 text-primary uppercase ">
              LO PEOR
            </h1>
            <h2 className="text-xl">¿Qué ha sido lo peor de tus prácticas?</h2>
            <h3 className="text-gray text-sm my-1">
              Es obligatorio rellenar al menos 1 opción
            </h3>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold">
                <h1 className="text-secondary-100 my-2">Opción 1</h1>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={""}
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
              <label className="text-sm font-bold">
                <h1 className="text-secondary-100 my-2">Opción 2</h1>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={""}
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
              <label className="text-sm font-bold">
                <h1 className="text-secondary-100 my-2">Opción 3</h1>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={""}
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
          <button
            type="submit"
            className="rounded min-w-[75%] text-xl border-cyan-600 bg-secondary-100 text-white  py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
          >
            FINALIZAR
          </button>
        </form>
      </main>
    </div>
  );
}
