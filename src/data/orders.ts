
import { Order } from "@/types/admin";

// Mock data for orders
export const orders: Order[] = [
  { id: "PED-2380", customer: "Sofia Martins", date: "16/04/2025", time: "13:45", amount: "R$ 135,00", items: 3, status: "Em preparo", address: "Rua das Flores, 123" },
  { id: "PED-2379", customer: "Rafael Santos", date: "16/04/2025", time: "10:30", amount: "R$ 87,50", items: 2, status: "Em entrega", address: "Av. Paulista, 1000" },
  { id: "PED-2378", customer: "Clara Oliveira", date: "16/04/2025", time: "09:15", amount: "R$ 210,00", items: 5, status: "Agendado", address: "Rua Augusta, 456" },
  { id: "PED-2377", customer: "Lucas Silva", date: "15/04/2025", time: "18:20", amount: "R$ 65,00", items: 1, status: "Entregue", address: "Rua Oscar Freire, 789" },
  { id: "PED-2376", customer: "Mariana Costa", date: "15/04/2025", time: "16:50", amount: "R$ 145,00", items: 4, status: "Entregue", address: "Av. Rebouças, 321" },
  { id: "PED-2375", customer: "Pedro Almeida", date: "15/04/2025", time: "14:30", amount: "R$ 92,00", items: 2, status: "Entregue", address: "Rua dos Pinheiros, 654" },
  { id: "PED-2374", customer: "Juliana Lima", date: "15/04/2025", time: "12:15", amount: "R$ 78,50", items: 2, status: "Cancelado", address: "Av. Brigadeiro Faria Lima, 987" },
  { id: "PED-2373", customer: "Gabriel Ferreira", date: "15/04/2025", time: "11:00", amount: "R$ 112,00", items: 3, status: "Entregue", address: "Rua Bela Cintra, 654" },
  { id: "PED-2372", customer: "Ana Beatriz", date: "14/04/2025", time: "19:45", amount: "R$ 95,00", items: 2, status: "Entregue", address: "Av. Santo Amaro, 123" },
  { id: "PED-2371", customer: "Thiago Mendes", date: "14/04/2025", time: "17:30", amount: "R$ 175,00", items: 4, status: "Entregue", address: "Rua Haddock Lobo, 456" },
];

// Calculate statistics
export const getOrderStats = (orderList: Order[]) => {
  return {
    total: orderList.length,
    inPreparation: orderList.filter(o => o.status === "Em preparo").length,
    inDelivery: orderList.filter(o => o.status === "Em entrega").length,
    delivered: orderList.filter(o => o.status === "Entregue").length,
    scheduled: orderList.filter(o => o.status === "Agendado").length,
    canceled: orderList.filter(o => o.status === "Cancelado").length,
  };
};
