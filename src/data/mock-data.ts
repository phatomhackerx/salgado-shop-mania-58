
export type Category = {
  name: string;
  slug: string;
  icon: string;
};

export const categories = [
  {
    name: "Coxinhas",
    slug: "coxinhas",
    icon: "/placeholder.svg",
  },
  {
    name: "Pastéis",
    slug: "pasteis",
    icon: "/placeholder.svg",
  },
  {
    name: "Empadas",
    slug: "empadas",
    icon: "/placeholder.svg",
  },
  {
    name: "Quibes",
    slug: "quibes",
    icon: "/placeholder.svg",
  },
  {
    name: "Bolinhos",
    slug: "bolinhos",
    icon: "/placeholder.svg",
  },
  {
    name: "Esfirras",
    slug: "esfirras",
    icon: "/placeholder.svg",
  },
];

export const products = [
  {
    id: 1,
    name: "Coxinha de Frango",
    price: 5.99,
    image: "/placeholder.svg",
    category: "Coxinhas",
    description: "Deliciosa coxinha recheada com frango desfiado temperado, envolta em uma massa crocante por fora e macia por dentro.",
  },
  {
    id: 2,
    name: "Coxinha de Frango com Catupiry",
    price: 6.99,
    image: "/placeholder.svg",
    category: "Coxinhas",
    description: "Coxinha recheada com frango desfiado e catupiry cremoso, uma combinação irresistível.",
  },
  {
    id: 3,
    name: "Pastel de Carne",
    price: 7.49,
    image: "/placeholder.svg",
    category: "Pastéis",
    description: "Pastel crocante recheado com carne moída temperada com cebola e especiarias.",
  },
  {
    id: 4,
    name: "Pastel de Queijo",
    price: 6.99,
    image: "/placeholder.svg",
    category: "Pastéis",
    description: "Pastel crocante recheado com queijo muçarela derretido, simples e delicioso.",
  },
  {
    id: 5,
    name: "Empada de Palmito",
    price: 8.99,
    image: "/placeholder.svg",
    category: "Empadas",
    description: "Empada com massa amanteigada recheada com palmito cremoso e temperado.",
  },
  {
    id: 6,
    name: "Empada de Frango",
    price: 7.99,
    image: "/placeholder.svg",
    category: "Empadas",
    description: "Tradicional empada com massa amanteigada recheada com frango cremoso.",
  },
  {
    id: 7,
    name: "Quibe Frito",
    price: 5.49,
    image: "/placeholder.svg",
    category: "Quibes",
    description: "Quibe crocante por fora e suculento por dentro, feito com carne moída e trigo para quibe.",
  },
  {
    id: 8,
    name: "Bolinho de Queijo",
    price: 4.99,
    image: "/placeholder.svg",
    category: "Bolinhos",
    description: "Bolinho frito com massa macia e recheio de queijo muçarela, perfeito para petiscar.",
  },
  {
    id: 9,
    name: "Esfirra de Carne",
    price: 6.49,
    image: "/placeholder.svg",
    category: "Esfirras",
    description: "Esfirra aberta com massa macia e recheio generoso de carne moída temperada.",
  },
  {
    id: 10,
    name: "Coxinha Especial de Frango com Cream Cheese",
    price: 7.99,
    image: "/placeholder.svg",
    category: "Coxinhas",
    description: "Versão especial da coxinha com frango desfiado e cream cheese, mais cremosa e saborosa.",
  },
];

export const featuredProducts = products.slice(0, 5);
export const newProducts = [products[5], products[6], products[7], products[8], products[9]];
