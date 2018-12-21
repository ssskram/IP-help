import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import Home from './home'
import EmployeeData from './components/modules/employeeData'
import EquipmentDisposal from './components/modules/equipmentDisposal'
import EquipmentLoans from './components/modules/equipmentLoans'
import HelpContent from './components/modules/helpContent'
import NewTicket from './components/modules/miscTicket'
import MobileDevice from './components/modules/newMobileDevice'
import NewPC from './components/modules/newPC'

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