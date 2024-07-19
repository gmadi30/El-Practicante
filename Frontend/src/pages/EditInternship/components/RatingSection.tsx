import { FC } from "react";
import { useFormContext } from "react-hook-form";

const RatingSection: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="my-10">
      <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase">
        RATE IT!
      </h1>
      <p className="my-2 xl:text-xl">
        Califica tus prácticas del 1 al 5. (El 0 también es una opción 👀)
      </p>
      <label className="flex-grow">
        <h1 className="text-secondary-100 my-2 font-bold">Calificación</h1>
        <select
          className="border rounded py-2 pl-2 w-fit text-black focus:focus:border-secondary-100"
          {...register("rating", {
            required: {
              value: true,
              message: "Este campo es obligatorio",
            },
          })}
          name="rating"
          id="rating"
        >
          <option value="">Selecciona una calificación</option>
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        <p className="text-base font-light text-red">
          {errors.rating?.message?.toString()}
        </p>
      </label>
    </section>
  );
};

export default RatingSection;
