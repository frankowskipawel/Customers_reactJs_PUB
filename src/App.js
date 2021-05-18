import './App.css';
import NavBar from "./components/navbar/NavBar";
import AddEditCustomer from "./components/customer/customerAddEdit/AddEditCustomer";
import AppProvider from "./AppContext";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CustomersList from "./components/customer/customersList/CustomersList";
import Footer from "./components/footer/Footer";
import Login from "./components/login/login";


function App() {
    return (
        <div className="App">

            <AppProvider>
                <Router>
                    <NavBar/>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/list" exact component={CustomersList}/>
                        <Route path="/add" exact component={AddEditCustomer}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                </Router>
                <Footer/>
            </AppProvider>

        </div>
    );
}

export default App;
