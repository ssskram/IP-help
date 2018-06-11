import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { PCOrder } from './components/Forms/PCOrder';
import { MobileDevice } from './components/Forms/MobileDevice';
import { Other } from './components/Forms/Other';
import { SelfService } from './components/SelfService';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/PCOrder' component={ PCOrder } />
    <Route path='/Account/Login' component={ Login } />
    <Route path='/MobileDevice' component={ MobileDevice } />    
    <Route path='/Other' component={ Other } />
    <Route path='/SelfService' component={ SelfService } />    
</Layout>;
