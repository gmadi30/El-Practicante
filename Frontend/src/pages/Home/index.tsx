import Navbar from "../../components/ui/Navbar";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Companies from "./components/Companies";

export default function Home() {
  return (
    <div className="">
      <Navbar></Navbar>
      <main className="font-body container mx-auto">
        <Header></Header>
        <Cards></Cards>
        <Companies></Companies>
        <section className="my-20 px-10 xl:w-[75%] xl:mx-auto">
          <div className="lg:flex">
            <div className="lg:w-[50%] bg-primary font-bold text-secondary-100 text-5xl text-center py-20">
              LEVEL
            </div>
            <p className="lg:w-[50%] text-center text-xl py-5 xl:px-5">
              Todos tenemos dudas, pero si hay algo seguro es que las prácticas
              de Formación Profesional no son un juego. Unas buenas prácticas en
              una empresa correcta son la formula perfecta para empezar con buen
              pie tu carrera profesional
            </p>
          </div>
          <div className="lg:flex ">
            <p className="lg:w-[50%] text-center text-xl py-5 xl:px-5">
              Estás a punto de iniciar una gran aventura y desde{" "}
              <span className="font-bold">EL PRACTICANTE </span>
              queremos proporcionarte todas las herramientas para que elijas la
              opción que se adapte a tus prioridades.{" "}
            </p>
            <div className="lg:w-[50%] bg-secondary-100 font-bold text-primary text-5xl text-center py-20 ">
              UP
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
