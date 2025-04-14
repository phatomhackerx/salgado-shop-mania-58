
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RatingStars } from "@/components/RatingStars";

interface Product {
  id: number;
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
    <Card className="lg:col-span-4 w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Produtos mais vendidos</CardTitle>
        <Link to="/admin/produtos" className="text-sm text-primary hover:underline">
          Ver todos
        </Link>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] md:w-auto">Produto</TableHead>
              <TableHead className="hidden sm:table-cell">Preço</TableHead>
              <TableHead className="hidden md:table-cell">Vendidos</TableHead>
              <TableHead>Avaliação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium truncate max-w-[150px] sm:max-w-none">
                  {product.name}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </TableCell>
                <TableCell className="hidden md:table-cell">{product.quantity}</TableCell>
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
