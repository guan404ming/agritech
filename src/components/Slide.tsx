import React from 'react';
import { SlideProps } from '../type';

function Slide({ priceVariations, setSelectedCrop }: SlideProps) {
    return (
        <>
            <h1 className="font-bold text-lg my-6">今日漲跌最大</h1>
            <div className="carousel w-full h-1/20 space-x-4 pb-4">
                {
                    priceVariations.slice(0, 10).map((priceVariation, idx) => (
                        <label
                            id={`slide${idx}`}
                            className="carousel-item w-1/3 md:w-1/3 lg:w-1/5 min-w-[175px] cursor-pointer"
                            key={Math.random().toString(16).slice(2)}
                            htmlFor=""
                            onClick={() => {
                                setSelectedCrop(priceVariation.crop);
                                document.getElementById('info-modal-box')?.classList.add('modal-open');
                            }}
                        >
                            <div className="stats shadow-lg relative w-full">
                                {
                                    (priceVariation.priceVariation > 0)
                                        ? (
                                            <div className="text-secondary absolute top-11 right-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                                            </div>
                                        )
                                        : (
                                            <div className="text-accent absolute top-11 right-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" /></svg>
                                            </div>
                                        )
                                }
                                <div className="stat">
                                    <div className="stat-title">{priceVariation.crop.CropName}</div>
                                    <div className="stat-value my-1 text-2xl">{`${priceVariation.priceVariation} %`}</div>
                                    <div className="stat-desc">{priceVariation.crop.TransDate}</div>
                                </div>
                            </div>
                        </label>
                    ))
                }
            </div>
        </>

    );
}

export default Slide;
