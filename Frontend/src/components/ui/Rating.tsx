import React from "react";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Ensure the rating is within the range of 0 to 5
  const clampedRating = Math.max(0, Math.min(5, rating));

  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          style={{
            color: index < clampedRating ? "gold" : "gray",
            cursor: "pointer",
          }}
        >
          &#9733; {/* Unicode star character */}
        </span>
      ))}
    </div>
  );
};
export default Rating;
