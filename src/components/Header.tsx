import React from 'react';
import { HeaderProps } from '../type';

const markets: string[] = [
    '台北二', '台北一', '板橋區', '三重區', '宜蘭市', '桃農', '台中市', '豐原區', '永靖鄉',
    '溪湖鎮', '南投市', '西螺鎮', '高雄市', '鳳山區', '屏東市', '宜蘭市', '台東市', '花蓮市',
];

function Header({ setMarketName, marketName }: HeaderProps) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <button className="btn btn-ghost normal-case text-2xl font-bold" type="button">Agritech</button>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-bottom dropdown-hover">
                    <button className="btn btn-ghost font-bold" type="button">{marketName}</button>
                    <ul className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-44 grid grid-cols-2">
                        {
                            markets.map((market) => (
                                <li key={Math.random().toString(16).slice(2)}>
                                    <button type="button" onClick={() => setMarketName(market)}>{market}</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <button className="btn btn-ghost btn-circle" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <button className="btn btn-ghost btn-circle" type="button">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item" />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Header;
