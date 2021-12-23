


import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import TopContext from "./context/TopContext";

import Route from "./router/route"

import {Provider} from 'react-redux';
import store from './redux/store/store';

const App = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  //login 資訊儲存
  // loginInfo={isLogin:false,userName:"names",serviceId:"*",functions:[],"token":null}
  const [loginInfo, setLoginInfo] = useState({isLogin:false,
                                              userName:"postion",
                                              serviceId:"*",
                                              functions:[1,2,3,4,5,6,7,8,9,10],
                                              identity:{"identity":"id"},
                                              token:null});

  return (
      <BrowserRouter>
          <TopContext.Provider value={{ isOpenMenu, setIsOpenMenu,loginInfo, setLoginInfo }}>
           <Provider store={store}>

  
            <Route />
            </Provider>

          </TopContext.Provider>
      </BrowserRouter>
  );
};
export default App;
