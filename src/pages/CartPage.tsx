
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ShoppingCart, CalendarClock } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/components/ui/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, scheduledItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [openScheduled, setOpenScheduled] = useState(true);
  
  const regularItems = cartItems.filter(item => !item.scheduleInfo);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Seu pedido foi recebido e será processado em breve.",
      });
      clearCart();
      navigate("/");
      setIsCheckingOut(false);
    }, 1500);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-500 mb-6">
              Adicione alguns deliciosos salgados ao seu carrinho para fazer seu pedido.
            </p>
            <Button onClick={() => navigate("/produtos")}>Ver Produtos</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              {/* Scheduled items section */}
              {scheduledItems.length > 0 && (
                <div className="mb-8">
                  <Collapsible open={openScheduled} onOpenChange={setOpenScheduled}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-primary/10 rounded-t-lg">
                      <div className="flex items-center">
                        <CalendarClock className="mr-2 h-5 w-5 text-primary" />
                        <h2 className="text-lg font-medium">Itens Agendados</h2>
                        <Badge variant="outline" className="ml-2">
                          {scheduledItems.length}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        {openScheduled ? "Ocultar" : "Mostrar"}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="bg-white rounded-b-lg shadow-sm divide-y">
                        {scheduledItems.map((item) => (
                          <div key={item.product.id} className="p-4 flex items-center">
                            <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            
                            <div className="ml-4 flex-grow">
                              <h3 className="font-medium">{item.product.name}</h3>
                              <p className="text-sm text-gray-500">{item.product.category}</p>
                              <div className="text-primary font-medium mt-1">
                                R$ {item.product.price.toFixed(2)}
                              </div>
                              {item.scheduleInfo && (
                                <div className="mt-1 text-sm bg-primary/5 inline-flex items-center px-2 py-1 rounded">
                                  <CalendarClock className="h-3 w-3 mr-1" />
                                  {formatDate(item.scheduleInfo.date)} às {item.scheduleInfo.time}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="ml-6 text-right">
                              <div className="font-bold">
                                R$ {(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-destructive mt-1"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}
              
              {/* Regular items */}
              {regularItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm divide-y">
                  {regularItems.map((item) => (
                    <div key={item.product.id} className="p-4 flex items-center">
                      <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.category}</p>
                        <div className="text-primary font-medium mt-1">
                          R$ {item.product.price.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="ml-6 text-right">
                        <div className="font-bold">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-destructive mt-1"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-4 text-right">
                    <Button 
                      variant="ghost" 
                      className="text-gray-500"
                      onClick={clearCart}
                    >
                      Limpar Carrinho
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Bulk order CTA */}
              <div className="bg-primary/10 rounded-lg p-6 mt-8">
                <div className="flex items-start gap-4">
                  <CalendarClock className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg mb-2">Precisa de um pedido maior?</h3>
                    <p className="text-gray-600 mb-4">
                      Oferecemos combos especiais e opções de agendamento para pedidos grandes.
                      Ideal para festas, eventos corporativos e celebrações.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => navigate("/combos")}>
                        Ver Combos
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/agendamento")}>
                        Agendar Pedido
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de entrega</span>
                    <span>R$ 5.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>R$ {(totalPrice + 5).toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processando..." : "Finalizar Pedido"}
                </Button>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Ao finalizar o pedido, você concorda com nossos Termos de Serviço e Política de Privacidade.
                </p>
                
                {scheduledItems.length > 0 && (
                  <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
                    <p className="font-medium flex items-center text-yellow-800">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
                      </svg>
                      Observação
                    </p>
                    <p className="mt-1 text-yellow-700">
                      Seu pedido inclui itens agendados. Estes serão entregues conforme a data e hora agendadas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
