import profilePicture from "../../../assets/img/me.png";

interface CardProps {
  //profilePicture ¿Como se hace?
  name: string;
  lastName: string;
  school: string;
  grade: string;
  websiteThoughts: string;
  middle: boolean;
}
const impagesFolderPath = "../../../assets/img/";

const imgStudentProfile = (name: string) => {
  return new URL(`${impagesFolderPath}${name}.png`, import.meta.url).href;
};

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`flex flex-col mx-auto items-center border-4 ${
        props.middle ? "border-primary" : "border-secondary-100"
      } rounded-xl text-center w-[75%] h-fit p-3 mt-1`}
    >
      <header className="flex flex-col justify-center items-center">
        <img
          src={imgStudentProfile(props.name)}
          className="float-left w-[100px] h-[100px] object-cover rounded-full mb-3"
        ></img>

        <div className="mt-5 font-semibold">
          <h1 className=" text-lg">
            <span>{props.name} </span>
            <span>{props.lastName}</span>
          </h1>
          <h2>{props.school}</h2>
          <h3>{props.grade}</h3>
        </div>
      </header>
      <hr className="w-20 my-5 text-red"></hr>
      <p className="">{props.websiteThoughts}</p>
    </div>
  );
};

export default Card;
