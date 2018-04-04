import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { PCOrder } from './components/PCOrder';
import { NetworkRegistration } from './components/NetworkRegistration';
import { MobileDevice } from './components/MobileDevice';
import { OfficeMoves } from './components/OfficeMoves';
import { PrintShop } from './components/PrintShop';
import { Blank } from './components/Blank';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/PCOrder' component={ PCOrder } />
    <Route path='/Account/Login' component={ Login } />
    <Route path='/NetworkRegistration' component={ NetworkRegistration } />
    <Route path='/MobileDevice' component={ MobileDevice } />    
    <Route path='/OfficeMoves' component={ OfficeMoves } />
    <Route path='/PrintShop' component={ PrintShop } />
    <Route path='/Blank' component={ Blank } />    
</Layout>;
