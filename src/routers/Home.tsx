import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Stat from '../components/Stat';
import Rank from '../components/Rank';
import Slide from '../components/Slide';
import Modal from '../components/Modal';
import axios from '../api';
import {
    Crop,
    Stats,
    PriceVariation,
    SelectedCropData,
} from '../type';

function Home() {
    const [marketName, setMarketName] = useState<string>('台北二');
    const [crops, setCrops] = useState<Crop[]>([]);
    const [selectedCrop, setSelectedCrop] = useState<Crop>();
    const [selectedCropData, setSelectedCropData] = useState<SelectedCropData>(
        { week: 1, month: 2, season: 3 },
    );
    const [prevCrops, setPrevCrops] = useState<Crop[]>([]); //eslint-disable-line
    const [stats, setStats] = useState<Stats>({ income: 0, quantity: 0 });
    const [priceVariationList, setPriceVariationList] = useState<PriceVariation[]>([]);

    // Date
    const curDate = new Date();
    curDate.setDate(curDate.getDate() - 3);
    const prevDate = new Date();
    prevDate.setDate(curDate.getDate() - 4);

    const handleFormatDate = (date: Date) => (
        [
            date.getFullYear() - 1911,
            (date.getMonth() + 1).toString().padStart(2, '0'),
            (date.getDate()).toString().padStart(2, '0'),
        ].join('.')
    );

    // Stat
    const getStats = (curCrops: Crop[]) => {
        let income = 0;
        let quantity = 0;

        curCrops.forEach((crop) => {
            income += (Number(crop.Avg_Price) * crop.Trans_Quantity);
            quantity += crop.Trans_Quantity;
        });
        setStats({ income, quantity });
    };

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
                // const newCrops: Crop[] = crops.concat(res.data.Data);
                if (isCur) {
                    setCrops(res.data.Data);
                    getStats(res.data.Data);
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
        setPriceVariationList(curPriceVariationList);
    };

    useEffect(() => {
        for (let index = 1; index < 2; index += 1) {
            handleFetchData(index, curDate, curDate, true);
            handleFetchData(index, prevDate, prevDate, false);
        }
    }, [marketName]);

    useEffect(() => {
        handleCompareData();
    }, [marketName, crops, prevCrops]);

    const handleFetchCropData = async (
        start: Date,
        end: Date,
        crop: Crop | undefined,
    ) => {
        const pre = new Date();
        const durations = [7, 30, 60];
        await durations.forEach(async (duration) => {
            pre.setDate(curDate.getDate() - duration);
            await axios
                .get('https://data.coa.gov.tw/api/v1/AgriProductsTransType/', {
                    params: {
                        Start_time: handleFormatDate(pre),
                        End_time: handleFormatDate(end),
                        CropCode: crop?.CropCode,
                        MarketName: marketName,
                    },
                })
                .then((res) => {
                    let sum = 0;
                    (res.data.Data).forEach((data: Crop) => {
                        sum += data.Avg_Price;
                    });
                    const curData = selectedCropData;

                    switch (duration) {
                        case 7:
                            curData.week = sum / res.data.Data.length;
                            setSelectedCropData(curData);
                            break;

                        case 30:
                            curData.month = sum / res.data.Data.length;
                            setSelectedCropData(curData);
                            break;

                        case 60:
                            curData.season = sum / res.data.Data.length;
                            setSelectedCropData(curData);
                            break;

                        default:
                            break;
                    }
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });
    };

    useEffect(() => {
        if (selectedCrop !== undefined) {
            handleFetchCropData(curDate, curDate, selectedCrop);
        }
    }, [selectedCrop]);

    return (
        <div className="max-w-[1400px] mx-auto overflow-y-scroll">
            <Header setMarketName={setMarketName} marketName={marketName} />
            <Modal crop={selectedCrop} prices={selectedCropData} />
            <div className="mx-6">
                <Stat stats={stats} />
                <Slide priceVariationList={priceVariationList} setSelectedCrop={setSelectedCrop} />
                <Rank crops={crops} setSelectedCrop={setSelectedCrop} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
