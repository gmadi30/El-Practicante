import { Company } from "../../../types/types";
import { imgCompanyUrl } from "../../../utils/ImagesUtils";

interface CompanyHeaderProps {
  company: Company;
}

const Header: React.FC<CompanyHeaderProps> = (props) => {
  return (
    <header className="">
      <div className="flex justify-center items-center py-10 bg-primary h-[6rem] mt-20 xl:mx-64 ">
        <img
          src={imgCompanyUrl(props?.company?.companyName)}
          className="bg-white block w-[250px] h-[150px] object-cover border-4  border-secondary-300"
        ></img>
      </div>

      <div className="flex flex-col justify-center items-center my-14 rounded mx-1 p-3 ">
        <h1 className="text-4xl font-semibold mb-3">
          {props?.company?.companyName}
        </h1>
        <h3 className="lg:text-xl">
          {props?.company?.city}, {props?.company?.autonomousCommunity}{" "}
        </h3>
        <h3 className="text-sm lg:text-xl">
          {" "}
          {props?.company?.internships &&
            props?.company?.internships.length}{" "}
          <span className="text-secondary-100 font-bold">Practicantes</span> de
          FP
        </h3>
        <h3 className="text-sm lg:text-xl">
          {props?.company?.employeesAmount} Empleados
        </h3>
      </div>
    </header>
  );
};

export default Header;
