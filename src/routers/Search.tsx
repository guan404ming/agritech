import React, { useContext, useEffect, useState } from 'react';
import { Crop, PriceVariation } from '../types/type';
import Slide from '../components/Slide';
import Modal from '../components/Modal';
import { MarketContext } from '../util/useContext';

interface SearchProps {
    crops: Crop[];
    prevCrops: Crop[];
}

function Search({ crops, prevCrops }: SearchProps) {
    const { setSelectedCrop } = useContext(MarketContext);
    const [priceVariations, setPriceVariations] = useState<PriceVariation[]>([]);
    const [target, setTarget] = useState<string>('');

    // Data
    const handleCompareData = () => {
        const curPriceVariationList: PriceVariation[] = [];
        crops.forEach((crop) => {
            const prev = prevCrops.find((prevcrop) => prevcrop.CropCode === crop.CropCode);
            if (prev) {
                const difference = (Number(crop.Avg_Price) - Number(prev.Avg_Price));
                const priceVariation = (Number(crop.Avg_Price) !== Number(prev.Avg_Price))
                    ? Math.round((difference / Number(prev.Avg_Price)) * 100) / 100
                    : 0;
                curPriceVariationList.push({ crop, priceVariation });
            }
        });
        curPriceVariationList.sort((a, b) => (
            (Math.abs(a.priceVariation) > Math.abs(b.priceVariation)) ? -1 : 1
        ));
        setPriceVariations(curPriceVariationList);
    };

    const handleFilterCrops = (filter: 'all' | 'fruit' | 'vegatable' | 'flower'): PriceVariation[] => {
        switch (filter) {
            case 'all':
                return priceVariations;

            case 'fruit':
                return priceVariations.filter((priceVariation) => priceVariation.crop.CropCode.match(/^[A-Z][0-9]*$/));

            case 'vegatable':
                return priceVariations.filter((priceVariation) => priceVariation.crop.CropCode.match(/^[A-Z][A-Z][0-9]*$/));

            case 'flower':
                return priceVariations.filter((priceVariation) => priceVariation.crop.CropCode.match(/^[A-Z][A-Z][0-9][0-9][0-9]$/));

            default:
                return priceVariations;
        }
    };

    useEffect(() => {
        handleCompareData();
    }, [prevCrops]);

    return (
        <div className="mx-auto overflow-y-scroll">
            <Modal />
            <div className="mx-8 mb-20">
                <div className="join my-6 join-horizontal">
                    <input
                        className="input input-bordered join-item w-[72vw] md:w-[82vw] lg:w-[88vw]"
                        placeholder="輸入名稱搜索"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    />
                    <div className="indicator">
                        <button
                            className="btn join-item"
                            type="submit"
                            onClick={() => {
                                const res = crops.find((crop) => crop.CropName.includes(target));
                                console.log(res);
                                if (res) {
                                    setSelectedCrop(res);
                                    document.getElementById('info-modal-box')?.classList.add('modal-open');
                                } else {
                                    setTarget('查無此產品');
                                }
                            }}
                        >
                            點擊搜索
                        </button>
                    </div>
                </div>
                <Slide title="今日漲跌最大" priceVariations={handleFilterCrops('all')} />
                <Slide title="蔬菜類漲跌最大" priceVariations={handleFilterCrops('vegatable')} />
                <Slide title="水果類漲跌最大" priceVariations={handleFilterCrops('fruit')} />
                <Slide title="花卉類漲跌最大" priceVariations={handleFilterCrops('flower')} />
            </div>
        </div>
    );
}

export default Search;
