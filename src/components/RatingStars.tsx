
import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
  reviewCount?: number;
  className?: string;
  showTooltip?: boolean;
}

export const RatingStars = ({
  rating,
  maxRating = 5,
  size = "md",
  showScore = false,
  reviewCount,
  className = "",
  showTooltip = false
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
  
  const renderStars = () => (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i}
            className={`${starSizes[size]} ${
              i < Math.floor(rating) 
                ? "text-yellow-400 fill-yellow-400" 
                : i < Math.floor(rating) + 0.5 
                  ? "text-yellow-400 fill-yellow-400 opacity-60" 
                  : "text-gray-300"
            } transition-colors duration-200`}
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

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {renderStars()}
        </TooltipTrigger>
        <TooltipContent className="bg-white border shadow-md">
          <p className="font-medium">{rating.toFixed(1)} de {maxRating} estrelas</p>
          {reviewCount !== undefined && (
            <p className="text-xs text-gray-500">{reviewCount} avaliações</p>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return renderStars();
};
