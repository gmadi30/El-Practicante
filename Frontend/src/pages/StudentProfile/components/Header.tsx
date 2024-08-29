import { TiMail, TiSocialLinkedin } from "react-icons/ti";
import { StudentProfile } from "../../../types/types";
import { LuPencilLine } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../components/context/AuthContext";

interface HeaderProps {
  student: StudentProfile;
}

const Header: React.FC<HeaderProps> = (props) => {
  const impagesFolderPath = "../../../assets/students/";
  const navigate = useNavigate();
  const { authenticated, studentId } = useAuth();
  const params = useParams();

  const handleProfilePicture = (name: string) => {
    return new URL(`${impagesFolderPath}${name}`, import.meta.url).href;
  };

  const navigateToEditProfile = () => {
    navigate(`/student/${props.student?.student?.id}/edit-profile`);
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
            <span>Estudiante de {props.student?.degree?.name} | </span>
            <span className="text-gray-400">
              {" "}
              {props.student?.school?.name}
            </span>
          </div>
          <h3 className="">
            {props.student?.student?.city},{" "}
            {props.student?.student?.autonomousCommunity}
          </h3>
          {authenticated && studentId.toString() == params.studentId && (
            <button
              className="text-sm gap-2 border rounded border-black px-4 py-2 mt-2 bg-secondary-100 text-white font-semibold flex items-center hover:bg-secondary-200"
              onClick={navigateToEditProfile}
            >
              <h1>Editar Perfíl</h1>
              <div className="text-base ">
                <LuPencilLine />
              </div>
            </button>
          )}
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
