import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CarouselContextType {
  isCarouselOpen: boolean;
  setIsCarouselOpen: (open: boolean) => void;
}

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (context === undefined) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
};

interface CarouselProviderProps {
  children: ReactNode;
}

export const CarouselProvider: React.FC<CarouselProviderProps> = ({
  children,
}) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  return (
    <CarouselContext.Provider value={{ isCarouselOpen, setIsCarouselOpen }}>
      {children}
    </CarouselContext.Provider>
  );
};
