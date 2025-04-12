
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export const OrderHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 className="text-2xl font-bold tracking-tight">Pedidos</h2>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Button>
          <Printer className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>
  );
};
