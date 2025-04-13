
import { Calendar, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NoScheduledItemsProps {
  type: "upcoming" | "past";
}

export const NoScheduledItems = ({ type }: NoScheduledItemsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-10">
      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">
        {type === "upcoming" ? "Nenhuma entrega agendada" : "Nenhuma entrega passada"}
      </h3>
      <p className="text-muted-foreground mb-6">
        {type === "upcoming" 
          ? "Você não tem entregas futuras agendadas."
          : "Você não tem histórico de entregas passadas."}
      </p>
      {type === "upcoming" && (
        <Button onClick={() => navigate('/produtos')}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Explorar Produtos
        </Button>
      )}
    </div>
  );
};
