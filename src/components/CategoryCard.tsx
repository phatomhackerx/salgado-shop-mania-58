
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

type CategoryCardProps = {
  icon: string;
  name: string;
  slug: string;
};

export const CategoryCard = ({ icon, name, slug }: CategoryCardProps) => {
  return (
    <Link to={`/categorias/${slug}`}>
      <Card className="text-center hover:shadow-md transition-shadow group cursor-pointer h-full">
        <CardContent className="p-6 flex flex-col items-center space-y-2">
          <div className="p-3 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
            <img 
              src={icon} 
              alt={name} 
              className="w-10 h-10 object-contain animate-float" 
            />
          </div>
          <h3 className="font-medium text-gray-800">{name}</h3>
          <div className="mt-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Ver produtos
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
