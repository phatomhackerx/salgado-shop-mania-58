
import { SortAsc, SortDesc, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortMode = "name" | "price-asc" | "price-desc" | "popular";
type ViewMode = "grid" | "list";

interface SortControlsProps {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isMobile: boolean;
}

export const SortControls = ({ 
  sortMode, 
  setSortMode, 
  viewMode, 
  setViewMode,
  isMobile 
}: SortControlsProps) => {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            {sortMode === "name" && <SortAsc className="h-4 w-4" />}
            {sortMode === "price-asc" && <SortAsc className="h-4 w-4" />}
            {sortMode === "price-desc" && <SortDesc className="h-4 w-4" />}
            {sortMode === "popular" && <SlidersHorizontal className="h-4 w-4" />}
            <span className="hidden sm:inline">Ordenar</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setSortMode("popular")}>
            Mais populares
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortMode("name")}>
            Nome (A-Z)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortMode("price-asc")}>
            Preço (menor ao maior)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortMode("price-desc")}>
            Preço (maior ao menor)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {!isMobile && (
        <div className="flex border rounded-md overflow-hidden">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="rounded-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="rounded-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
