
import { CalendarClock, Clock, ShoppingCart, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface PromotionCardProps {
  title: string;
  description: string;
  image: string;
  discount: string;
  endDate?: string;
  link: string;
  theme?: "primary" | "secondary" | "accent";
}

export const PromotionCard = ({
  title,
  description,
  image,
  discount,
  endDate,
  link,
  theme = "primary"
}: PromotionCardProps) => {
  const themeClasses = {
    primary: "from-primary/20 to-primary/5 border-primary/20",
    secondary: "from-secondary/20 to-secondary/5 border-secondary/20",
    accent: "from-accent/20 to-accent/5 border-accent/20"
  };
  
  const themeBadgeClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  };
  
  const themeTextClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent"
  };

  return (
    <Card className={`overflow-hidden border-2 bg-gradient-to-br ${themeClasses[theme]} transition-all duration-300 hover:shadow-xl group`}>
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <Badge className={`absolute top-2 right-2 ${themeBadgeClasses[theme]} text-lg px-3 py-1.5 shadow-lg flex items-center gap-1`}>
          <Sparkles className="h-3.5 w-3.5" />
          {discount}
        </Badge>
        
        {endDate && (
          <div className="absolute bottom-2 left-2 flex items-center bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            <Clock className="h-3 w-3 mr-1" />
            Válido até {endDate}
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center p-5 pt-0">
        <Button asChild variant="ghost" className={`${themeTextClasses[theme]} p-0 hover:bg-transparent hover:underline flex items-center gap-1`}>
          <Link to={link}>
            <Tag className="h-3.5 w-3.5" />
            Ver detalhes
          </Link>
        </Button>
        
        <Button asChild variant="secondary" size="sm" className="gap-2 shadow-sm hover:shadow-md transition-all">
          <Link to={link}>
            <ShoppingCart className="h-4 w-4" />
            Aproveitar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
