import React from 'react';

function Stats() {
    return (
        <div className="stats shadow-md w-full text-center">
            <div className="stat text-md">
                <div className="stat-title">蔬菜 / 水果</div>
                <div className="stat-value my-1 text-2xl">89,400</div>
                <div className="stat-desc">7 日內平均漲跌</div>
            </div>

            <div className="stat text-md">
                <div className="stat-title">肉品 / 漁產</div>
                <div className="stat-value my-1 text-2xl">89,400</div>
                <div className="stat-desc">7 日內平均漲跌</div>
            </div>

            <div className="stat text-md hidden lg:inline">
                <div className="stat-title">白米</div>
                <div className="stat-value my-1 text-2xl">89,400</div>
                <div className="stat-desc">7 日內平均漲跌</div>
            </div>

            {/* <div className="stat text-md hidden lg:inline">
                <div className="stat-title">白米</div>
                <div className="stat-value my-1 text-2xl">89,400</div>
                <div className="stat-desc">7 日內平均漲跌</div>
            </div> */}
        </div>
    );
}

export default Stats;
