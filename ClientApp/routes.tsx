import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { PCOrder } from './components/PCOrder';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/PCOrder' component={ PCOrder } />
    <Route path='/Account/Login' component={ Login } />
</Layout>;
