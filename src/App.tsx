import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routers/Home';
import Search from './routers/Search';
import Footer from './components/Footer';
import ThemeContext from './useContext';

function App() {
    const [theme, setTheme] = useState<String>('dark');
    const themeContext = useMemo(() => ({ theme, setTheme }), []);

    return (
        <ThemeContext.Provider value={themeContext}>
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
        </ThemeContext.Provider>
    );
}

export default App;
