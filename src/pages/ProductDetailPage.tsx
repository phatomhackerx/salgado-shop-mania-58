
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { products } from "@/data/mock-data";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { FeaturedProducts } from "@/components/FeaturedProducts";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.id === Number(id));
  
  // Find related products (same category)
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5)
    : [];
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <p className="mb-6">O produto que você está procurando não existe.</p>
          <Button onClick={() => navigate("/produtos")}>Ver todos os produtos</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-500">
            ← Voltar
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden border bg-white">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover max-h-[500px]" 
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-4">Categoria: {product.category}</p>
            
            <div className="text-2xl font-bold text-primary mb-6">
              R$ {product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Quantity selector */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Quantidade</span>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleIncrement}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Add to cart button */}
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
