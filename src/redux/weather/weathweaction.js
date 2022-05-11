import axios from 'axios';
import {WEATHER_FETCH_DATA_FAILED, WEATHER_FETCH_DATA_PENDING, WEATHER_FETCH_DATA_SUCCESS} from './weathertype';

    const sendRequest = () => {
        return {
            type: WEATHER_FETCH_DATA_PENDING,
        }
    }
    const receiveData = (data) => {
        return {
            type: WEATHER_FETCH_DATA_SUCCESS,
            payload:data
        }
    }
    const receiveError = (data) => {
        return {
            type: WEATHER_FETCH_DATA_FAILED,
            payload:data
        }
    }
    const fetchWeather = (query) => {
        return (dispatch) => {
            dispatch(sendRequest());
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=44510871c02430b7bfbd3437c53a091e`)
            .then(res => {
                dispatch(receiveData(res.data));
            }).catch(err => {
                dispatch(receiveError(err.message));
            })
        }
    }
    export default fetchWeather;