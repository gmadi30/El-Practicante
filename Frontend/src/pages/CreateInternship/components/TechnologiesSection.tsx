import { FC, useEffect, useState } from "react";
import { UseFormRegister, useFormContext } from "react-hook-form";
import { Technology } from "../../../types/types";
import { ImFloppyDisk } from "react-icons/im";

interface TechnologiesSectionProps {
  availableTechnologies: Technology[];
  internshipTechnologies: Technology[] | [];
  register: UseFormRegister<any>;
}

const TechnologiesSection: FC<TechnologiesSectionProps> = ({
  availableTechnologies,
  internshipTechnologies,
  register,
}) => {
  // Obtiene métodos y estados del contexto del formulario
  const { formState, getValues, setError, setValue, clearErrors } =
    useFormContext();
  const { errors } = formState;

  // Estado para almacenar las tecnologías seleccionadas
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    Technology[]
  >([...internshipTechnologies]);

  // Actualiza el valor del formulario cuando cambian las tecnologías seleccionadas
  useEffect(() => {
    setValue("selectedTechnologies", selectedTechnologies);
  }, [selectedTechnologies, setValue]);

  // Maneja la adición de una nueva tecnología a la lista de seleccionadas
  const handleAddTechnology = () => {
    const technologyId = getValues("technologySelect");

    const selectedTechnologyAvailable = availableTechnologies.find(
      (tech) => tech.id === parseInt(technologyId)
    );

    const technologyRepeated = selectedTechnologies.find(
      (tech) => tech.id === parseInt(technologyId)
    );

    if (technologyRepeated) {
      setError("technologySelect", {
        type: "manual",
        message: `Ya has añadido la technologia a tu lista`,
      });
      return;
    }

    if (!selectedTechnologyAvailable) {
      setError("technologySelect", {
        type: "manual",
        message: "Debe seleccionar una tecnología válida",
      });
      return;
    }

    const updatedTechnologies = [
      ...selectedTechnologies,
      selectedTechnologyAvailable,
    ];

    setValue("selectedTechnologies", updatedTechnologies);
    setSelectedTechnologies(updatedTechnologies);
    clearErrors("technologySelect");
  };

  // Maneja la eliminación de una tecnología de la lista de seleccionadas
  const handleRemoveTechnology = (technology: Technology) => {
    const updatedTechnologies = selectedTechnologies.filter(
      (tech) => tech.id !== technology.id
    );

    setSelectedTechnologies(updatedTechnologies);
    setValue("selectedTechnologies", updatedTechnologies);
  };

  return (
    <section className="my-5 md">
      <h1 className="text-xl xl:text-2xl font-bold max-w-xs py-1 my-3 rounded indent-4 bg-secondary-100 text-primary uppercase">
        TECNOLOGÍAS
      </h1>
      <h2 className="xl:text-xl">¿Qué tecnologías utilizaste?</h2>
      <h3 className="text-gray xl:text-xl my-1">
        Es obligatorio completar al menos 1 opción
      </h3>
      <div className="flex flex-col gap-4">
        <label>
          <h1 className="text-secondary-100 my-2 font-bold">Tecnología</h1>
          <select
            id="technologySelect"
            className="border rounded py-2 pl-2 w-3/4 text-black focus:border-secondary-100"
            defaultValue=""
            {...register("technologySelect")}
          >
            <option value="">Selecciona una tecnología</option>
            {availableTechnologies
              .filter(
                (tech) =>
                  !selectedTechnologies.some(
                    (selectedTech) => selectedTech.id === tech.id
                  )
              )
              .map((technology: Technology) => (
                <option key={technology.id} value={technology.id.toString()}>
                  {technology.name}
                </option>
              ))}
          </select>
          {selectedTechnologies.length < 3 && (
            <button
              type="button"
              className="bg-secondary-100 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
              onClick={handleAddTechnology}
            >
              Añadir
            </button>
          )}
          <p className="text-base font-light text-red">
            {errors.technologySelect?.message?.toString()}
          </p>
        </label>
      </div>
      <ul className="mt-4">
        {selectedTechnologies.map((technology) => (
          <li key={technology.id} className="flex gap-4 items-center mt-4">
            <div className="text-secondary-100">
              <ImFloppyDisk />
            </div>
            <span>{technology.name}</span>
            <button
              type="button"
              className="bg-red text-white font-bold py-1 px-2 text-sm rounded shadow"
              onClick={() => handleRemoveTechnology(technology)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TechnologiesSection;
