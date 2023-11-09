import { Link } from "react-router-dom";
import homeCompanyImage from "../../../assets/img/homeCompanyImage.png";

const Companies = () => {
  return (
    <section className="lg:flex grid grid-rows-2">
      <div className="flex flex-col justify-center items-center bg-lightgray text-center p-10">
        <p className="text-2xl text-center font-bold text-secondary-100 xl:px-28 xl:text-4xl ">
          DESCUBRE QUE OPINAN LOS DEMÁS SOBRE LAS EMPRESAS
        </p>
        <Link to="/companies">
          <button className=" rounded border-cyan-600 bg-secondary-100 text-white px-14 py-2 font-bold uppercase tracking-[0.5rem] my-5 hover:bg-secondary-200 xl:text-2xl">
            <p>empresas</p>
          </button>
        </Link>
      </div>
      <img className="lg:w-[50%]" src={homeCompanyImage}></img>
    </section>
  );
};

export default Companies;
