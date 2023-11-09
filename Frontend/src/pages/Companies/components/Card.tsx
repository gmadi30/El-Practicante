import { ImStarFull, ImStarHalf, ImCheckmark } from "react-icons/im";
import { Link } from "react-router-dom";

interface CardProps {
  profilePicture: string;
  companyName: string;
  companyReviewsAmout: string;
  city: string;
  autonomousCommunity: string;
  companyBest: string[];
  grades: string[];
  workTypes: string[];
  isEven: boolean;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="flex justify-center mb-5">
      <Link to={"/company-profile"}>
        <div className="flex flex-col px-10">
          <div className="">
            <img
              src={props.profilePicture}
              className="float-left w-[100px] h-[100px] object-cover rounded mb-3"
            ></img>
          </div>

          <div className="flex flex-col  justify-center items-center">
            <div className="flex text-xl">
              <ImStarFull></ImStarFull>
              <ImStarFull></ImStarFull>
              <ImStarFull></ImStarFull>
              <ImStarFull></ImStarFull>
              <ImStarHalf></ImStarHalf>
            </div>

            <p className=" text-base">
              <span className="font-bold">{props.companyReviewsAmout}</span>{" "}
              opiniones
            </p>
          </div>
        </div>
      </Link>
      <div
        className={`flex ${props.isEven && "bg-primary"}  pb-1  w-fit md:w-1/4`}
      >
        <div className="flex flex-col  p-4  pb-8">
          <div className="flex flex-col ">
            <h1 className="text-xl font-semibold md:text-3xl ">
              {props.companyName}
            </h1>
          </div>
          <div className="mt-2 text-base leading-5 space-y-3">
            <h2 className="mb-1">
              {props.city}
              <span>, {props.autonomousCommunity}</span>
            </h2>
            <p className="mb-1">
              Prácticas para{" "}
              {props.grades.map((element) => {
                return (
                  <span className="font-semibold text-secondary-100">
                    {element}{" "}
                  </span>
                );
              })}
            </p>
            <p className="">
              Modalidad{" "}
              {props.workTypes.map((element) => {
                return (
                  <span className="font-semibold text-secondary-100">
                    {element}{" "}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
