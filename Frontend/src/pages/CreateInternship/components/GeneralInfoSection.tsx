import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { School, Company, Degree } from "../../../types/types";

interface GeneralInfoSectionProps {
  schools: School[];
  companies: Company[];
  degrees: Degree[];
}

const GeneralInfoSection: FC<GeneralInfoSectionProps> = ({
  schools,
  companies,
  degrees,
}) => {
  const { register, watch, formState } = useFormContext();
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const { errors } = formState;
  const [validateDateDifferenceMessage, setValidateDateDifferenceMessage] =
    useState(false);

  useEffect(() => {
    const validateDateDifference = () => {
      if (startDate && endDate) {
        const differenceInTime =
          new Date(endDate).getTime() - new Date(startDate).getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if (differenceInDays <= 50) {
          setValidateDateDifferenceMessage(true);
        } else {
          setValidateDateDifferenceMessage(false);
        }
      }
    };

    validateDateDifference(); // Call the function when the component mounts and whenever startDate or endDate changes
  }, [startDate, endDate]); // Add dependencies to the useEffect hook

  return (
    <section className="my-10">
      <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase">
        DATOS GENERALES
      </h1>
      <p className="my-2 xl:text-xl">
        ¿Ya acabaste tus prácticas? ¿Dónde las hiciste? Cuéntanos todo...
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row">
          <label className="flex-grow">
            <h1 className="text-secondary-100 my-2 font-bold">
              Centro de educación
            </h1>
            <select
              className="border rounded py-2 pl-2 w-3/4 text-black focus:focus:border-secondary-100"
              {...register("school", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            >
              <option value="">Selecciona un Centro de Educación</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
            <p className="text-base font-light text-red">
              {errors.school?.message?.toString()}
            </p>{" "}
          </label>
          <label className="flex-grow">
            <h1 className="text-secondary-100 my-2 font-bold">Empresa</h1>
            <select
              className="border rounded py-2 pl-2 w-3/4 text-black focus:focus:border-secondary-100"
              {...register("comppany", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            >
              <option value="">Selecciona una Empresa</option>
              {companies.map((company) => (
                <option key={company.companyId} value={company.companyId}>
                  {company.companyName}
                </option>
              ))}
            </select>
            <p className="text-base font-light text-red">
              {errors.comppany?.message?.toString()}
            </p>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="md:w-1/2">
            <h1 className="text-secondary-100 my-2 font-bold">
              Grado profesional
            </h1>
            <select
              className="border rounded py-2 pl-2 w-3/4 text-black focus:focus:border-secondary-100"
              {...register("degree", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            >
              <option value="">Selecciona un Grado</option>
              {degrees.map((degree) => (
                <option key={degree.id} value={degree.id}>
                  {degree.name}
                </option>
              ))}
            </select>
            <p className="text-base font-light text-red">
              {errors.degree?.message?.toString()}
            </p>
          </label>
        </div>
        <div className="md:flex">
          <label className="font-bold">
            <h1 className="text-secondary-100 my-2">Fecha inicio</h1>
            <input
              {...register("startDate", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
              id="startDate"
              type="date"
              className="border focus:outline-none focus:border-secondary-100 w-3/4 md:w-fit py-2 pl-2 rounded font-normal"
            />
            <p className="text-base font-light text-red">
              {errors.startDate?.message?.toString()}
            </p>
          </label>

          <label className="md:ml-10 font-bold">
            <h1 className="text-secondary-100 my-2">Fecha fin</h1>
            <input
              {...register("endDate", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
              id="endDate"
              type="date"
              className="border focus:outline-none focus:border-secondary-100 w-3/4 md:w-fit py-2 pl-2 rounded font-normal"
              disabled={!startDate ? true : false}
            />
            <p className="text-base font-light text-red">
              {errors.endDate?.message?.toString()}
            </p>
          </label>
        </div>
      </div>
      <p className="text-base font-light text-red">
        {validateDateDifferenceMessage &&
          "La fecha de fin no puede ser inferior a la fecha de inicio. Mínimo 50 días."}
      </p>
    </section>
  );
};

export default GeneralInfoSection;
