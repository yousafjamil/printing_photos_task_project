'use client'; 

import { useState } from 'react';
import PhotoUpload from './components/PhotoUpload'; 
import SizeSelector from './components/SizeSelector';
import PayButton from './components/PayButton'; 
import { Photo } from './lib/utils'; 
import { PrintSize, printSizes, calculateTotalPrice } from './lib/utils'; 

export default function Home() { 
  const [photos, setPhotos] = useState<Photo[]>([]); 
  const [selectedSize, setSelectedSize] = useState<PrintSize>(printSizes[0]); 
  const [total, setTotal] = useState(0);

  const handlePhotosChange = (newPhotos: Photo[]) => {
    setPhotos(newPhotos);
    // Recalc based on current size
    setTotal(calculateTotalPrice(newPhotos, selectedSize));
  };

  // Callback for total updates (from size change)
  const handleTotalChange = (newTotal: number) => {
    setTotal(newTotal);
  };


  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"> 
      <div className="max-w-md mx-auto"> 
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Photo Printing Demo 
        </h1>
        
        {/* Upload section first—user starts here */}
        <PhotoUpload onPhotosChange={handlePhotosChange} />
        
        {/* Size picker—shows total only after uploads */}
        <SizeSelector 
          photos={photos} 
          onTotalChange={handleTotalChange} 
        />

        {/* Order Summary Card—shows */}
        {photos.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200"> 
            <ul className="text-sm space-y-1 text-gray-600"> 
              <li className="flex justify-between">
                <span>{photos.length} photo(s)</span>
                <span className="font-medium">✓</span> 
              </li>
              <li className="flex justify-between">
                <span>{selectedSize.label} prints</span>
                <span className="font-medium">✓</span>
              </li>
              <li className="flex justify-between pt-1 border-t border-gray-200"> 
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-blue-600">AED {total.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        )}
        
        {/* Pay button*/}
        <PayButton 
          photos={photos} 
          selectedSize={selectedSize} 
          total={total} 
        />
      </div>
    </main>
  );
}
