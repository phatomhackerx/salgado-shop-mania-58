
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
}

export const AdminHeader = ({ sidebarOpen, onSidebarOpenChange }: AdminHeaderProps) => {
  return (
    <header className="border-b bg-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSidebarOpenChange(!sidebarOpen)}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <h1 className="text-xl font-bold text-gray-800">Painel de Administração</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm text-gray-600 hover:text-primary">
          Voltar para loja
        </Link>
      </div>
    </header>
  );
};
