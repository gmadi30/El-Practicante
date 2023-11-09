import { useForm } from "react-hook-form";

interface InputFormProps {
  type: string;
  placeHolder: string;
  title: string;
  id: string;
}
const InputForm: React.FC<InputFormProps> = (props) => {
  const { register } = useForm();
  const { name, ref, onChange, onBlur } = register(props.id);
  return (
    <label htmlFor={props.id} className="text-sm font-bold md:text-xl">
      <h1 className="text-secondary-100">{props.title}</h1>
      <input
        id={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        type={props.type}
        placeholder={props.placeHolder}
        className="border
                    focus:outline-none
                    focus:bg-primary
                    w-full
                    py-2
                    pl-2
                    rounded
                    font-normal
                    placeholder:opacity-60
                    "
      />
    </label>
  );
};

export default InputForm;
