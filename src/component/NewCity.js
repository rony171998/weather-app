import React, { useEffect, useState } from 'react';
import axio from "axios"

const NewCity = () => {

    const lats = [40.81667, 40.4165, 35.6895, 61.21806]
        const lons = [140.73333, -3.70256, 139.69171, -149.90028]

        let ramdonlatlon = Math.floor(Math.random() * (4 - 1)) + 1;

    useEffect(()=>{
    
        axio.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lats[ramdonlatlon]}&lon=${lons[ramdonlatlon]}&appid=1581b57091b320b7a370afc58058cb59`)
        .then((res) => setWeatherx(res.data));
    },[])
    const [Weatherx, setWeatherx] = useState({})
    return (
        <div>

        </div>
    );
};

export default NewCity;