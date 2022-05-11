import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchWeather from '../redux/weather/weathweaction';
import { motion } from "framer-motion";

const icon = {
    hidden: {
        pathLength: 0,
        fill: "rgba(255, 255, 255, 0)",
        rotate: 0,
    },
    visible: {
        pathLength: 1,
        fill: "rgba(59,130,246, 1)",
        rotate: 280,
        transition: {
            duration: 0.5,
        }
    }
}

const loading = {
    hidden: {

        rotate: 0,
    },
    visible: {
        rotate: 280,
        transition: {
            duration: 0.5,
        }
    }
}

const firstload = {
    hidden: {
        display: "flex",
    },
    visible: {
        transition: {
            delay: 2,
            duration: 0.5,
        },
        display: "none",
    }
}

const cards = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    }
}

const symbols = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 3,
            repeat: "Infinity",
            repeatType: "loop",
            delay: 1,
        },
    }
}
const warm = {
    hidden: {
        y: -10,
    },
    visible: {
        y: 0,
        transition: {
            duration: 3,
            repeat: "Infinity",
            repeatType: "reverse",
            delay: 1,
        },
    }
}


const Weather = () => {
    // useSelector
    const { data, isLoading, error } = useSelector(state => state);
    //state
    const [city, setcity] = useState("");
    const dispatch = useDispatch();
    const handleCityChange = (e) => {
        setcity(e.target.value);
    }
    const hadlegetwather = (e) => {
        e.preventDefault();
        dispatch(fetchWeather(city));
    }
    return (
        <>
            <div className="flex flex-col w-full items-center font-sans h-screen bg-sky bg-no-repeat bg-cover relative">
                <form className="form-control mt-5" onSubmit={hadlegetwather}>
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" value={city} onChange={handleCityChange} />
                        <button type='submit' className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </form>
                {data.main ?
                    <div className="w-full flex flex-col items-center justify-center mt-10">
                        <div className="text-center text-5xl text-white font-bold">{data.name}</div>
                        <span className="text-gray-200 text-sm mt-2">{data.sys.country}</span>
                        <motion.div
                            variants={cards}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap w-full justify-center items-center gap-5">

                            <div className="w-[200px] h-[200px] min-w-[200px]  flex flex-col bg-white shadow-md p-5 items-center justify-between rounded-md mt-10">
                                <div className="text-center  text-gray-500">Temp:{data.main.temp}</div>
                                <div className="text-center flex flex-col items-center ">
                                    <motion.svg
                                        variants={warm}
                                        initial="hidden"
                                        animate="visible"
                                        xmlns="http://www.w3.org/2000/svg" fill={data.main.temp > 20 ? "red" : "blue"} height="48" width="48"><path d="M26.4 19.3V15.7H38.85V19.3ZM26.4 12.7V9H43.35V12.7ZM14.45 42.65Q10.4 42.65 7.525 39.775Q4.65 36.9 4.65 32.85Q4.65 30.4 5.775 28.25Q6.9 26.1 9.15 24.6V10.6Q9.15 8.4 10.7 6.825Q12.25 5.25 14.45 5.25Q16.65 5.25 18.225 6.825Q19.8 8.4 19.8 10.6V24.6Q22 26.05 23.15 28.2Q24.3 30.35 24.3 32.85Q24.3 36.9 21.425 39.775Q18.55 42.65 14.45 42.65ZM8.6 32.85H20.3Q20.3 31.2 19.425 29.45Q18.55 27.7 16.55 26.85L15.8 26.6V10.6Q15.8 10.05 15.4 9.65Q15 9.25 14.45 9.25Q13.9 9.25 13.5 9.65Q13.1 10.05 13.1 10.6V26.6L12.4 26.85Q10.45 27.7 9.525 29.475Q8.6 31.25 8.6 32.85Z" /></motion.svg>
                                    <div className="text-2xl mt-5">
                                        {data.main.temp > 20 ? "Warm" : "Cold"}
                                    </div>
                                </div>
                            </div>
                            <div className="w-[200px] h-[200px] min-w-[200px]  flex flex-col bg-white shadow-md p-5 items-center justify-between rounded-md mt-10">
                                <div className="text-center  text-gray-500">Wind</div>
                                <div className="text-center flex flex-col items-center ">
                                    <motion.svg
                                        variants={symbols}
                                        initial="hidden"
                                        animate="visible"
                                        xmlns="http://www.w3.org/2000/svg" fill="blue" height="48" width="48"><path d="M22.75 42.1Q19.75 42.1 17.925 40.475Q16.1 38.85 16.1 35.65H20.5Q20.5 36.9 21.025 37.525Q21.55 38.15 22.75 38.15Q24.05 38.15 24.575 37.575Q25.1 37 25.1 35.65Q25.1 34.3 24.575 33.65Q24.05 33 22.75 33H3.7V29.05H22.75Q25.8 29.05 27.425 30.675Q29.05 32.3 29.05 35.65Q29.05 38.85 27.425 40.475Q25.8 42.1 22.75 42.1ZM3.7 19.1V15.15H30.9Q32.7 15.15 33.5 14.3Q34.3 13.45 34.3 11.5Q34.3 9.55 33.5 8.7Q32.7 7.85 30.9 7.85Q29.1 7.85 28.3 8.85Q27.5 9.85 27.5 11.3H23.5Q23.5 7.95 25.525 5.925Q27.55 3.9 30.9 3.9Q34.2 3.9 36.225 5.875Q38.25 7.85 38.25 11.5Q38.25 15.2 36.225 17.15Q34.2 19.1 30.9 19.1ZM37.1 37.25V33.25Q38.8 33.25 39.575 32.3Q40.35 31.35 40.35 29.6Q40.35 27.8 39.475 27Q38.6 26.2 36.9 26.2H3.7V22.2H36.9Q40.25 22.2 42.275 24.15Q44.3 26.1 44.3 29.6Q44.3 33.25 42.375 35.25Q40.45 37.25 37.1 37.25Z" /></motion.svg>
                                    <div className="text-2xl mt-5">
                                        {data.wind.speed}
                                    </div>
                                </div>
                            </div>
                            <div className="w-[200px] h-[200px] min-w-[200px]  flex flex-col bg-white shadow-md p-5 items-center justify-between rounded-md mt-10">
                                <div className="text-center  text-gray-500">weather-kind</div>
                                <div className="flex flex-col items-center text-center">
                                    {data.weather[0].description === "clear sky" ?

                                        <motion.svg
                                            variants={symbols}
                                            initial="hidden"
                                            animate="visible"
                                            xmlns="http://www.w3.org/2000/svg" fill='#FFEB3B' height="48" width="48"><path d="M24 34Q19.85 34 16.925 31.075Q14 28.15 14 24Q14 19.85 16.925 16.925Q19.85 14 24 14Q28.15 14 31.075 16.925Q34 19.85 34 24Q34 28.15 31.075 31.075Q28.15 34 24 34ZM3.5 26Q2.65 26 2.075 25.425Q1.5 24.85 1.5 24Q1.5 23.15 2.075 22.575Q2.65 22 3.5 22H8.5Q9.35 22 9.925 22.575Q10.5 23.15 10.5 24Q10.5 24.85 9.925 25.425Q9.35 26 8.5 26ZM39.5 26Q38.65 26 38.075 25.425Q37.5 24.85 37.5 24Q37.5 23.15 38.075 22.575Q38.65 22 39.5 22H44.5Q45.35 22 45.925 22.575Q46.5 23.15 46.5 24Q46.5 24.85 45.925 25.425Q45.35 26 44.5 26ZM24 10.5Q23.15 10.5 22.575 9.925Q22 9.35 22 8.5V3.5Q22 2.65 22.575 2.075Q23.15 1.5 24 1.5Q24.85 1.5 25.425 2.075Q26 2.65 26 3.5V8.5Q26 9.35 25.425 9.925Q24.85 10.5 24 10.5ZM24 46.5Q23.15 46.5 22.575 45.925Q22 45.35 22 44.5V39.5Q22 38.65 22.575 38.075Q23.15 37.5 24 37.5Q24.85 37.5 25.425 38.075Q26 38.65 26 39.5V44.5Q26 45.35 25.425 45.925Q24.85 46.5 24 46.5ZM11.65 14.45 8.8 11.65Q8.2 11.1 8.225 10.25Q8.25 9.4 8.8 8.8Q9.4 8.2 10.2 8.2Q11 8.2 11.65 8.8L14.45 11.65Q15 12.25 15 13.05Q15 13.85 14.45 14.4Q13.9 15 13.075 15Q12.25 15 11.65 14.45ZM36.35 39.2 33.55 36.35Q33 35.75 33 34.95Q33 34.15 33.55 33.55Q34.1 32.95 34.925 32.95Q35.75 32.95 36.35 33.55L39.2 36.35Q39.8 36.9 39.775 37.75Q39.75 38.6 39.2 39.2Q38.6 39.8 37.8 39.8Q37 39.8 36.35 39.2ZM33.55 14.45Q32.95 13.9 32.95 13.075Q32.95 12.25 33.55 11.65L36.35 8.8Q36.9 8.2 37.75 8.225Q38.6 8.25 39.2 8.8Q39.8 9.4 39.8 10.2Q39.8 11 39.2 11.65L36.35 14.45Q35.8 15 34.975 15Q34.15 15 33.55 14.45ZM8.8 39.2Q8.2 38.6 8.2 37.8Q8.2 37 8.8 36.35L11.65 33.55Q12.25 32.95 13.025 32.95Q13.8 32.95 14.4 33.55Q15.05 34.1 15.05 34.925Q15.05 35.75 14.45 36.35L11.65 39.2Q11.1 39.8 10.25 39.775Q9.4 39.75 8.8 39.2Z" /></motion.svg>
                                        : data.weather[0].description === "few clouds" ||"scattered clouds"?
                                            <motion.svg
                                                variants={symbols}
                                                initial="hidden"
                                                animate="visible"
                                                xmlns="http://www.w3.org/2000/svg" fill="lightblue" height="48" width="48"><path d="M12.6 40.7Q7.95 40.7 4.65 37.45Q1.35 34.2 1.35 29.5Q1.35 25.45 3.875 22.275Q6.4 19.1 10.4 18.45Q11.5 13.5 15.325 10.4Q19.15 7.3 24.1 7.3Q29.8 7.3 33.8 11.4Q37.8 15.5 38 21.3V22.5Q41.7 22.65 44.175 25.225Q46.65 27.8 46.65 31.6Q46.65 35.35 43.975 38.025Q41.3 40.7 37.55 40.7Z" /></motion.svg>
                                            : null}
                                    <div className="text-2xl mt-5">
                                        {data.weather[0].description}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    : <div className="flex flex-col items-center justify-center h-screen">
                        <div className="text-center text-2xl text-gray-400">
                           {error ? "City name is worng" : "please enter a valid city"}
                        </div>
                    </div>}
                {isLoading ?
                    <div className="h-screen w-full absolute bg-blue-500 flex justify-center items-center">
                        <motion.div
                            variants={loading}
                            initial="hidden"
                            animate="visible"
                            className="w-[100px] h-[100px] flex justify-center items-center text-center bg-white rounded-full shadow-md shadow-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill='#FFEB3B' height="48" width="48"><path d="M24 34Q19.85 34 16.925 31.075Q14 28.15 14 24Q14 19.85 16.925 16.925Q19.85 14 24 14Q28.15 14 31.075 16.925Q34 19.85 34 24Q34 28.15 31.075 31.075Q28.15 34 24 34ZM3.5 26Q2.65 26 2.075 25.425Q1.5 24.85 1.5 24Q1.5 23.15 2.075 22.575Q2.65 22 3.5 22H8.5Q9.35 22 9.925 22.575Q10.5 23.15 10.5 24Q10.5 24.85 9.925 25.425Q9.35 26 8.5 26ZM39.5 26Q38.65 26 38.075 25.425Q37.5 24.85 37.5 24Q37.5 23.15 38.075 22.575Q38.65 22 39.5 22H44.5Q45.35 22 45.925 22.575Q46.5 23.15 46.5 24Q46.5 24.85 45.925 25.425Q45.35 26 44.5 26ZM24 10.5Q23.15 10.5 22.575 9.925Q22 9.35 22 8.5V3.5Q22 2.65 22.575 2.075Q23.15 1.5 24 1.5Q24.85 1.5 25.425 2.075Q26 2.65 26 3.5V8.5Q26 9.35 25.425 9.925Q24.85 10.5 24 10.5ZM24 46.5Q23.15 46.5 22.575 45.925Q22 45.35 22 44.5V39.5Q22 38.65 22.575 38.075Q23.15 37.5 24 37.5Q24.85 37.5 25.425 38.075Q26 38.65 26 39.5V44.5Q26 45.35 25.425 45.925Q24.85 46.5 24 46.5ZM11.65 14.45 8.8 11.65Q8.2 11.1 8.225 10.25Q8.25 9.4 8.8 8.8Q9.4 8.2 10.2 8.2Q11 8.2 11.65 8.8L14.45 11.65Q15 12.25 15 13.05Q15 13.85 14.45 14.4Q13.9 15 13.075 15Q12.25 15 11.65 14.45ZM36.35 39.2 33.55 36.35Q33 35.75 33 34.95Q33 34.15 33.55 33.55Q34.1 32.95 34.925 32.95Q35.75 32.95 36.35 33.55L39.2 36.35Q39.8 36.9 39.775 37.75Q39.75 38.6 39.2 39.2Q38.6 39.8 37.8 39.8Q37 39.8 36.35 39.2ZM33.55 14.45Q32.95 13.9 32.95 13.075Q32.95 12.25 33.55 11.65L36.35 8.8Q36.9 8.2 37.75 8.225Q38.6 8.25 39.2 8.8Q39.8 9.4 39.8 10.2Q39.8 11 39.2 11.65L36.35 14.45Q35.8 15 34.975 15Q34.15 15 33.55 14.45ZM8.8 39.2Q8.2 38.6 8.2 37.8Q8.2 37 8.8 36.35L11.65 33.55Q12.25 32.95 13.025 32.95Q13.8 32.95 14.4 33.55Q15.05 34.1 15.05 34.925Q15.05 35.75 14.45 36.35L11.65 39.2Q11.1 39.8 10.25 39.775Q9.4 39.75 8.8 39.2Z" /></svg>
                        </motion.div>
                    </div> : null}

                <motion.div
                    variants={firstload}
                    initial="hidden"
                    animate="visible"
                    className="h-screen w-full absolute bg-blue-500 flex flex-col justify-center items-center">
                    <div className="w-[100px] h-[100px] flex justify-center items-center text-center bg-white rounded-full shadow-md shadow-gray-400">

                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                            <motion.path
                                variants={icon}
                                initial="hidden"
                                animate="visible"
                                d="M24.05 31.8Q20.8 31.8 18.5 29.5Q16.2 27.2 16.2 24Q16.2 20.75 18.5 18.475Q20.8 16.2 24 16.2Q27.25 16.2 29.525 18.475Q31.8 20.75 31.8 23.95Q31.8 27.2 29.525 29.5Q27.25 31.8 24.05 31.8ZM24 28.2Q25.75 28.2 26.975 26.95Q28.2 25.7 28.2 24Q28.2 22.25 26.975 21.025Q25.75 19.8 24.05 19.8Q22.3 19.8 21.05 21.025Q19.8 22.25 19.8 23.95Q19.8 25.7 21.05 26.95Q22.3 28.2 24 28.2ZM34.3 44Q35.05 41.65 35.55 39.25Q36.05 36.85 36.3 35.4Q33.8 38.2 30.5 39.475Q27.2 40.75 24 40.75Q17.15 40.75 12.125 39.9Q7.1 39.05 4 38.2V34.3Q6.5 35.1 8.925 35.625Q11.35 36.15 12.75 36.4Q10.15 34.25 8.7 30.775Q7.25 27.3 7.25 24Q7.25 17.7 8.1 12.575Q8.95 7.45 9.8 4H13.7Q12.9 6.4 12.45 8.85Q12 11.3 11.8 12.6Q14.05 10.1 17.25 8.675Q20.45 7.25 24 7.25Q30.75 7.25 35.775 8.1Q40.8 8.95 44 9.8V13.65Q41.45 12.85 39.05 12.35Q36.65 11.85 35.35 11.65Q38.15 14.3 39.45 17.375Q40.75 20.45 40.75 24Q40.75 30.7 39.925 35.725Q39.1 40.75 38.2 44ZM24 37.1Q29.45 37.1 33.275 33.275Q37.1 29.45 37.1 24Q37.1 18.55 33.275 14.725Q29.45 10.9 24 10.9Q18.55 10.9 14.725 14.725Q10.9 18.55 10.9 24Q10.9 29.45 14.725 33.275Q18.55 37.1 24 37.1Z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl text-white mt-5">WEATHER APP</h1>
                </motion.div>
                {data.main ?
                    <div className="text-4xl text-white mt-20">
                        {new Date().toLocaleDateString()}
                    </div>
                    : null}
            </div>
        </>
    );
}

export default Weather;
