import { FC } from "react";
import { useFormContext } from "react-hook-form";

const DescriptionSection: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="my-10">
      <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase">
        DESCRIPCIÓN PRINCIPAL
      </h1>
      <p className="my-2 xl:text-xl">
        En esta sección comparte de forma general tus prácticas.
      </p>
      <label className="font-bold">
        <h1 className="text-secondary-100 my-2">Título</h1>
        <input
          {...register("title", {
            required: {
              value: true,
              message: "Este campo es obligatorio",
            },
          })}
          id="title"
          type="text"
          placeholder="Prácticas inolvidables"
          className="border focus:outline-none focus:border-secondary-100 w-3/4 py-2 pl-2 rounded font-normal my-1"
        />
        <p className="text-base font-light text-red">
          {errors.title?.message?.toString()}
        </p>
      </label>
      <label>
        <h1 className="text-secondary-100 my-2 font-bold">Descripción</h1>
        <textarea
          {...register("description", {
            required: {
              value: true,
              message: "Este campo es obligatorio",
            },
          })}
          placeholder="He realizado mis prácticas en Indra y no puedo estar más contento de lo que he aprendido..."
          rows={6}
          className="resize-none border focus:outline-none focus:border-secondary-100 w-3/4 py-2 pl-2 rounded font-normal"
        ></textarea>
        <p className="text-base font-light text-red">
          {errors.description?.message?.toString()}
        </p>
      </label>
    </section>
  );
};

export default DescriptionSection;
