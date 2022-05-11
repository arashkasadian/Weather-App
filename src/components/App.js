import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Weather from './weather';

const App = () => {
    return (
        <>
            <Provider store={store}>
                <Weather />
            </Provider>
        </>
    );
}

export default App;
