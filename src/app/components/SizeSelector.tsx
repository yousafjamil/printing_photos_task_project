'use client';

import { useState } from 'react';
import { PrintSize, calculateTotalPrice, printSizes } from './../lib/utils';
import { Photo } from './../lib/utils';

interface SizeSelectorProps {
  photos: Photo[];
  onTotalChange: (total: number) => void;
}

export default function SizeSelector({ photos, onTotalChange }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<PrintSize>(printSizes[0]); // Default to first

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const size = printSizes.find(s => s.value === value) || printSizes[0];
    setSelectedSize(size);
    onTotalChange(calculateTotalPrice(photos, size));
  };

  const total = calculateTotalPrice(photos, selectedSize);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Print Size
        </label>
        <select
          id="size-select"
          value={selectedSize.value}
          onChange={handleSizeChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {printSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label} - AED {size.price} per photo
            </option>
          ))}
        </select>
      </div>
      {photos.length > 0 && (
        <div className="bg-green-50 p-3 rounded-md">
          <p className="text-lg font-semibold text-green-800">
            Total for {photos.length} photo(s): AED {total.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}