
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { pickupLocations } from "@/components/schedule/LocationSelector";
import { ScheduleEmptyState } from "@/components/schedule/ScheduleEmptyState";
import { ScheduleList } from "@/components/schedule/ScheduleList";
import { ScheduleCartCard } from "@/components/schedule/ScheduleCartCard";

const SchedulePage = () => {
  const navigate = useNavigate();
  const { cartItems, scheduledItems, totalItems, updateScheduleInfo } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-500">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agendamentos</h1>
          <p className="text-gray-600">
            Gerencie seus pedidos agendados e acompanhe o status de entrega e retirada.
          </p>
        </div>

        {scheduledItems.length > 0 ? (
          <div className="space-y-6">
            <ScheduleList 
              scheduledItems={scheduledItems}
              pickupLocations={pickupLocations}
            />
          </div>
        ) : (
          <ScheduleEmptyState />
        )}
        
        <ScheduleCartCard 
          totalItems={totalItems} 
          cartItems={cartItems}
          updateScheduleInfo={updateScheduleInfo}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SchedulePage;
