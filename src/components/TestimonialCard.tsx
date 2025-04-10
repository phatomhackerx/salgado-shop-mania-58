
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
        
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        
        <p className="text-gray-600 mb-6 relative z-10">{content}</p>
        
        <div className="flex items-center mt-4">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="h-10 w-10 rounded-full mr-3 object-cover"
            />
          ) : (
            <div className={`h-10 w-10 rounded-full mr-3 flex items-center justify-center text-white bg-primary font-semibold`}>
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
