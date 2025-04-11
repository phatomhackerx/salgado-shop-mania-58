
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/use-cart";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import PromotionsPage from "./pages/PromotionsPage";
import SchedulePage from "./pages/SchedulePage";
import CombosPage from "./pages/CombosPage";
import NotFound from "./pages/NotFound";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PedidosPage from "./pages/admin/PedidosPage";
import ProdutosPage from "./pages/admin/ProdutosPage";
import ClientesPage from "./pages/admin/ClientesPage";
import AgendamentosPage from "./pages/admin/AgendamentosPage";
import RelatoriosPage from "./pages/admin/RelatoriosPage";
import ColaboradoresPage from "./pages/admin/ColaboradoresPage";
import FornecedoresPage from "./pages/admin/FornecedoresPage";
import ConfiguracoesPage from "./pages/admin/ConfiguracoesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produtos" element={<ProductsPage />} />
            <Route path="/produtos/:id" element={<ProductDetailPage />} />
            <Route path="/categorias" element={<CategoriesPage />} />
            <Route path="/categorias/:slug" element={<CategoryDetailPage />} />
            <Route path="/promocoes" element={<PromotionsPage />} />
            <Route path="/carrinho" element={<CartPage />} />
            <Route path="/agendamento" element={<SchedulePage />} />
            <Route path="/combos" element={<CombosPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="pedidos" element={<PedidosPage />} />
              <Route path="produtos" element={<ProdutosPage />} />
              <Route path="clientes" element={<ClientesPage />} />
              <Route path="agendamentos" element={<AgendamentosPage />} />
              <Route path="relatorios" element={<RelatoriosPage />} />
              <Route path="colaboradores" element={<ColaboradoresPage />} />
              <Route path="fornecedores" element={<FornecedoresPage />} />
              <Route path="configuracoes" element={<ConfiguracoesPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
