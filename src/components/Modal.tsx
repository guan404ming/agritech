import React from 'react';
import { ModalProps, formatter } from '../type';

function Modal({ crop, selectedCropData }: ModalProps) {
    const income: number = Number(crop?.Avg_Price) * Number(crop?.Trans_Quantity);
    const quantity: number = Number(crop?.Trans_Quantity);

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
                        <span className="font-bold text-lg">{crop?.CropName}</span>
                        <div className="badge badge-primary">{crop?.CropCode}</div>
                        <div className="badge badge-secondary">{crop?.MarketName}</div>
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
                                <div className="stat-value my-1 text-xl">{formatter.format(Number(crop?.Avg_Price))}</div>
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
                        <div className="stats shadow-lg">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">上價</div>
                                <div className="stat-value my-1 text-xl">{formatter.format(Number(crop?.Upper_Price))}</div>
                                <div className="stat-desc">元 / 公斤</div>
                            </div>
                        </div>

                        <div className="stats shadow-lg hidden md:block lg:block">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">中價</div>
                                <div className="stat-value my-1 text-xl">{formatter.format(Number(crop?.Middle_Price))}</div>
                                <div className="stat-desc">元 / 公斤</div>
                            </div>
                        </div>

                        <div className="stats shadow-lg">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">下價</div>
                                <div className="stat-value my-1 text-xl">{formatter.format(Number(crop?.Lower_Price))}</div>
                                <div className="stat-desc">元 / 公斤</div>
                            </div>
                        </div>
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
                                <tr className="" key={Math.random().toString(16).slice(2)}>
                                    <td>今日</td>
                                    <td className="text-center">{formatter.format(Number(crop?.Trans_Quantity) / 1000)}</td>
                                    <td className="text-center">{formatter.format(Number(crop?.Avg_Price))}</td>
                                </tr>
                                <tr className="" key={Math.random().toString(16).slice(2)}>
                                    <td>週平均</td>
                                    <td className="text-center">{formatter.format(Number(selectedCropData?.week.quantity) / 1000)}</td>
                                    <td className="text-center">{formatter.format(Number(selectedCropData?.week.price))}</td>
                                </tr>
                                <tr className="" key={Math.random().toString(16).slice(2)}>
                                    <td>月平均</td>
                                    <td className="text-center">{formatter.format(Number(selectedCropData?.month.quantity) / 1000)}</td>
                                    <td className="text-center">{formatter.format(Number(selectedCropData?.month.price))}</td>
                                </tr>
                                <tr className="" key={Math.random().toString(16).slice(2)}>
                                    <td>季平均</td>
                                    <td className="text-center">{formatter.format(Number(selectedCropData?.season.quantity) / 1000)}</td>
                                    <td className="text-center">{formatter.format(Number(selectedCropData?.season.price))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </label>
            </label>
        </>
    );
}

export default Modal;
