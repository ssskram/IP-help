import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Survey from './components/Survey';
import MobileDevice from './components/MobileDevice/MobileDevice';
import PCOrder from './components/PCOrder/PCOrder';
import EmployeeData from './components/EmployeeData/EmployeeData';
import Other from './components/Other/Other';
import { SelfService } from './components/SelfService';
import Home from './components/Home';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Survey' component={ Survey } />
    <Route path='/MobileDevice' component={ MobileDevice } />    
    <Route path='/EmployeeData' component={ EmployeeData } />    
    <Route path='/PCOrder' component={ PCOrder } />
    <Route path='/Other' component={ Other } />
    <Route path='/SelfService' component={ SelfService } />    
</Layout>;
