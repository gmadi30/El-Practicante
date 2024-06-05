import React from "react";
import { FieldErrors, UseFormRegister, RegisterOptions } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  options: { value: string | number; label: string }[];
  validation?: RegisterOptions;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  register,
  errors,
  options,
  validation,
}) => {
  return (
    <label htmlFor={id} className="text-sm font-bold md:text-xl">
      <h1 className="text-secondary-100">{label}</h1>
      <select
        {...register(id, validation)}
        id={id}
        className="border focus:outline-none focus:bg-primary w-full py-2 pl-2 rounded font-normal"
      >
        <option value="">Seleccionar {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="text-base font-light text-red">
        {errors[id]?.message as string}
      </p>
    </label>
  );
};

export default SelectField;
