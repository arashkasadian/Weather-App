import {WEATHER_FETCH_DATA_FAILED, WEATHER_FETCH_DATA_PENDING, WEATHER_FETCH_DATA_SUCCESS} from './weathertype';

const initialState = {
    data: {},
    isLoading: false,
    error: null
}

const WeatherReduceer = (state = initialState, action) => {

    switch (action.type) {
        case WEATHER_FETCH_DATA_SUCCESS:
            return {
                data: action.payload,
                isLoading: false,
                error: null
            }
        case WEATHER_FETCH_DATA_FAILED:
            return {
                data: {},
                isLoading: false,
                error: action.payload
            }
        case WEATHER_FETCH_DATA_PENDING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}

export default WeatherReduceer;