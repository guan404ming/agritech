import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import Rank from '../components/Rank';
import Slide from '../components/Slide';

function Home() {
    return (
        <div className="max-w-[1400px] mx-auto overflow-y-scroll">
            <Header />
            <div className="mx-6">

                <Stats />
                <Slide />
                <Rank />

            </div>
            <Footer />
        </div>
    );
}

export default Home;
