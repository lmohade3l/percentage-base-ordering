import { MarketType } from '@/types/market';
import { useState, useEffect } from 'react';

export const useMarket = () => {
  const [currentCoin, setCurrentCoin] = useState<MarketType | null>(null);

  const selectCoin = (coin: MarketType) => {
    setCurrentCoin(coin);
    localStorage.setItem('selectedCoin', JSON.stringify(coin));
  };

  const clearSelectedCoin = () => {
    setCurrentCoin(null);
    localStorage.removeItem('selectedCoin');
  };

  useEffect(() => {
    const storedCoin = localStorage.getItem('selectedCoin');
    if (storedCoin) {
      try {
        setCurrentCoin(JSON.parse(storedCoin));
      } catch (e) {
        localStorage.removeItem('selectedCoin');
      }
    }
  }, []);

  return {
    currentCoin,
    selectCoin,
    clearSelectedCoin,
  };
};