import React from "react";
import { CompanyResponse } from "../../../types/types";

interface DescriptionSectionProps {
  company: CompanyResponse["company"];
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ company }) => {
  return (
    <section className="">
      <h1 className="text-xl font-bold w-full py-1 mb-4 rounded indent-4 bg-secondary-100 text-primary uppercase">
        DESCRIPCIÓN PRINCIPAL
      </h1>
      <p>{company?.aboutUs}</p>
      <div className="mt-5">
        <h2 className="font-semibold text-xl text-darkgray">
          PRÁCTICAS FCT PARA
        </h2>
        <h3 className="mt-1">DAM, DAW Y ASIR</h3>
      </div>
      <div className="mt-5">
        <h2 className="font-semibold text-xl text-darkgray">
          MODALIDAD DE TRABAJO
        </h2>
        <h3 className="mt-1">Trabajo híbrido</h3>
      </div>
      <div className="mt-5">
        <h2 className="font-semibold text-xl text-darkgray">
          BENEFICIOS DE LA EMPRESA
        </h2>
        <ul className="mt-1">
          <li>Lugar de trabajo flexible</li>
          <li>Seguro médico</li>
          <li>Formación continua</li>
        </ul>
      </div>
    </section>
  );
};

export default DescriptionSection;
