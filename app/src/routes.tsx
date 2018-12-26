import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import Home from './components/home'
import EmployeeData from './components/services/employeeData'
import EquipmentDisposal from './components/services/equipmentDisposal'
import EquipmentLoans from './components/services/equipmentLoans'
import HelpContent from './components/FAQ'
import NewTicket from './components/services/miscTicket'
import MobileDevice from './components/services/newMobileDevice'
import NewPC from './components/services/newPC'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/EmployeeData' component={EmployeeData} />
    <Route exact path='/EquipmentDisposal' component={EquipmentDisposal} />
    <Route exact path='/EquipmentLoan' component={EquipmentLoans} />
    <Route exact path='/HelpContent' component={HelpContent} />
    <Route exact path='/Other' component={NewTicket} />
    <Route exact path='/MobileDevice' component={MobileDevice} />
    <Route exact path='/NewPC' component={NewPC} />
  </Layout>
)