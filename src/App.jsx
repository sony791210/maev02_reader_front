import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";

import TopContext from "./context/TopContext";

import Route from "./router/route"

import {Provider} from 'react-redux';
import store from './redux/store/store';

const App = () => {
    //login 資訊儲存
    const [loginInfo, setLoginInfo] = useState({
        isLogin: false,
        token: null
    });


    React.useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            setLoginInfo({...loginInfo, isLogin: true, token: token})
        }
    }, [])

    return (
        <BrowserRouter>
            <TopContext.Provider value={{loginInfo, setLoginInfo}}>
                <Provider store={store}>


                    <Route/>
                </Provider>

            </TopContext.Provider>
        </BrowserRouter>
    );
};
export default App;
