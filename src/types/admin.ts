
export interface Order {
  id: string;
  customer: string;
  date: string;
  time: string;
  amount: string;
  items: number;
  status: string;
  address: string;
}

export interface DeliveryPerson {
  id: string;
  name: string;
  photo?: string;
  email: string;
  phone: string;
  cpf: string;
  vehicleType: "bike" | "motorcycle" | "car";
  vehiclePlate?: string;
  level: number;
  totalDeliveries: number;
  rating: number;
  status: "active" | "inactive" | "on_leave";
  joinDate: string;
  address: string;
  commission: {
    percentage: number;
    fixed: number;
  };
  bonuses: {
    completed: number;
    onTime: number;
    weekendBonus: number;
  };
}

export interface DeliveryLevel {
  id: number;
  name: string;
  minDeliveries: number;
  commissionPercentage: number;
  bonusMultiplier: number;
  requirements: string[];
  benefits: string[];
}

