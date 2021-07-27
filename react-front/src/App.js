import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import ContractList from './components/Content/ContractsView/ContractComponent'
import AllContractsComponent from './components/Content/ContractsView/AllContractsComponent'
import ContractInfo from './components/Content/ContractInfo/ContractInfoComponent'
import ContractPlan from './components/Content/ContractInfo/ContractPlan'
import AllTasks from './components/Content/Tasks/AllTasks'
import Header from './components/Header/HeaderComponent';
import Footer from './components/Footer/FooterComponent';
import Login from './components/Content/Autorization/LoginPage';
import Admin from './components/Content/Admin/UserPanel';
import Directions from './components/Content/Admin/Directories/Directories';


function App() {

  function privateRoute(Component) {
    return function (props) {
      let hasUserAccess = JSON.parse(window.localStorage.getItem('hasUserAccess'))
      if (!hasUserAccess) {
        return  <Redirect to="/login" />;
      }
      return <Component {...props} />;
    };
  }

  const Layout = ({ children }) => (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
  
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />
          <Layout>
            <Route path="/myContracts" component={privateRoute(ContractList)} />
            <Route path="/userAdmin" component={privateRoute(Admin)} />
            <Route path="/directions" component={privateRoute(Directions)} />
            <Route path="/contracts" component={privateRoute(AllContractsComponent)} />
            <Route path="/contractInfo" component={privateRoute(ContractInfo)} />
            <Route path="/contractPlan" component={privateRoute(ContractPlan)} />
            <Route path="/allTasks" component={privateRoute(AllTasks)} />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
