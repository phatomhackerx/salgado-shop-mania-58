
import { useState } from 'react';
import { Package, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MultiSelectFilter } from './MultiSelectFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { categories, products } from '@/data/mock-data';

// Calculate price range from products
const allPrices = products.map(p => p.price);
const minPrice = Math.floor(Math.min(...allPrices));
const maxPrice = Math.ceil(Math.max(...allPrices));

interface FilterSettings {
  categories: string[];
  priceRange: [number, number];
}

interface AdvancedFilterSectionProps {
  filterSettings: FilterSettings;
  onFilterChange: (filters: FilterSettings) => void;
  showSheetOnMobile?: boolean;
  className?: string;
}

export const AdvancedFilterSection = ({
  filterSettings,
  onFilterChange,
  showSheetOnMobile = true,
  className = '',
}: AdvancedFilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterSettings>(filterSettings);
  
  const categoryOptions = categories.map(cat => ({
    label: cat.name,
    value: cat.name
  }));
  
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };
  
  const handleResetFilters = () => {
    const resetFilters: FilterSettings = {
      categories: [],
      priceRange: [minPrice, maxPrice]
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  const activeFilterCount = 
    (localFilters.categories.length > 0 ? 1 : 0) +
    (localFilters.priceRange[0] > minPrice || localFilters.priceRange[1] < maxPrice ? 1 : 0);
  
  const FilterContent = () => (
    <div className="space-y-6">
      <Accordion type="single" collapsible defaultValue="categories" className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categorias</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <MultiSelectFilter
                options={categoryOptions}
                selected={localFilters.categories}
                onChange={(selected) => setLocalFilters({
                  ...localFilters,
                  categories: selected
                })}
                placeholder="Selecionar categorias"
                label="Categorias"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>Faixa de Preço</AccordionTrigger>
          <AccordionContent>
            <PriceRangeFilter
              min={minPrice}
              max={maxPrice}
              value={localFilters.priceRange}
              onChange={(range) => setLocalFilters({
                ...localFilters,
                priceRange: range
              })}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
  
  // For mobile, return a sheet (drawer)
  if (showSheetOnMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-primary" variant="default">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[320px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Filtrar Produtos
            </SheetTitle>
          </SheetHeader>
          <Separator className="my-4" />
          
          <div className="flex flex-col h-[calc(100vh-10rem)]">
            <div className="flex-grow overflow-auto pr-1">
              <FilterContent />
            </div>
            
            <SheetFooter className="flex-shrink-0 pt-4 border-t mt-4">
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" onClick={handleResetFilters} disabled={activeFilterCount === 0}>
                  <X className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
                <Button onClick={handleApplyFilters}>
                  Aplicar Filtros
                </Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  
  // For desktop, return the inline version
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filtros</h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleResetFilters} className="h-8 px-2">
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>
      <FilterContent />
    </div>
  );
};
