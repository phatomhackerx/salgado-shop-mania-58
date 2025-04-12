
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface OrderPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages?: number;
}

export const OrderPagination = ({ 
  currentPage, 
  setCurrentPage,
  totalPages = 5 
}: OrderPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
          />
        </PaginationItem>
        
        {[...Array(Math.min(3, totalPages))].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink 
              href="#" 
              isActive={currentPage === index + 1}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(index + 1);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        {totalPages > 3 && <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>}
        
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
