
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "./RatingStars";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  highlighted?: boolean;
}

export const TestimonialCard = ({
  name,
  role,
  content,
  rating,
  image,
  highlighted = false
}: TestimonialCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
      highlighted ? 'border-primary/20 shadow-md' : ''
    }`}>
      <CardContent className="p-6 relative">
        <Quote className="absolute top-4 right-4 h-16 w-16 text-gray-100 rotate-12" />
        
        <RatingStars 
          rating={rating} 
          size="md" 
          showScore={false} 
          className="mb-4"
        />
        
        <p className="text-gray-600 mb-6 relative z-10 italic">{content}</p>
        
        <div className="flex items-center mt-4">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="h-10 w-10 rounded-full mr-3 object-cover border-2 border-gray-100 shadow-sm"
            />
          ) : (
            <div className={`h-10 w-10 rounded-full mr-3 flex items-center justify-center text-white bg-gradient-to-br from-primary to-primary-600 font-semibold shadow-sm`}>
              {name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
