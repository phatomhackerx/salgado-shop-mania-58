
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ShoppingBag } from "lucide-react";

export const ScheduleEmptyState = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-16 bg-muted/20 rounded-lg">
      <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Nenhum Agendamento</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        Você ainda não tem entregas agendadas. Adicione produtos ao carrinho e agende uma entrega para eventos ou ocasiões especiais.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={() => navigate('/produtos')} variant="default">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Explorar Produtos
        </Button>
        <Button onClick={() => navigate('/combos')} variant="outline">
          Ver Combos para Eventos
        </Button>
      </div>
    </div>
  );
};
