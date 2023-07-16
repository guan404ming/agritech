import React, { useEffect, useState } from 'react';
import {
    StatProps, formatter, Stats,
} from '../types/type';

function Stat({ crops }: StatProps) {
    const [stats, setStats] = useState<Stats>({ income: 0, quantity: 0 });

    useEffect(() => {
        let income = 0;
        let quantity = 0;

        crops.forEach((crop) => {
            income += (Number(crop.Avg_Price) * crop.Trans_Quantity);
            quantity += crop.Trans_Quantity;
        });
        setStats({ income, quantity });
    }, [crops]);

    return (
        <div className="stats shadow-md w-full">
            <div className="stat text-md place-items-center">
                <div className="stat-title">交易量</div>
                <div className="stat-value my-1 text-2xl">{formatter.format(stats.quantity / 1000)}</div>
                <div className="stat-desc">單位：公噸</div>
            </div>

            <div className="stat text-md place-items-center">
                <div className="stat-title">平均價格</div>
                <div className="stat-value my-1 text-2xl">{formatter.format(stats.income / stats.quantity)}</div>
                <div className="stat-desc">單位：元 / 公斤</div>
            </div>

            <div className="stat text-md hidden lg:block text-center">
                <div className="stat-title">交易總額</div>
                <div className="stat-value my-1 text-2xl">{formatter.format(stats.income / 10000)}</div>
                <div className="stat-desc">單位：萬</div>
            </div>
        </div>
    );
}

export default Stat;
