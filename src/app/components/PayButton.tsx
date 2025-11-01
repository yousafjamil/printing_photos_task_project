'use client';

import { Photo } from './../lib/utils';
import { PrintSize } from './../lib/utils';

interface PayButtonProps {
  photos: Photo[];
  selectedSize: PrintSize;
  total: number;
}

export default function PayButton({ photos, selectedSize, total }: PayButtonProps) {
  const handlePay = () => {
    if (photos.length === 0) {
      alert('Please upload at least one photo!');
      return;
    }
    alert(`Order placed! ${photos.length} photos in ${selectedSize.label} size. Total: AED ${total.toFixed(2)}. (Fake payment - demo only)`);
  };

  return (
    <button
      onClick={handlePay}
      disabled={photos.length === 0}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
    >
      Pay Now - AED {total.toFixed(2)}
    </button>
  );
}