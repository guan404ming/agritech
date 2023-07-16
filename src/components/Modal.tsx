import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Crop, SelectedCropData, formatter,
} from '../types/type';
import { MarketContext } from './useContext';
import handleFormatDate from '../util/time';

function Modal() {
    const { selectedCrop, marketName, curDate } = useContext(MarketContext);
    const [selectedCropData, setSelectedCropData] = useState<SelectedCropData>({
        week: {
            price: 0,
            quantity: 0,
        },
        month: {
            price: 0,
            quantity: 0,
        },
        season: {
            price: 0,
            quantity: 0,
        },
    });
    const [loading, setLoading] = useState<boolean>(false);

    const income: number = Number(selectedCrop?.Avg_Price) * Number(selectedCrop?.Trans_Quantity);
    const quantity: number = Number(selectedCrop?.Trans_Quantity);

    const handleFetchCropData = async (end: Date, crop: Crop | undefined) => {
        const durations = [7, 30, 60];
        const curData = { ...selectedCropData };

        try {
            setLoading(true);
            await Promise.all(
                durations.map(async (duration) => {
                    const pre = new Date();
                    pre.setDate(end.getDate() - duration);

                    const res = await axios.get('https://data.coa.gov.tw/api/v1/AgriProductsTransType/', {
                        params: {
                            Start_time: handleFormatDate(pre),
                            End_time: handleFormatDate(end),
                            CropCode: crop?.CropCode,
                            MarketName: marketName,
                        },
                    });

                    let priceSum = 0;
                    let quantitySum = 0;

                    res.data.Data.forEach((data: Crop) => {
                        priceSum += data.Avg_Price;
                        quantitySum += data.Trans_Quantity;
                    });

                    switch (duration) {
                        case 7:
                            curData.week = {
                                price: priceSum / res.data.Data.length,
                                quantity: quantitySum / res.data.Data.length,
                            };
                            break;

                        case 30:
                            curData.month = {
                                price: priceSum / res.data.Data.length,
                                quantity: quantitySum / res.data.Data.length,
                            };
                            break;

                        case 60:
                            curData.season = {
                                price: priceSum / res.data.Data.length,
                                quantity: quantitySum / res.data.Data.length,
                            };
                            break;

                        default:
                            break;
                    }
                }),
            );

            setSelectedCropData(curData);
        } catch (err) {
            throw new Error(String(err));
        }
    };

    useEffect(() => {
        (
            async () => {
                if (selectedCrop !== undefined) {
                    await handleFetchCropData(curDate, selectedCrop);
                }
                setLoading(false);
            }
        )();
    }, [selectedCrop]);

    return (
        <>
            <input
                id="info-modal"
                type="checkbox"
                className="modal-toggle"
            />
            <label
                id="info-modal-box"
                htmlFor=""
                className="modal cursor-pointer"
                onClick={() => {
                    document.getElementById('info-modal-box')?.classList.remove('modal-open');
                }}
            >
                <label className="modal-box px-0" htmlFor="">
                    <label className="btn btn-sm btn-ghost absolute right-2 top-2">✕</label>

                    <div className="space-x-3 mb-2 md:mb-3 text-center">
                        <span className="font-bold text-lg">{selectedCrop?.CropName}</span>
                        <div className="badge badge-primary">{selectedCrop?.CropCode}</div>
                        <div className="badge badge-secondary">{selectedCrop?.MarketName}</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 mx-6 gap-2 mb-2">
                        <div className="stats shadow-lg">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">交易量</div>
                                <div className="stat-value my-1 text-xl">
                                    {formatter.format((quantity > 10000)
                                        ? quantity / 1000
                                        : quantity)}
                                </div>
                                <div className="stat-desc">
                                    {`${(quantity > 10000) ? '公噸' : '公斤'}`}
                                </div>
                            </div>
                        </div>

                        <div className="stats shadow-lg">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">平均價格</div>
                                <div className="stat-value my-1 text-xl">{formatter.format(Number(selectedCrop?.Avg_Price))}</div>
                                <div className="stat-desc">元 / 公斤</div>
                            </div>

                        </div>

                        <div className="stats shadow-lg hidden md:block lg:block">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">交易總額</div>
                                <div className="stat-value my-1 text-xl">
                                    {formatter.format((income > 100000) ? income / 10000 : income)}
                                </div>
                                <div className="stat-desc">
                                    {`${(income > 100000) ? '萬元' : '元'}`}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 mx-6 gap-2">
                        {[
                            { title: '上價', price: selectedCrop?.Upper_Price },
                            { title: '中價', price: selectedCrop?.Middle_Price },
                            { title: '下價', price: selectedCrop?.Lower_Price },
                        ].map((item) => (
                            <div className="stats shadow-lg" key={item.title}>
                                <div className="stat text-md place-items-center">
                                    <div className="stat-title">{item.title}</div>
                                    <div className="stat-value my-1 text-xl">{formatter.format(Number(item.price))}</div>
                                    <div className="stat-desc">元 / 公斤</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="overflow-x-auto m-6">
                        <table className="table w-full text-lg">
                            <thead>
                                <tr>
                                    <th>名稱</th>
                                    <th className="text-center w-[80px]">批發量</th>
                                    <th className="text-center w-[80px]">均價</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { label: '今日', quantity: selectedCrop?.Trans_Quantity, price: selectedCrop?.Avg_Price },
                                    { label: '週平均', quantity: selectedCropData?.week.quantity, price: selectedCropData?.week.price },
                                    { label: '月平均', quantity: selectedCropData?.month.quantity, price: selectedCropData?.month.price },
                                    { label: '季平均', quantity: selectedCropData?.season.quantity, price: selectedCropData?.season.price },
                                ].map((item) => (
                                    <tr className="" key={Math.random().toString(16).slice(2)}>
                                        <td>{item.label}</td>
                                        <td className="text-center">
                                            {
                                                (!loading)
                                                    ? formatter.format(Number(item.quantity) / 1000)
                                                    : <span className="loading loading-spinner loading-md" />
                                            }
                                        </td>
                                        <td className="text-center">
                                            {
                                                (!loading)
                                                    ? formatter.format(Number(item.price))
                                                    : <span className="loading loading-spinner loading-md" />
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </label>
            </label>
        </>
    );
}

export default Modal;
