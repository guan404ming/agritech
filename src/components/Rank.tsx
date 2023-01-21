import React from 'react';

function Rank() {
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg my-6">今日菜價</h1>
                <select className="select max-w-xs">
                    <option disabled defaultChecked>請選擇類別</option>
                    <option>全部</option>
                    <option>蔬菜</option>
                    <option>水果</option>
                    <option>肉類</option>
                    <option>漁產</option>
                </select>
            </div>

            <div className="overflow-x-auto shadow-md">
                <table className="table w-full text-lg">

                    <thead>
                        <tr>
                            <th>名稱</th>
                            <th className="w-[100px] md:w-[150px]">類別</th>
                            <th className="w-[100px] md:w-[150px]">價格</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover">
                            <td>紅豆 - 普通</td>
                            <td><div className="badge badge-primary">蔬菜</div></td>
                            <td>112</td>
                        </tr>

                        <tr className="hover">
                            <td>紅豆 - 普通</td>
                            <td><div className="badge badge-primary">蔬菜</div></td>
                            <td>112</td>
                        </tr>

                        <tr className="hover">
                            <td>紅豆 - 普通</td>
                            <td><div className="badge badge-primary">蔬菜</div></td>
                            <td>112</td>
                        </tr>

                        <tr className="hover">
                            <td>紅豆 - 普通</td>
                            <td><div className="badge badge-primary">蔬菜</div></td>
                            <td>112</td>
                        </tr>

                        <tr className="hover">
                            <td>紅豆 - 普通</td>
                            <td><div className="badge badge-primary">蔬菜</div></td>
                            <td>112</td>
                        </tr>

                        <tr className="hover">
                            <td>紅豆 - 普通</td>
                            <td><div className="badge badge-primary">蔬菜</div></td>
                            <td>112</td>
                        </tr>

                        <tr className="hover">
                            <td>紅豆 - 普通</td>
                            <td><div className="badge badge-primary">蔬菜</div></td>
                            <td>112</td>
                        </tr>

                        <tr className="hover">
                            <td>紅豆 - 普通</td>
                            <td><div className="badge badge-primary">蔬菜</div></td>
                            <td>112</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>

    );
}

export default Rank;
