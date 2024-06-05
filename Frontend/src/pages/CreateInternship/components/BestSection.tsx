import { FC } from "react";
import { useFormContext } from "react-hook-form";

const BestSection: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="my-10">
      <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase">
        LO MEJOR
      </h1>
      <p className="my-2 xl:text-xl">
        ¿Qué es lo mejor de tus prácticas? Cuéntanos.
      </p>
      <h3 className="text-gray  xl:text-xl text-sm my-1">
        Es obligatorio completar al menos 1 opción
      </h3>
      <div className="flex flex-col gap-4">
        <label className="font-bold">
          <h1 className="text-secondary-100 my-2">Opción 1</h1>
          <input
            {...register("best1", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
            })}
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
          <p className="text-base font-light text-red">
            {errors.best1?.message?.toString()}
          </p>
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
  );
};

export default BestSection;
