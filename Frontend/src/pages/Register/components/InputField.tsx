import React from "react";
import { FieldErrors, UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputFieldProps {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  type?: string;
  validation?: RegisterOptions;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  register,
  errors,
  type = "text",
  validation,
}) => {
  return (
    <label htmlFor={id} className="text-sm font-bold md:text-xl">
      <h1 className="text-secondary-100">{label}</h1>
      <input
        {...register(id, validation)}
        id={id}
        type={type}
        placeholder={label}
        className="border focus:outline-none focus:bg-primary w-full py-2 pl-2 rounded font-normal placeholder:opacity-60"
      />
      <p className="text-base font-light text-red">
        {errors[id]?.message as string}
      </p>
    </label>
  );
};

export default InputField;
