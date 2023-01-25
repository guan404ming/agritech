import React from 'react';
import { ModalProps } from '../type';

function Modal({ crop }: ModalProps) {
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
                    <div className="space-x-3 mb-6 text-center">
                        <span className="font-bold text-lg">{crop?.CropName}</span>
                        <div className="badge badge-primary">{crop?.CropCode}</div>
                        <div className="badge badge-secondary">{crop?.MarketName}</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 mx-6 gap-2 mb-2">
                        <div className="stats shadow-lg">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">總量</div>
                                <div className="stat-value my-1 text-xl">{String(Number(crop?.Avg_Price) * Number(crop?.Trans_Quantity))}</div>
                                <div className="stat-desc">單位：公噸</div>
                            </div>
                        </div>

                        <div className="stats shadow-lg">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">總額</div>
                                <div className="stat-value my-1 text-xl">{String(crop?.Trans_Quantity)}</div>
                                <div className="stat-desc">單位：萬</div>
                            </div>
                        </div>

                        <div className="stats shadow-lg hidden lg:block text-center">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">均價</div>
                                <div className="stat-value my-1 text-xl">{crop?.Avg_Price}</div>
                                <div className="stat-desc">單位：元</div>
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 mx-6 gap-2">
                        <div className="stats shadow-lg">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">上價</div>
                                <div className="stat-value my-1 text-xl">{crop?.Upper_Price}</div>
                                <div className="stat-desc">單位：元</div>
                            </div>
                        </div>

                        <div className="stats shadow-lg">
                            <div className="stat text-md place-items-center">
                                <div className="stat-title">中價</div>
                                <div className="stat-value my-1 text-xl">{crop?.Middle_Price}</div>
                                <div className="stat-desc">單位：元</div>
                            </div>
                        </div>

                        <div className="stats shadow-lg hidden lg:block text-center">
                            <div className="stat text-md">
                                <div className="stat-title">下價</div>
                                <div className="stat-value my-1 text-xl">{crop?.Lower_Price}</div>
                                <div className="stat-desc">單位：元</div>
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
                                <tr className="hover" key={Math.random().toString(16).slice(2)}>
                                    <td>01 / 18</td>
                                    <td className="text-center">12</td>
                                    <td className="text-center">12</td>
                                </tr>
                                <tr className="hover" key={Math.random().toString(16).slice(2)}>
                                    <td>01 / 11</td>
                                    <td className="text-center">12</td>
                                    <td className="text-center">12</td>
                                </tr>
                                <tr className="hover" key={Math.random().toString(16).slice(2)}>
                                    <td>01 / 04</td>
                                    <td className="text-center">12</td>
                                    <td className="text-center">12</td>
                                </tr>
                                <tr className="hover" key={Math.random().toString(16).slice(2)}>
                                    <td>12 / 28</td>
                                    <td className="text-center">12</td>
                                    <td className="text-center">12</td>
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
