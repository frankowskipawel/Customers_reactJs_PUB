import {Grid} from "@material-ui/core";
import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import {AppContext} from "../../../AppContext";


export default function PersonFields() {
    const context = useContext(AppContext);

    const handleOnChange = (e) => {
        const type = e.target.value;
        const name = e.target.name;
        context.toggleAddEditCustomerState({...context.addEditCustomer, [name]: type})
    }

    return (
        <>
            <Grid container spacing={3} style={{maxWidth: 700}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='firstName'
                        value={context.addEditCustomer.firstName}
                        onChange={handleOnChange}
                        label="Imię"
                        error={context.addEditCustomer.errorFirstName}
                        helperText={context.addEditCustomer.validatorMessageFirstName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='lastName'
                        value={context.addEditCustomer.lastName}
                        onChange={handleOnChange}
                        label="Nazwisko"
                        error={context.addEditCustomer.errorLastName}
                        helperText={context.addEditCustomer.validatorMessageLastName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='personalIdNumber'
                        value={context.addEditCustomer.personalIdNumber}
                        onChange={handleOnChange}
                        label="PESEL"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='idCardNumber'
                        value={context.addEditCustomer.idCardNumber}
                        onChange={handleOnChange}
                        label="Nr dowodu osobistego"/>
                </Grid>
            </Grid>
        </>
    );
}
