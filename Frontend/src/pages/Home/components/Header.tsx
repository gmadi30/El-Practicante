import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1 className="text-5xl my-20 text-center font-bold md:text-7xl xl:text-9xl lg:text-7xl">
        EL PRACTICANTE
      </h1>
      <section className="bg-primary pt-10 pb-5 px-4">
        <div className="text-center ">
          <h2 className="text-xl lg:px-38 xl:text-4xl">
            Conoce a las empresas,
            <span className="italic font-semibold"> califica</span> tus
            prácticas, <span className="italic font-semibold">conoce </span>
            las opiniones de otros
            <span className="font-bold"> PRACTICANTES</span> y lo más importante{" "}
            <span className="italic font-semibold">comparte</span> tú
            experiencia
          </h2>

          <Link to="/register">
            <button className="rounded border-cyan-600 bg-secondary-100 text-white px-14 py-2 font-bold uppercase tracking-[0.5rem] my-5 hover:bg-secondary-200 lg:text-2xl">
              <p>registrate</p>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Header;
