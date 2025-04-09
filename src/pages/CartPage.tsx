
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/components/ui/use-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
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
              <div className="bg-white rounded-lg shadow-sm divide-y">
                {cartItems.map((item) => (
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
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
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
