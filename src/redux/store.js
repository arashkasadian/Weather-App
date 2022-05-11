import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import WeatherReduceer from "./weather/weatherreducer";



const store = createStore( WeatherReduceer , applyMiddleware(thunk));
export default store;