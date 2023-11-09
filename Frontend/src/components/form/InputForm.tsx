interface InputFormProps {
  type: string;
  placeHolder: string;
  title: string;
}
const InputForm: React.FC<InputFormProps> = (props) => {
  return (
    <label className="text-sm font-bold md:text-xl">
      <h1 className="text-secondary-100">{props.title}</h1>
      <input
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
