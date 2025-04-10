
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
  reviewCount?: number;
  className?: string;
}

export const RatingStars = ({
  rating,
  maxRating = 5,
  size = "md",
  showScore = false,
  reviewCount,
  className = ""
}: RatingStarsProps) => {
  const starSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i}
            className={`${starSizes[size]} ${
              i + 1 <= Math.floor(rating) 
                ? "text-yellow-400 fill-yellow-400" 
                : i + 0.5 < rating 
                  ? "text-yellow-400 fill-yellow-400 opacity-60" 
                  : "text-gray-300"
            }`}
          />
        ))}
      </div>
      
      {showScore && (
        <span className={`ml-1.5 font-medium text-gray-700 ${textSizes[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
      
      {reviewCount !== undefined && (
        <span className={`ml-1 text-gray-500 ${textSizes[size]}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
