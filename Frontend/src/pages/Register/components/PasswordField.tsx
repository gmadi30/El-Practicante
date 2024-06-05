import React from "react";
import { FieldErrors, UseFormRegister, RegisterOptions } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface PasswordFieldProps {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  showPassword: boolean;
  togglePassword: () => void;
  validation?: RegisterOptions;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  id,
  register,
  errors,
  showPassword,
  togglePassword,
  validation,
}) => {
  return (
    <label htmlFor={id} className="text-sm font-bold md:text-xl">
      <h1 className="text-secondary-100">{label}</h1>
      <div className="relative">
        <input
          {...register(id, validation)}
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={label}
          className="border focus:outline-none focus:bg-primary w-full py-2 pl-2 rounded font-normal placeholder:opacity-60"
        />
        <span
          onClick={togglePassword}
          className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <p className="text-base font-light text-red">
        {errors[id]?.message as string}
      </p>
    </label>
  );
};

export default PasswordField;
