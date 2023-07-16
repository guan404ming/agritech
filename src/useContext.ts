import { createContext } from 'react';
import { MarketContextInterface, ThemeContextInterface } from './type';

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
        curDate: new Date(),
        prevDate: new Date(),
    },
);

export { ThemeContext, MarketContext };
