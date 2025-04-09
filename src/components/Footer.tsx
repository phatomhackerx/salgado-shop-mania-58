
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="rounded-full bg-primary p-1.5">
                <div className="h-5 w-5 rounded-full bg-white" />
              </div>
              <span className="text-xl font-bold text-primary">SalgadoMania</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Salgados deliciosos com entrega rápida. Os melhores sabores tradicionais e especiais direto na sua casa.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos" className="text-gray-400 hover:text-white transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="text-gray-400 hover:text-white transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/promocoes" className="text-gray-400 hover:text-white transition-colors">
                  Promoções
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="text-gray-400 hover:text-white transition-colors">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/politica-de-entrega" className="text-gray-400 hover:text-white transition-colors">
                  Política de Entrega
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-gray-400 hover:text-white transition-colors">
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>Rua dos Salgados, 123, São Paulo - SP</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📱</span>
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <span>contato@salgadomania.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SalgadoMania. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
