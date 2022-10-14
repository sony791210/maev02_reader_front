import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import index from '../components/Main';
import search from '../components/search';
import bookIntroduce  from '../components/bookIntroduce';
import comicIntroduce from '../components/comicIntroduce';
// import about from '../components/about';
import read from '../components/read';
import readByPage from '../components/readByPage';

import comicRead from '../components/comicRead'
import videoRead from '../components/videoRead'

import bookshop from '../components/bookshop';


import importdata    from '../components/importdata';
import websiteSearch from '../components/websiteSearch';

// import changeOrigin from '../components/changeOrigin';


const RouteConfig = () => (
  
  <Switch>
    {/* <Route path="/" exact component={index} />
    <Route path="/search" exact component={search} />
    <Route path="/bookIntroduce/:id"  component={bookIntroduce} />
    <Route path="/about" exact component={about} />
    <Route path="/read/:id" exact component={read} />
    <Route path="/changeOrigin/:id" exact component={changeOrigin} />
    <Route component={index} /> */}
    <Route path="/" exact component={index} /> 
    <Route path="/search" exact component={search} />
    <Route path="/bookshop" exact component={bookshop} />
    <Route path="/bookIntroduce/:id"   component={bookIntroduce} />
    <Route path="/read/:id/:page" exact component={read} />
    <Route path="/readbypage/:id/:page" exact component={readByPage} />


    <Route path="/comicIntroduce/:id"  component={comicIntroduce} />
    <Route path="/comicRead/:id/:page" exact component={comicRead} />


    <Route path="/videoRead/:id/:page" exact component={videoRead} />



    <Route path="/importdata" exact component={importdata} />
    <Route path="/importdata/:type/:website/search" exact component={websiteSearch} />

    


  </Switch>

)


export default RouteConfig

