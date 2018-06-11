import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Survey from './components/Survey';
import { MobileDevice } from './components/Forms/MobileDevice';
import { PCOrder } from './components/Forms/PCOrder';
import { Other } from './components/Forms/Other';
import { SelfService } from './components/SelfService';
import { NetworkRegistration } from './components/Forms/NetworkRegistration';
import Home from './components/Home';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Survey' component={ Survey } />
    <Route path='/NetworkRegistration' component={ NetworkRegistration } />
    <Route path='/MobileDevice' component={ MobileDevice } />    
    <Route path='/PCOrder' component={ PCOrder } />
    <Route path='/Account/Login' component={ Login } />
    <Route path='/Other' component={ Other } />
    <Route path='/SelfService' component={ SelfService } />    
</Layout>;
