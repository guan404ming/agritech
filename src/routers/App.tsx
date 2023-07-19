/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Search from './Search';
import Footer from '../components/Footer';
import { ThemeContext, MarketContext } from '../util/useContext';
import { Crop } from '../types/type';
import Header from '../components/Header';
import { curDate, handleFormatDate, prevDate } from '../util/time';

function App() {
    // theme
    const [theme, setTheme] = useState<string>('dark');
    const themeContext = useMemo(() => ({ theme, setTheme }), []);

    // market
    const [marketName, setMarketName] = useState<string>('台北二');
    const [selectedCrop, setSelectedCrop] = useState<Crop>();

    // data
    const [crops, setCrops] = useState<Crop[]>([]);
    const [prevCrops, setPrevCrops] = useState<Crop[]>([]);

    const handleFetchData = async (page: number, start: Date, end: Date, isCur: boolean) => {
        await axios
            .get('https://data.coa.gov.tw/api/v1/AgriProductsTransType/', {
                params: {
                    Start_time: handleFormatDate(start),
                    End_time: handleFormatDate(end),
                    MarketName: marketName,
                    Page: page,
                    api_key: process.env.REACT_APP_API_KEY,
                },
            })
            .then((res) => {
                if (isCur) {
                    setCrops(res.data.Data);
                } else {
                    setPrevCrops(res.data.Data);
                }
                // if (res.data.Next) {
                //     handleFetchData(page + 1, start, end, isCur);
                // }
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

    useEffect(() => {
        (
            async () => {
                await handleFetchData(0, curDate, curDate, true);
                await handleFetchData(0, prevDate, prevDate, false);
            }
        )();
    }, [marketName]);

    return (
        <ThemeContext.Provider value={themeContext}>
            <MarketContext.Provider
                value={{
                    marketName,
                    setMarketName,
                    selectedCrop,
                    setSelectedCrop,
                }}
            >
                <div className="min-h-[100vh] w-[100vw]" data-theme={theme}>
                    <Header />
                    <Router>
                        <Routes>
                            {/* Home Page */}
                            <Route path="/" element={<Home crops={crops} prevCrops={prevCrops} />} />
                            <Route path="/search" element={<Search crops={crops} prevCrops={prevCrops} />} />
                        </Routes>
                        <Footer />
                    </Router>
                </div>
            </MarketContext.Provider>
        </ThemeContext.Provider>
    );
}

export default App;
