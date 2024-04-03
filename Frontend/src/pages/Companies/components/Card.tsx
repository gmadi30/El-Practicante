import { useNavigate } from "react-router-dom";
import Rating from "../../../components/ui/shared/Rating";

interface CardProps {
  profilePicture: string;
  companyName: string;
  companyReviewsAmount: string;
  city: string;
  autonomousCommunity: string;
  companyBest: string[];
  grades: string[];
  workTypes: string[];
  isEven: boolean;
  companyRating: number;
  companyId: number;
}

const Card: React.FC<CardProps> = (props) => {
  const impagesFolderPath = "../../../assets/img/";
  const navigate = useNavigate();

  const imgUrl = new URL(
    `${impagesFolderPath}${props.companyName}.png`,
    import.meta.url
  ).href;

  const navigateToProfile = () => {
    navigate(`/company/${props.companyId}/profile`);
  };

  return (
    <div className="flex justify-center mb-5 ">
      <div
        onClick={navigateToProfile}
        className="flex flex-col px-10 hoverCompanyProfileImage"
      >
        <div className="">
          <img
            src={imgUrl}
            className="float-left w-[100px] h-[100px] object-cover rounded mb-3"
          ></img>
        </div>

        <div className="flex flex-col  justify-center items-center">
          <div className="flex text-xl">
            <Rating rating={props.companyRating}></Rating>
          </div>

          <p className=" text-base">
            <span className="font-bold">{props.companyReviewsAmount}</span>{" "}
            opiniones
          </p>
        </div>
      </div>
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
