import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SchedulePickup } from "@/components/SchedulePickup";
import { ScheduleStatus } from "@/components/ScheduleStatus";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, Filter, ShoppingBag, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const pickupLocations = [
  { id: 1, name: "Loja Centro", address: "Rua Principal, 123 - Centro" },
  { id: 2, name: "Loja Norte", address: "Av. Norte, 456 - Bairro Norte" },
  { id: 3, name: "Loja Sul", address: "Rua Sul, 789 - Bairro Sul" },
];

const SchedulePage = () => {
  const navigate = useNavigate();
  const { cartItems, scheduledItems, totalItems, updateScheduleInfo } = useCart();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  const statuses = [
    { id: "scheduled", label: "Agendado" },
    { id: "preparing", label: "Em Preparação" },
    { id: "on-the-way", label: "A Caminho" },
    { id: "delivered", label: "Entregue" },
    { id: "ready", label: "Pronto para Retirada" },
  ];
  
  const types = [
    { id: "delivery", label: "Entregas" },
    { id: "pickup", label: "Retiradas" },
  ];

  const getRandomStatus = (index: number, isPickup: boolean) => {
    const deliveryStatuses = ["scheduled", "preparing", "on-the-way", "delivered"] as const;
    const pickupStatuses = ["scheduled", "preparing", "ready", "delivered"] as const;
    
    if (isPickup) {
      return pickupStatuses[index % pickupStatuses.length];
    }
    return deliveryStatuses[index % deliveryStatuses.length];
  };

  const filteredItems = scheduledItems.filter(item => {
    const isPickup = item.scheduleInfo?.isPickup || false;
    const itemType = isPickup ? "pickup" : "delivery";
    const itemStatus = getRandomStatus(scheduledItems.indexOf(item), isPickup) as string;
    
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(itemStatus);
    const matchesType = selectedType.length === 0 || selectedType.includes(itemType);
    
    return matchesStatus && matchesType;
  });

  const groupByDate = (items: typeof scheduledItems) => {
    const groups: Record<string, typeof scheduledItems> = {};
    
    items.forEach(item => {
      if (!item.scheduleInfo?.date) return;
      
      const dateKey = item.scheduleInfo.date.toISOString().split('T')[0];
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });
    
    return groups;
  };

  const groupedItems = groupByDate(filteredItems);
  
  const sortedDates = Object.keys(groupedItems).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const today = new Date().toISOString().split('T')[0];
  const upcomingDates = sortedDates.filter(date => date >= today);
  const pastDates = sortedDates.filter(date => date < today);

  const handleStatusToggle = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  const handleTypeToggle = (type: string) => {
    setSelectedType(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const getLocationName = (locationId?: number) => {
    if (!locationId) return "";
    const location = pickupLocations.find(loc => loc.id === locationId);
    return location ? location.name : "";
  };

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
            <div className="flex justify-between items-center">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="upcoming">Próximas Entregas</TabsTrigger>
                    <TabsTrigger value="past">Entregas Passadas</TabsTrigger>
                  </TabsList>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                </div>
                
                <Collapsible
                  open={isFilterOpen}
                  onOpenChange={setIsFilterOpen}
                  className="mt-4"
                >
                  <CollapsibleContent className="bg-muted/50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="mb-2 font-medium">Filtrar por Status</div>
                        <div className="flex flex-wrap gap-4">
                          {statuses.map(status => (
                            <div key={status.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={status.id} 
                                checked={selectedStatus.includes(status.id)}
                                onCheckedChange={() => handleStatusToggle(status.id)}
                              />
                              <label 
                                htmlFor={status.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {status.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-2 font-medium">Filtrar por Tipo</div>
                        <div className="flex flex-wrap gap-4">
                          {types.map(type => (
                            <div key={type.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={type.id} 
                                checked={selectedType.includes(type.id)}
                                onCheckedChange={() => handleTypeToggle(type.id)}
                              />
                              <label 
                                htmlFor={type.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {type.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                <TabsContent value="upcoming" className="mt-6">
                  {upcomingDates.length > 0 ? (
                    <div className="space-y-8">
                      {upcomingDates.map(dateKey => (
                        <div key={dateKey}>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                            {new Date(dateKey).toLocaleDateString('pt-BR', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {groupedItems[dateKey].map((item, index) => {
                              const isPickup = item.scheduleInfo?.isPickup;
                              const locationId = item.scheduleInfo?.locationId;
                              
                              return (
                                <Card key={index} className="overflow-hidden">
                                  <CardHeader className="pb-2">
                                    <div className="flex justify-between">
                                      <CardTitle>{item.product.name}</CardTitle>
                                      <Badge variant={isPickup ? "outline" : "default"} className={isPickup ? "border-amber-500 text-amber-600" : ""}>
                                        {isPickup ? "Retirada" : "Entrega"}
                                      </Badge>
                                    </div>
                                    <CardDescription>
                                      {item.quantity} unidades
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <ScheduleStatus 
                                      status={getRandomStatus(index, !!isPickup) as any}
                                      scheduledDate={item.scheduleInfo?.date || new Date()}
                                      estimatedDeliveryTime={item.scheduleInfo?.time}
                                    />
                                    
                                    {isPickup && locationId && (
                                      <div className="mt-3 flex items-start text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                                        <div>
                                          <p className="font-medium">{getLocationName(locationId)}</p>
                                          <p className="text-muted-foreground">
                                            {pickupLocations.find(loc => loc.id === locationId)?.address}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </CardContent>
                                  <CardFooter className="bg-muted/10 border-t flex justify-between">
                                    <div className="text-sm">
                                      <span className="font-medium">Total:</span> R$ {(item.product.price * item.quantity).toFixed(2)}
                                    </div>
                                    <Button variant="outline" size="sm">
                                      Detalhes
                                    </Button>
                                  </CardFooter>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Nenhuma entrega agendada</h3>
                      <p className="text-muted-foreground mb-6">
                        Você não tem entregas futuras agendadas.
                      </p>
                      <Button onClick={() => navigate('/produtos')}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Explorar Produtos
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past" className="mt-6">
                  {pastDates.length > 0 ? (
                    <div className="space-y-8">
                      {pastDates.map(dateKey => (
                        <div key={dateKey}>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                            {new Date(dateKey).toLocaleDateString('pt-BR', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {groupedItems[dateKey].map((item, index) => (
                              <Card key={index} className="overflow-hidden border-l-4 border-l-gray-300">
                                <CardHeader className="pb-2">
                                  <CardTitle>{item.product.name}</CardTitle>
                                  <CardDescription>
                                    {item.quantity} unidades
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <ScheduleStatus 
                                    status="delivered"
                                    scheduledDate={item.scheduleInfo?.date || new Date()}
                                    estimatedDeliveryTime={item.scheduleInfo?.time}
                                  />
                                </CardContent>
                                <CardFooter className="bg-muted/10 border-t flex justify-between">
                                  <div className="text-sm">
                                    <span className="font-medium">Total:</span> R$ {(item.product.price * item.quantity).toFixed(2)}
                                  </div>
                                  <Button variant="outline" size="sm">
                                    Pedir Novamente
                                  </Button>
                                </CardFooter>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Nenhuma entrega passada</h3>
                      <p className="text-muted-foreground">
                        Você não tem histórico de entregas passadas.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
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
        )}
        
        {totalItems > 0 && totalItems >= 100 && scheduledItems.length === 0 && (
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SchedulePage;
