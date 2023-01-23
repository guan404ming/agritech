import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import Rank from '../components/Rank';
import Slide from '../components/Slide';
import axios from '../api';
import { Crop } from '../type';

function Home() {
    const [marketName, setMarketName] = useState<string>('台北二');
    const [crops, setData] = useState<Crop[]>([]);
    const date = new Date();
    const formatedDate = `${date.getFullYear() - 1911}.${(date.getMonth() + 1 > 10) ? '' : '0'}${date.getMonth() + 1}.${(date.getDate() > 10) ? '' : '0'}${date.getDate()}`; // eslint-disable-line

    useEffect(() => {
        const fetchData = async (page: number) => {
            await axios
                .get('https://data.coa.gov.tw/api/v1/AgriProductsTransType/', {
                    params: {
                        Start_time: '112.01.01',
                        End_time: formatedDate,
                        MarketName: marketName,
                        Page: page,
                        api_key: process.env.REACT_APP_API_KEY,
                    },
                })
                .then((res) => {
                    // const newCrops: Crop[] = crops.concat(res.data.Data);
                    setData(res.data.Data);
                })
                .catch((err) => {
                    throw new Error(err);
                });
        };
        for (let index = 1; index < 2; index += 1) {
            fetchData(index);
        }
    }, [marketName]);

    return (
        <div className="max-w-[1400px] mx-auto overflow-y-scroll">
            <Header setMarketName={setMarketName} marketName={marketName} />
            <div className="mx-6">
                <Stats />
                <Slide />
                <Rank crops={crops} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
