import Navbar from "../../components/ui/Navbar";
import InputForm from "../../components/form/InputForm";

function Signup() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="mx-5 my-10 md:container md:mx-auto md:w-fit">
        <h1 className="font-semibold text-5xl mb-5">Registro</h1>
        <form
          onSubmit={onSubmit}
          className="border-4 border-primary rounded-xl font-body flex flex-col mt-3 mb-10 px-20 space-y-7 py-10"
        >
          <InputForm title="Nombre" type="text" placeHolder="Nombre" />
          <InputForm title="Apellido" type="text" placeHolder="Apellido" />
          <InputForm title="Email" type="email" placeHolder="Email" />
          <InputForm
            title="Contraseña"
            type="password"
            placeHolder="Contraseña"
          />
          <InputForm
            title="Confirmar contraseña"
            type="password"
            placeHolder="Repetir contraseña"
          />
          <InputForm
            title="Fecha de nacimiento"
            type="date"
            placeHolder="Introduce una fecha"
          />
          <InputForm title="DNI" type="text" placeHolder="A1234591-B" />

          <InputForm title="Móvil" type="tel" placeHolder="123-45-50-41" />

          <label className=" md:text-xl">
            <div className="text-sm">
              <h1 className="font-bold text-secondary-100 md:text-xl">
                Centro de educación
              </h1>
              <select
                className="md:text-xl px-2 py-4 border rounded w-full text-black focus:focus:border-secondary-100"
                name="lenguajes"
                id="lang"
              >
                <h1 className="text-secondary-100 md:text-xl">Móvil</h1>
                <option value="selecciona">
                  Selecciona un Centro de Educación
                </option>
                <option value=""> No aparece</option>
                <option value="IES Francisco de Goya">
                  IES Francisco de Goya
                </option>
              </select>
            </div>

            <div className="mt-1">
              <a
                href="#"
                className="underline hover:text-secondary-100 text-sm md:text-xl"
              >
                ¿No aparece tu centro? Haz click aquí para añadirlo
              </a>
            </div>
          </label>

          <label className="">
            <div className="md:text-xl text-sm">
              <h1 className="font-bold text-secondary-100">
                Grado profesional
              </h1>
              <select
                className=" md:text-xl px-2 py-4 border rounded w-full focus:border-secondary-100"
                name="lenguajes"
                id="lang"
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

            <div className="mt-1">
              <a
                href="#"
                className="underline hover:text-secondary-100 text-sm md:text-xl"
              >
                ¿No aparece tu grado? Haz click aquí para añadirlo
              </a>
            </div>
          </label>
          <label>
            <div className="text-sm md:text-xl">
              <h1 className="font-bold text-secondary-100">Empresa</h1>
              <select
                className="px-2 py-4 border rounded w-full focus:border-secondary-100"
                name="lenguajes"
                id="lang"
              >
                <option value="selecciona">Selecciona una Empresa</option>
                <option value="">No aparece</option>
                <option value="DAM"> Indra</option>
                <option value="DAW"> Accenture</option>
                <option value="ASIR"> DXC Technology</option>
              </select>
            </div>

            <div className="mt-1">
              <a
                href="#"
                className="underline hover:text-secondary-100 text-sm md:text-xl"
              >
                ¿No aparece tu empresa? Haz click aquí para añadirlo
              </a>
            </div>
          </label>

          <button
            type="submit"
            className="md:text-xl rounded border-cyan-600 bg-secondary-100 text-white  py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
