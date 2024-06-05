interface FormErrorMessageProps {
  message: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => {
  return <p className="text-base font-light text-red">{message}</p>;
};

export default FormErrorMessage;
