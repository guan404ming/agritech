import React, { useMemo, useState } from 'react';
import Home from './routers/Home';
import ThemeContext from './useContext';

function App() {
    const [theme, setTheme] = useState<String>('dark');
    const themeContext = useMemo(() => ({ theme, setTheme }), []);

    return (
        <ThemeContext.Provider value={themeContext}>
            <div className="App" data-theme={theme}>
                <Home />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
