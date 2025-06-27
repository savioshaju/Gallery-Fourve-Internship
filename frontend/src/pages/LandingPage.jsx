import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; 


const LandingPage = () => {
    return (
        <div className='relative bg-gradient-135'>
            <main
                className="pt-20 h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-135"
                style={{
                    animation: 'fadeInUp 1s ease'
                }}
            >
                <h1 className="text-4xl font-bold mb-4 text-white">
                    Welcome to My Gallery
                </h1>
                <p className="text-white text-lg mb-6 max-w-2xl">
                    Discover stunning visuals crafted with creativity and care.
                </p>
                <Link to="/home">
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-full drop-shadow-lg hover:bg-indigo-400 transition transform hover:scale-105 duration-300">
                        View Gallery
                    </button>
                </Link>
            </main>
            <Footer />
            <style>
                {`
                @keyframes fadeInUp {
                  0% {
                    opacity: 0;
                    transform: translateY(40px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                `}
            </style>
        </div>
    );
};

export default LandingPage;
