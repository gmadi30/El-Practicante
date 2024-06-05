import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Technology } from "../../../types/types";

interface TechnologiesSectionProps {
  technologies: Technology[];
}

const TechnologiesSection: FC<TechnologiesSectionProps> = ({
  technologies,
}) => {
  const { register, formState, watch } = useFormContext();
  const { errors } = formState;

  const selectedTechnologies = watch([
    "technology1",
    "technology2",
    "technology3",
  ]);
  const isUnique = (arr: string[]) => {
    console.log("array de tecnologías", arr);
    if (arr[1] === "" && arr[2] === "") {
      return true;
    }
    return new Set(arr).size === arr.length;
  };
  return (
    <section className="my-5 md">
      <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase">
        TECNOLOGÍAS
      </h1>
      <h2 className="xl:text-xl">¿Qué tecnologías utilizastes?</h2>
      <h3 className="text-gray xl:text-xl my-1">
        Es obligatorio completar al menos 1 opción
      </h3>
      {!isUnique(selectedTechnologies) && (
        <p className="text-base font-light text-red">
          Las tecnologías no se pueden repetir.
        </p>
      )}
      <div className="flex flex-col gap-4">
        <label className="">
          <h1 className="text-secondary-100 my-2 font-bold">Opción 1</h1>
          <select
            className=" 
                    border rounded py-2
                    pl-2  w-3/4 text-black
                     focus:focus:border-secondary-100"
            {...register("technology1", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
            })}
            id="technology1"
          >
            <option value="">Selecciona una tecnología</option>
            {(technologies ?? []).map((technology: Technology) => {
              return <option value={technology?.id}>{technology?.name}</option>;
            })}
          </select>
          <p className="text-base font-light text-red">
            {errors.technology1?.message?.toString()}
          </p>
        </label>
        <label className="">
          <h1 className="text-secondary-100 my-2 font-bold">Opción 2</h1>
          <select
            className=" 
                    border rounded py-2
                    pl-2  w-3/4 text-black
                     focus:focus:border-secondary-100"
            {...register("technology2", {
              validate: () => {
                if (!isUnique(selectedTechnologies)) {
                  return "Hay una tecnología repetida.";
                }
              },
            })}
            id="technology2"
          >
            <option value="">Selecciona una tecnología</option>
            {(technologies ?? []).map((technology: Technology) => {
              return <option value={technology?.id}>{technology?.name}</option>;
            })}
          </select>
          <p className="text-base font-light text-red">
            {errors.technology2?.message?.toString()}
          </p>
        </label>
        <label className="">
          <h1 className="text-secondary-100 my-2 font-bold">Opción 3</h1>
          <select
            className=" 
                    border rounded py-2
                    pl-2  w-3/4 text-black
                     focus:focus:border-secondary-100"
            {...register("technology3", {
              validate: () => {
                if (!isUnique(selectedTechnologies)) {
                  return "Hay una tecnología repetida.";
                }
              },
            })}
            id="technology3"
          >
            <option value="">Selecciona una tecnología</option>
            {(technologies ?? []).map((technology: Technology) => {
              return <option value={technology?.id}>{technology?.name}</option>;
            })}
          </select>
          <p className="text-base font-light text-red">
            {errors.technology3?.message?.toString()}
          </p>
        </label>
      </div>
    </section>
  );
};

export default TechnologiesSection;
