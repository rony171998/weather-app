import React, { useEffect, useState } from 'react';
import axio from "axios"
import "./Weather.css"
import NewCity from './NewCity';

const Weather = () => {

    useEffect(() => {
        function success(pos) {
            var crd = pos.coords;
            axio.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=1581b57091b320b7a370afc58058cb59`)
            .then((res) => setWeather(res.data));

            const lats =[40.81667,40.4165,35.6895,61.21806]
            const lons =[140.73333,-3.70256,139.69171,-149.90028]

            let ramdonlatlon=Math.floor(Math.random() * (4 - 1)) + 1;
            
            axio.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lats[ramdonlatlon]}&lon=${lons[ramdonlatlon]}&appid=1581b57091b320b7a370afc58058cb59`)
            .then((res) => setWeatherx(res.data));
        }
        navigator.geolocation.getCurrentPosition(success);
    }, [])
    
    const [Weatherx, setWeatherx] = useState({})
    const [Weather, setWeather] = useState({})
    const [signGrades, setSignGrades] = useState("F")
    const [grades, setGrades] = useState(0)
    
    const ChangeCity = () => {
        
        let aux=Weather
        setWeather(Weatherx)
        setWeatherx(aux)  
    }
    
    const ChangeSignGrades = () => {
        if (signGrades === "F") {
            setSignGrades("C");
        } else {
            setSignGrades("F");
        }
    }
    const ChangeGrades = () => {
        const value =(grades===0 ? Weather.main?.temp.toFixed() :grades)
        ChangeSignGrades();
        if (signGrades === "F") {
            setGrades(((value - 32) * 5 / 9).toFixed())
        } else {
            setGrades(((value * 9 / 5) + 32).toFixed())
        }
    }
    const weathers = {
        sun: "https://image-prod.iol.co.za/16x9/800/File-picture-Pexels?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/f1f4bd7d-378c-5679-989c-b46a925dc779&operation=CROP&offset=0x35&resize=1280x720",
        clouds: "https://images.theconversation.com/files/232705/original/file-20180820-30593-1nxanpj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
        storm: "https://media.nationalgeographic.org/assets/photos/000/263/26383.jpg",
        rain: "https://media.nationalgeographic.org/assets/photos/000/263/26383.jpg"
        , lighyrain: "https://media.nationalgeographic.org/assets/photos/000/263/26383.jpg"
        , moderaterain: "https://media.nationalgeographic.org/assets/photos/000/263/26383.jpg"
        , clear: "https://www.langleyadvancetimes.com/wp-content/uploads/2020/03/20890720_web1_Langley-Weather-Sun-Clear-Sky-Skies.jpg"
        , snowy: "https://www.vmcdn.ca/f/files/via/images/weather/vancouver-weather-forecast-december-2021-snowfall.jpg;w=960;h=533;mode=crop"
        , snowyflare: "https://www.vmcdn.ca/f/files/via/images/weather/vancouver-weather-forecast-december-2021-snowfall.jpg;w=960;h=533;mode=crop"
        , fog: "https://ychef.files.bbci.co.uk/976x549/p03j2k8n.jpg"
    }

    const ChangeBackground = () => {
        let keyss = Object.keys(weathers)
        for (let index = 0; index < keyss.length; index++) {
            if (Weather.weather?.[0].main.toLowerCase() === keyss.at(index)) {
                document.body.style.backgroundImage = `url(${weathers[keyss.at(index)]})`
                index = keyss.length
            }
        }
    }
    ChangeBackground();

    
    return (
        <div className='Weather'>
            <div className='WeatherBox'>
                <h1>Weather App</h1>
                <button onClick={ChangeCity}>Change City</button><h2>{Weather.name} ,{Weather.sys?.country}</h2>
                <div className='WeatherImage'>
                    <img src="https://cdn-icons-png.flaticon.com/512/5088/5088080.png" alt="" />
                </div>
                <div className='WeatherDates'>
                    <h2>Weather: {Weather.weather?.[0].main}</h2>
                    <h2>Clouds: {Weather.clouds?.all} %</h2>
                    <h2>Wind Speed: {Weather.wind?.speed} m/s</h2>
                    <h2>Pressure: {Weather.main?.pressure} mb</h2>                   
                    <h2>Temp: {grades===0 ? Weather.main?.temp.toFixed() :grades} °{signGrades}</h2>
                    <button onClick={ChangeGrades}>Degrees</button>
                </div>
            </div>

        </div>
    );
};

export default Weather;