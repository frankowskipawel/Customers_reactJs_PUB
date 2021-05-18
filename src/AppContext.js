import React, {createContext, useState} from 'react';
import DefaultValues from "./utils/DefaultValues";

export const AppContext = createContext();



const AppProvider = ({children}) => {

//---CONFIG------------------------
    const [config, setConfig] = useState({hostname: 'http://localhost:8000', isUserLogged: false});
    const toggleConfigState = (value) => setConfig(value);

//---ADD/EDIT CUSTOMER CONTEXT-----
    const [addEditCustomer, setAddEditCustomer] = useState(DefaultValues.customerValues);
    const toggleAddEditCustomerState = (value) => setAddEditCustomer(value);

//---CUSTOMERS LIST CONTEXT--------
    const [customersList, setCustomers] = useState({
        customers: [],
        showDeleteModal: false,
        idCustomerToDelete: 0,
        redirectToEdit: false,
        pageNumber: 1,
        totalPages: 1,
        expanded: [],
        searchingWord: ''
    });
    const toggleCustomersState = (value) => setCustomers(value);
//---------------------------------

    return (
        <AppContext.Provider value={{
            config, toggleConfigState,
            addEditCustomer: addEditCustomer, toggleAddEditCustomerState,
            customersList, toggleCustomersState

        }}>
            {children}
        </AppContext.Provider>
    )

};

export default AppProvider;

