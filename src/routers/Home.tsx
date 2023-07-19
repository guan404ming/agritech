import React, { useState, useEffect } from 'react';
import Stat from '../components/Stat';
import Rank from '../components/Rank';
import Slide from '../components/Slide';
import Modal from '../components/Modal';
import { Crop, PriceVariation } from '../types/type';

interface HomeProps {
    crops: Crop[];
    prevCrops: Crop[];
}

function Home({ crops, prevCrops }: HomeProps) {
    const [priceVariations, setPriceVariations] = useState<PriceVariation[]>([]);

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

    useEffect(() => {
        handleCompareData();
    }, [prevCrops]);

    return (
        <div className="mx-auto overflow-y-scroll">
            <Modal />
            {
                (crops.length !== 0)
                    ? (
                        <div className="mx-8">
                            <Stat crops={crops} />
                            <Slide title="今日漲跌最大" priceVariations={priceVariations} />
                            <Rank crops={crops} />
                        </div>
                    )
                    : (
                        <div className="w-[100vw] h-[100vh]">
                            <span className="loading loading-spinner loading-lg mx-[48%] mt-[20%]" />
                        </div>
                    )
            }
        </div>
    );
}

export default Home;
