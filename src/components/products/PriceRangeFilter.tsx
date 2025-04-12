
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const PriceRangeFilter = ({ min, max, value, onChange }: PriceRangeFilterProps) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const [minInput, setMinInput] = useState(value[0].toString());
  const [maxInput, setMaxInput] = useState(value[1].toString());

  useEffect(() => {
    setLocalValue(value);
    setMinInput(value[0].toString());
    setMaxInput(value[1].toString());
  }, [value]);

  const handleSliderChange = (newValue: number[]) => {
    const range = [newValue[0], newValue[1]] as [number, number];
    setLocalValue(range);
    setMinInput(range[0].toString());
    setMaxInput(range[1].toString());
    onChange(range);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInput(e.target.value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInput(e.target.value);
  };

  const handleMinInputBlur = () => {
    const newMin = Math.max(min, Math.min(Number(minInput) || min, localValue[1] - 1));
    const newRange: [number, number] = [newMin, localValue[1]];
    setLocalValue(newRange);
    setMinInput(newMin.toString());
    onChange(newRange);
  };

  const handleMaxInputBlur = () => {
    const newMax = Math.min(max, Math.max(Number(maxInput) || max, localValue[0] + 1));
    const newRange: [number, number] = [localValue[0], newMax];
    setLocalValue(newRange);
    setMaxInput(newMax.toString());
    onChange(newRange);
  };

  return (
    <div className="space-y-4">
      <div className="pt-2">
        <Slider
          defaultValue={[min, max]}
          value={localValue}
          min={min}
          max={max}
          step={0.5}
          onValueChange={handleSliderChange}
          className="py-4"
        />
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="grid gap-1.5 w-full">
          <Label htmlFor="price-min">Mínimo</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              R$
            </span>
            <Input
              id="price-min"
              type="number"
              min={min}
              max={localValue[1] - 1}
              value={minInput}
              onChange={handleMinInputChange}
              onBlur={handleMinInputBlur}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="grid gap-1.5 w-full">
          <Label htmlFor="price-max">Máximo</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              R$
            </span>
            <Input
              id="price-max"
              type="number"
              min={localValue[0] + 1}
              max={max}
              value={maxInput}
              onChange={handleMaxInputChange}
              onBlur={handleMaxInputBlur}
              className="pl-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
