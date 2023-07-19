import React, { useState, useEffect, useContext } from 'react';
import { Crop, RankProps } from '../types/type';
import { MarketContext } from '../util/useContext';

function Rank({ crops }: RankProps) {
    const { setSelectedCrop } = useContext(MarketContext);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('all');
    const [filteredCrops, setFilteredCrop] = useState<Crop[]>(crops);

    const handleFilterCrops = () => {
        switch (filter) {
            case 'all':
                setFilteredCrop(crops);
                break;

            case 'fruit':
                setFilteredCrop(crops.filter((crop) => crop.CropCode.match(/^[A-Z][0-9]*$/) || crop.CropCode.match(/^[0-9]*[0-9]$/)));
                break;

            case 'vegatable':
                setFilteredCrop(crops.filter((crop) => crop.CropCode.match(/^[A-Z][A-Z][0-9]*$/)));
                break;

            case 'flower':
                setFilteredCrop(crops.filter((crop) => crop.CropCode.match(/^[A-Z][A-Z][0-9][0-9][0-9]$/)));
                break;

            default:
                setFilteredCrop(crops);
                break;
        }
    };

    useEffect(() => {
        setPage(1);
        handleFilterCrops();
    }, [filter, crops]);

    return (
        <div className="text-center">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg my-6">今日菜價</h1>
                <select
                    className="select max-w-xs"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option disabled>請選擇類別</option>
                    <option value="all">全部</option>
                    <option value="fruit">水果</option>
                    <option value="vegatable">蔬菜</option>
                    <option value="flower">花卉</option>
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
                            (filteredCrops)
                                ?.map((crop, idx) => (((page - 1) * 10 <= idx && idx < page * 10)
                                    ? (
                                        <tr
                                            className="hover cursor-pointer"
                                            key={Math.random().toString(16).slice(2)}
                                            onClick={() => {
                                                setSelectedCrop(crop);
                                                document.getElementById('info-modal-box')?.classList.add('modal-open');
                                            }}
                                        >
                                            <td>{crop.CropName}</td>
                                            <td className="text-center"><div className="badge badge-primary">{crop.CropCode}</div></td>
                                            <td className="text-center">{crop.Avg_Price}</td>
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
                <button className="btn btn-ghost" type="button" onClick={() => setPage((page * 10 >= filteredCrops.length && filteredCrops.length !== 0) ? page : page + 1)}>»</button>
            </div>
        </div>

    );
}

export default Rank;
