
export interface Photo {
  file: File;
  preview: string; //  URL for thumbnail
}





export interface PrintSize {
  label: string,
  value: string,
  price: number, // AED per photo
}

// Price calculation 
export const calculateTotalPrice = (
  photos: Photo[],
  size: PrintSize,
): number => {
  return  size.price*photos.length;
};






// Available sizes 
export const printSizes: PrintSize[] = [
  { label: "4×6", value: "4x6", price: 1.5 },
  { label: "5×7", value: "5x7", price: 3 },
  { label: "8×10", value: "8x10", price: 5 },
];


