import React, { Dispatch, useState } from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

interface RatingBarProps {}

const RatingBar: React.FC<RatingBarProps> = () => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating((prevRating) =>
      newRating === 1 && prevRating === 1 ? 0 : newRating
    );
  };

  return (
    <div className="flex flex-col my-8 text-center w-fit">
      <p className="text-lg font-semibold">Calificación: {rating}</p>
      <div className="flex space-x-2 text-3xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="cursor-pointer"
            onClick={() => {
              handleRatingChange(star);
            }}
          >
            {star <= rating ? (
              <IoIosStar color="#06748e" />
            ) : (
              <IoIosStarOutline color="#D2EDF0" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingBar;
