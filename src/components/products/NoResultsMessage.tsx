
import { Button } from "@/components/ui/button";

interface NoResultsMessageProps {
  onClearFilters: () => void;
}

export const NoResultsMessage = ({ onClearFilters }: NoResultsMessageProps) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h2>
      <p className="text-gray-500">
        Tente ajustar seus filtros ou buscar por outro termo.
      </p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={onClearFilters}
      >
        Limpar filtros
      </Button>
    </div>
  );
};
