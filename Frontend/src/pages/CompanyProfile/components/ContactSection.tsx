import React from "react";
import { TiMail, TiHome } from "react-icons/ti";
import { CompanyResponse } from "../../../types/types";

interface ContactSectionProps {
  company: CompanyResponse["company"];
}

const ContactSection: React.FC<ContactSectionProps> = ({ company }) => {
  return (
    <aside className="w-full">
      <h1 className="text-xl font-bold w-full pb-1 py-1 mb-4 mt-5 lg:mt-0 rounded indent-4 text-secondary-100 bg-primary uppercase">
        CONTACTO
      </h1>
      <ul>
        <li>
          <div className="flex items-center">
            <div className="text-secondary-100 text-xl mr-1">
              <TiMail />
            </div>
            <h1>{company?.email}</h1>
          </div>
        </li>
        {company?.website && (
          <li>
            <div className="flex items-center">
              <div className="text-secondary-100 text-xl mr-1">
                <TiHome />
              </div>
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {company.companyName}
              </a>
            </div>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default ContactSection;
