import React, { useState } from 'react';

interface DataProps {
    data: {
        CropName: String;
        Middle_Price: String;
        CropCode: String;
    }[] | undefined
}

function Rank(props: DataProps) {
    const { data } = props;
    const [page, setPage] = useState(1);

    return (
        <div className="text-center">
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

            <div className="overflow-x-auto shadow-md mb-6">
                <table className="table w-full text-lg">

                    <thead>
                        <tr>
                            <th>名稱</th>
                            <th className="w-[100px] md:w-[125px] text-center">類別</th>
                            <th className="w-[100px] md:w-[125px] text-center">價格</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((e, idx) => (
                                ((page - 1) * 10 <= idx && idx < page * 10)
                                    ? (
                                        <tr className="hover">
                                            <td>{e.CropName}</td>
                                            <td className="text-center"><div className="badge badge-primary">蔬菜</div></td>
                                            <td className="text-center">{e.Middle_Price}</td>
                                        </tr>
                                    )
                                    : (
                                        ''
                                    )
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn-group mb-20 shadow-md rounded-md">
                <button className="btn btn-ghost" type="button" onClick={() => setPage((page === 1) ? 1 : page - 1)}>«</button>
                <button className="btn btn-ghost" type="button">{`Page ${page}`}</button>
                <button className="btn btn-ghost" type="button" onClick={() => setPage(page + 1)}>»</button>
            </div>
        </div>

    );
}

export default Rank;
