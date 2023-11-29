import { TiMail, TiSocialLinkedin } from "react-icons/ti";
import { StudentProfile } from "../../../types/types";

interface HeaderProps {
  student: StudentProfile;
}

const Header: React.FC<HeaderProps> = (props) => {
  const impagesFolderPath = "../../../assets/students/";

  const handleProfilePicture = (name: string) => {
    return new URL(`${impagesFolderPath}${name}`, import.meta.url).href;
  };

  return (
    <header>
      <div className="flex justify-center items-center py-10 bg-primary h-32 mt-20 rounded">
        <img
          src={handleProfilePicture(props.student?.profilePicture?.name)}
          className="block w-[176px] h-[176px] object-cover rounded-full border-4 border-secondary-300"
        ></img>
      </div>

      <div className="flex flex-col  mt-10 rounded mx-1 p-3 text-xl">
        <div className="md:flex md:flex-col md:justify-center md:items-center">
          <h1 className="font-bold mb-1 bg-secondary-100 text-white px-2 uppercase text-xl max-w-xs">
            Información Personal
          </h1>

          <div className="flex space-x-1">
            <h1 className="text-2xl font-semibold">
              {props.student?.student?.name}
            </h1>
            <h1 className="text-2xl font-semibold">
              {props.student?.student?.lastName}
            </h1>
          </div>

          <div className="text-gray-400 ">
            <span>Estudiante de {props.student?.degreeDTO?.name} | </span>
            <span className="text-gray-400">
              {" "}
              {props.student?.schoolDTO?.name} |
            </span>
            <span className="text-gray-400"> Clase de {2022}</span>
          </div>
          <h3 className="">
            {props.student?.student?.city},{" "}
            {props.student?.student?.autonomousCommunity}
          </h3>
        </div>

        <div className="mt-10">
          <div className="flex align-middle items-center">
            <div className="text-secondary-100 text-3xl mr-1">
              <TiMail></TiMail>
            </div>
            <h1>{props.student?.student?.email} </h1>
          </div>
          <div className="flex align-middle items-center">
            <div className="text-secondary-100 text-3xl mr-1">
              <TiSocialLinkedin></TiSocialLinkedin>
            </div>
            <a
              href="https://www.linkedin.com/in/georges-madi/"
              target="_blank"
              rel="noreferrer"
              className="text"
            >
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
