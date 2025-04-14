
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RatingStars } from "@/components/RatingStars";

// Update the interface to match the actual data structure
interface Product {
  id: number; // Changed from string to number to match the actual data
  name: string;
  price: number;
  quantity: number;
  rating: number;
}

interface TopSellingProductsCardProps {
  products: Product[];
}

export const TopSellingProductsCard = ({ products }: TopSellingProductsCardProps) => {
  return (
    <Card className="lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Produtos mais vendidos</CardTitle>
        <Link to="/admin/produtos" className="text-sm text-primary hover:underline">
          Ver todos
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Vendidos</TableHead>
              <TableHead>Avaliação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <RatingStars rating={product.rating} size="sm" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
