
import { Search, Filter, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoResultsMessageProps {
  searchTerm?: string;
  hasFilters?: boolean;
  onClearFilters: () => void;
  onBackToAll?: () => void;
  message?: string;
}

export const NoResultsMessage = ({
  searchTerm,
  hasFilters = false,
  onClearFilters,
  onBackToAll,
  message,
}: NoResultsMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        {searchTerm ? (
          <Search className="h-8 w-8 text-muted-foreground" />
        ) : hasFilters ? (
          <Filter className="h-8 w-8 text-muted-foreground" />
        ) : (
          <RefreshCw className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      
      <h2 className="text-xl font-semibold mb-2">
        {message || "Nenhum produto encontrado"}
      </h2>
      
      <p className="text-gray-500 mb-6 max-w-md">
        {searchTerm ? (
          <>Não encontramos nenhum resultado para "<strong>{searchTerm}</strong>"</>
        ) : hasFilters ? (
          <>Não encontramos produtos que correspondam aos filtros selecionados.</>
        ) : (
          <>Não há produtos disponíveis no momento. Por favor, tente novamente mais tarde.</>
        )}
      </p>
      
      <div className="flex flex-wrap justify-center gap-3">
        {(searchTerm || hasFilters) && (
          <Button 
            variant="outline"
            onClick={onClearFilters}
            className="flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Limpar {searchTerm && hasFilters ? "busca e filtros" : searchTerm ? "busca" : "filtros"}
          </Button>
        )}
        
        {onBackToAll && (
          <Button onClick={onBackToAll} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ver todos os produtos
          </Button>
        )}
      </div>
    </div>
  );
};
