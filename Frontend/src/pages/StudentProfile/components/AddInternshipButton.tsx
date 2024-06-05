// src/components/Profile/AddInternshipButton.tsx
import React from "react";

interface AddInternshipButtonProps {
  onClick: () => void;
}

const AddInternshipButton: React.FC<AddInternshipButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="container w-fit rounded border-cyan-600 bg-secondary-100 text-white px-5 py-2 font-bold uppercase tracking-[0.1rem] my-5 hover:bg-secondary-200 xl:text-2xl"
      >
        <p>AÑADIR PRÁCTICA</p>
      </button>
    </div>
  );
};

export default AddInternshipButton;
