import { createContext } from 'react';
import { ThemeContextInterface } from './type';

const ThemeContext = createContext<ThemeContextInterface>(
    {
        theme: 'light',
        setTheme: () => {},
    },
);

export default ThemeContext;
