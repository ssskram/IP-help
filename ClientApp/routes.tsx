import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Survey from './components/Survey';
import { MobileDevice } from './components/Forms/MobileDevice';
import { NetworkRegistration } from './components/Forms/NetworkRegistration';
import Home from './components/Home';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Survey' component={ Survey } />
    <Route path='/NetworkRegistration' component={ NetworkRegistration } />
    <Route path='/MobileDevice' component={ MobileDevice } />    
    <Route path='/Account/Login' component={ Login } />
</Layout>;
