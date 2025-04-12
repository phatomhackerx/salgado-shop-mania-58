
import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MultiSelectFilterProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  label: string;
  clearable?: boolean;
  searchable?: boolean;
  maxHeight?: number;
}

export const MultiSelectFilter = ({
  options,
  selected,
  onChange,
  placeholder,
  label,
  clearable = true,
  searchable = true,
  maxHeight = 300,
}: MultiSelectFilterProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    
    onChange(newSelected);
  };

  const handleClear = () => {
    onChange([]);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between min-w-[150px] h-9"
        >
          {selected.length > 0 ? (
            <div className="flex gap-1 items-center flex-wrap">
              <span className="text-xs text-muted-foreground mr-1">{label}:</span>
              {selected.length <= 2 ? (
                selected.map((value) => (
                  <Badge 
                    key={value} 
                    variant="secondary"
                    className="mr-1 text-xs py-0 px-1"
                  >
                    {options.find((option) => option.value === value)?.label}
                  </Badge>
                ))
              ) : (
                <Badge variant="secondary" className="mr-1 text-xs py-0 px-1">
                  {selected.length} selecionados
                </Badge>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-w-[200px]" align="start">
        <Command>
          {searchable && (
            <CommandInput placeholder={`Buscar ${placeholder.toLowerCase()}...`} className="h-9" />
          )}
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup className={`overflow-auto ${maxHeight ? `max-h-[${maxHeight}px]` : ""}`}>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <div className={cn(
                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                  selected.includes(option.value)
                    ? "bg-primary text-primary-foreground"
                    : "opacity-50"
                )}>
                  {selected.includes(option.value) && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                <span>{option.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          {clearable && selected.length > 0 && (
            <div className="border-t p-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={handleClear}
              >
                <X className="mr-2 h-3 w-3" />
                Limpar filtros
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
