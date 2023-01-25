import React, { useContext } from 'react';
import { HeaderProps } from '../type';
import ThemeContext from '../useContext';

const markets: string[] = [
    '台北二', '台北一', '板橋區', '三重區', '宜蘭市', '桃農', '台中市', '豐原區', '永靖鄉',
    '溪湖鎮', '南投市', '西螺鎮', '高雄市', '鳳山區', '屏東市', '台東市', '花蓮市',
];

function Header({ setMarketName, marketName }: HeaderProps) {
    const { theme, setTheme } = useContext(ThemeContext); // eslint-disable-line
    const handleChangeTheme = (isLight: boolean) => {
        if (!isLight) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <button className="btn btn-ghost normal-case text-2xl font-bold" type="button">Agritech</button>
            </div>
            <div className="flex-none">
                <label className="swap swap-rotate btn btn-ghost btn-circle">

                    <input type="checkbox" onChange={(e) => { handleChangeTheme(e.target.checked); }} />

                    <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                    <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                </label>
                <div className="dropdown dropdown-hover dropdown-end">
                    <button className="btn btn-ghost font-bold" type="button">{marketName}</button>
                    <ul className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-44 grid grid-cols-2">
                        {
                            markets.map((market) => (
                                <li key={Math.random().toString(16).slice(2)}>
                                    <button type="button" onClick={() => setMarketName(market)} className="truncate">{market}</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
