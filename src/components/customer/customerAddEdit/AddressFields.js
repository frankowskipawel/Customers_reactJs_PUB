import {FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import {AppContext} from "../../../AppContext";


export default function AddressFields() {
    const context = useContext(AppContext);

    const handleOnChange = (e) => {
        const type = e.target.value;
        const name = e.target.name;
        context.toggleAddEditCustomerState({
            ...context.addEditCustomer,
            address: {...context.addEditCustomer.address, [name]: type}
            })
    }

    return (
        <>
            <Typography variant="h5" component="h5" style={{marginTop: 20}}>
                Adres
            </Typography>
            <Grid container spacing={3} style={{maxWidth: 700}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='street'
                        value={context.addEditCustomer.address.street}
                        onChange={handleOnChange}
                        label="Ulica"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='buildingNumber'
                        value={context.addEditCustomer.address.buildingNumber}
                        onChange={handleOnChange}
                        label="Nr budunku"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='apartmentNumber'
                        value={context.addEditCustomer.address.apartmentNumber}
                        onChange={handleOnChange}
                        label="Nr lokalu"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='postCode'
                        value={context.addEditCustomer.address.postCode}
                        onChange={handleOnChange}
                        label="Kod pocztowy"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name='city'
                        value={context.addEditCustomer.address.city}
                        onChange={handleOnChange}
                        label="Miasto"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl   style={{width: '100%', maxWidth: 300, marginTop:8}}>
                        <InputLabel>Województwo</InputLabel>
                        <Select
                            name='province'
                            value={context.addEditCustomer.address.province}
                            onChange={handleOnChange}
                        >
                            {context.addEditCustomer.provinces.map(province =>
                                <MenuItem key={province.id} value={province}>{province}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}
