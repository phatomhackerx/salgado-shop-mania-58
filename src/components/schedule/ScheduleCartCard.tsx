
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SchedulePickup } from "@/components/SchedulePickup";
import { CartItem } from "@/types/cart";

interface ScheduleCartCardProps {
  totalItems: number;
  cartItems: CartItem[];
  updateScheduleInfo: (productId: number, scheduleInfo: any) => void;
}

export const ScheduleCartCard = ({ totalItems, cartItems, updateScheduleInfo }: ScheduleCartCardProps) => {
  if (totalItems < 100 || totalItems === 0) {
    return null;
  }

  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>Agendar Entrega para seu Carrinho</CardTitle>
        <CardDescription>
          Você tem {totalItems} itens no seu carrinho que podem ser agendados para entrega.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SchedulePickup 
          onSchedule={(date, time, note, locationId, isPickup) => {
            cartItems.forEach(item => {
              updateScheduleInfo(item.product.id, { 
                date, 
                time, 
                note,
                locationId,
                isPickup
              });
            });
          }}
          currentQuantity={totalItems}
        />
      </CardContent>
    </Card>
  );
};
