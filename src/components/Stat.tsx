import React from 'react';
import { StatProps, formatter } from '../type';

function Stats({ stats }: StatProps) {
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

export default Stats;
