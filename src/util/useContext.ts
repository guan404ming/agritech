import { createContext } from 'react';
import { MarketContextInterface, ThemeContextInterface } from '../types/type';

const ThemeContext = createContext<ThemeContextInterface>(
    {
        theme: '',
        setTheme: () => { },
    },
);

const MarketContext = createContext<MarketContextInterface>(
    {
        marketName: '',
        setMarketName: () => { },
        selectedCrop: undefined,
        setSelectedCrop: () => { },
    },
);

export { ThemeContext, MarketContext };
