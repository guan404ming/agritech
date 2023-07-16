/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import Footer from '../components/Footer';
import { ThemeContext, MarketContext } from '../components/useContext';
import { Crop } from '../types/type';

function App() {
    // theme
    const [theme, setTheme] = useState<string>('dark');
    const themeContext = useMemo(() => ({ theme, setTheme }), []);

    // market
    const [marketName, setMarketName] = useState<string>('台北二');
    const [selectedCrop, setSelectedCrop] = useState<Crop>();

    // Date
    const curDate = new Date();
    curDate.setDate(curDate.getDate() - 4);
    const prevDate = new Date();
    prevDate.setDate(curDate.getDate() - 5);

    return (
        <ThemeContext.Provider value={themeContext}>
            <MarketContext.Provider
                value={{
                    marketName,
                    setMarketName,
                    selectedCrop,
                    setSelectedCrop,
                    curDate,
                    prevDate,
                }}
            >
                <div className="App" data-theme={theme}>
                    <Router>
                        <Routes>
                            {/* Home Page */}
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                        </Routes>
                        <Footer />
                    </Router>
                </div>
            </MarketContext.Provider>
        </ThemeContext.Provider>
    );
}

export default App;
