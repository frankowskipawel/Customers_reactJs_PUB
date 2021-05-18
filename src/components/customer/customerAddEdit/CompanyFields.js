import {Grid} from "@material-ui/core";
import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import {AppContext} from "../../../AppContext";


export default function CompanyFields() {
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
                        name='companyName'
                        value={context.addEditCustomer.companyName}
                        onChange={handleOnChange}
                        label="Nazwa pełna"
                        error={context.addEditCustomer.errorCompanyName}
                        helperText={context.addEditCustomer.validatorMessageCompanyName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='taxpayerIdentificationNumber'
                        value={context.addEditCustomer.taxpayerIdentificationNumber}
                        onChange={handleOnChange}
                        label="NIP"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='nationalBusinessRegistryNumber'
                        value={context.addEditCustomer.nationalBusinessRegistryNumber}
                        onChange={handleOnChange}
                        label="REGON"/>
                </Grid>
            </Grid>
        </>
    );
}
