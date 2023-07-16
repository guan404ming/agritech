import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Stat from '../components/Stat';
import Rank from '../components/Rank';
import Slide from '../components/Slide';
import Modal from '../components/Modal';
import axios from '../util/api';
import { Crop, PriceVariation } from '../types/type';
import { MarketContext } from '../components/useContext';
import handleFormatDate from '../util/time';

function Home() {
    const { marketName, curDate, prevDate } = useContext(MarketContext);
    const [crops, setCrops] = useState<Crop[]>([]);
    const [prevCrops, setPrevCrops] = useState<Crop[]>([]);
    const [priceVariations, setPriceVariations] = useState<PriceVariation[]>([]);

    // Data
    const handleFetchData = async (page: number, start: Date, end: Date, isCur: boolean) => {
        await axios
            .get('https://data.coa.gov.tw/api/v1/AgriProductsTransType/', {
                params: {
                    Start_time: handleFormatDate(start),
                    End_time: handleFormatDate(end),
                    MarketName: marketName,
                    Page: page,
                    api_key: process.env.REACT_APP_API_KEY,
                },
            })
            .then((res) => {
                if (isCur) {
                    setCrops(res.data.Data);
                } else {
                    setPrevCrops(res.data.Data);
                }
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

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
        (
            async () => {
                await handleFetchData(1, curDate, curDate, true);
                handleFetchData(1, prevDate, prevDate, false);
            }
        )();
    }, [marketName]);

    useEffect(() => {
        handleCompareData();
    }, [prevCrops]);

    return (
        <div className="max-w-[1400px] mx-auto overflow-y-scroll">
            <Header />
            <Modal />
            <div className="mx-6">
                <Stat crops={crops} />
                <Slide priceVariations={priceVariations} />
                <Rank crops={crops} />
            </div>
        </div>
    );
}

export default Home;
