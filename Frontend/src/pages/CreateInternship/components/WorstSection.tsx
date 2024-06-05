import { FC } from "react";
import { useFormContext } from "react-hook-form";

const WorstSection: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="my-10">
      <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase">
        LO PEOR
      </h1>
      <p className="my-2 xl:text-xl">
        ¿Qué consideras que fue lo peor de tus prácticas? Cuéntanos.
      </p>
      <div className="flex flex-col gap-4">
        <label className="font-bold">
          {" "}
          <h1 className="text-secondary-100 my-2">Opción 1</h1>
          <input
            {...register("worst1", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
            })}
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
          <p className="text-base font-light text-red">
            {errors.worst1?.message?.toString()}
          </p>
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
    </section>
  );
};

export default WorstSection;
