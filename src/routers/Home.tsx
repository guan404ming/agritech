import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import Rank from '../components/Rank';
import Slide from '../components/Slide';
import axios from '../api';

function Home() {
    const [data, setData] = useState();
    const date = new Date();
    const formatedDate = `${date.getFullYear() - 1911}.${(date.getMonth() + 1 > 10) ? '' : '0'}${date.getMonth() + 1}.${(date.getDate() > 10) ? '' : '0'}${date.getDate()}`;

    useEffect(() => {
        axios
            .get('https://data.coa.gov.tw/api/v1/AgriProductsTransType/', {
                params: {
                    Start_time: formatedDate,
                    End_time: formatedDate,
                    api_key: process.env.REACT_APP_API_KEY,
                },
            })
            .then((res) => {
                setData(res.data.Data);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }, []);

    return (
        <div className="max-w-[1400px] mx-auto overflow-y-scroll">
            <Header />
            <div className="mx-6">

                <Stats />
                <Slide />
                <Rank data={data} />

            </div>
            <Footer />
        </div>
    );
}

export default Home;
