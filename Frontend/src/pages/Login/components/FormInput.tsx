import { UseFormRegister } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: ReturnType<UseFormRegister<any>>;
  error?: any;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type,
  placeholder,
  register,
  error,
}) => {
  return (
    <label htmlFor={id} className="text-sm font-bold md:text-xl">
      <h1 className="text-secondary-100">{label}</h1>
      <input
        {...register}
        id={id}
        type={type}
        placeholder={placeholder}
        className="border focus:outline-none focus:bg-primary w-full py-2 pl-2 rounded font-normal placeholder:opacity-60"
      />
      {error && <FormErrorMessage message={error.message} />}
    </label>
  );
};

export default FormInput;
