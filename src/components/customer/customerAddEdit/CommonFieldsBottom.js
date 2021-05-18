import {Grid, Typography} from "@material-ui/core";
import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import {AppContext} from "../../../AppContext";


export default function CommonFieldsBottom() {
    const context = useContext(AppContext);

    const handleOnChange = (e) => {
        const type = e.target.value;
        const name = e.target.name;
        context.toggleAddEditCustomerState({...context.addEditCustomer, [name]: type})
    }

    return (
        <>
            <Typography variant="h5" component="h5" style={{marginTop: 20}}>
                Inne
            </Typography>
            <Grid container spacing={3} style={{maxWidth: 700}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='phoneNumber'
                        value={context.addEditCustomer.phoneNumber}
                        onChange={handleOnChange}
                        label="Numer telefonu"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='email'
                        value={context.addEditCustomer.email}
                        onChange={handleOnChange}
                        label="Email"
                        error={context.addEditCustomer.errorEmail}
                        helperText={context.addEditCustomer.validatorMessageEmail}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='webSite'
                        value={context.addEditCustomer.webSite}
                        onChange={handleOnChange}
                        label="Stwona www"/>
                </Grid>
            </Grid>
        </>
    );
}
