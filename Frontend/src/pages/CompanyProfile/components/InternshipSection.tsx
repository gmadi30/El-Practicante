import React from "react";
import { CompanyResponse } from "../../../types/types";
import Rating from "../../../components/ui/shared/Rating";
import { imgStudentProfile } from "../../../utils/ImagesUtils";
import { useNavigate } from "react-router-dom";

interface InternshipSectionProps {
  internships: CompanyResponse["company"]["internships"];
}

const InternshipSection: React.FC<InternshipSectionProps> = ({
  internships,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (studentId: number) => {
    navigate(`/student/${studentId}/profile`);
  };

  return (
    <section>
      <h1 className="w-full text-xl font-bold pb-1 my-3 py-1 rounded indent-4 bg-secondary-100 text-primary uppercase">
        OPINIONES
      </h1>
      {internships &&
        internships.map((internship, index) => (
          <div key={index} className="flex mx-2 space-y-2">
            <div
              onClick={() => handleNavigate(internship.student.id)}
              className="flex flex-col items-center justify-center text-center p-2 min-w-fit cursor-pointer"
            >
              <img
                className="float-left w-[100px] h-[100px] object-cover rounded-full mb-3"
                src={imgStudentProfile(internship.student.profilePictureName)}
                alt=""
              />
              <div className="flex flex-col justify-center items-center text-sm my-3">
                {
                  internship.isAnonymous ? <h1>Usuario anonimo</h1> : 
                <h1 className="font-bold">
                  {internship.student.name} {internship.student.lastName}
                </h1>
                }
                <h2>{internship.school.name}</h2>
                <h2>{internship.degree.name}</h2>
              </div>
            </div>
            <div className="flex flex-col w-full h-fit pb-1 bg-primary py-3 px-2">
              <div className="text-sm">
                <div className="flex">
                  <Rating rating={internship.rating} />
                  <h1 className="font-semibold ml-2">{internship.title}</h1>
                </div>
                <h2 className="text-xs">{internship.submittedDate}</h2>
                
                <div className="flex flex-col space-between">
                  <p className="line-clamp-3 mt-1 text-left text-sm">
                    {internship.description}
                  </p>
                </div>
              </div>
              <p className="flex text-sm my-2">
                <span className="text-secondary-100 font-bold mr-1">
                  Tecnologías:{" "}
                  {internship.technologyList.map((technology) => (
                    <span key={technology.name}>{technology.name} </span>
                  ))}
                </span>
              </p>
            </div>
          </div>
        ))}
    </section>
  );
};

export default InternshipSection;
