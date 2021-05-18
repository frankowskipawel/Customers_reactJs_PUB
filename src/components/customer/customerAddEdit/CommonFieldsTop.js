import {FormControlLabel, Grid, Radio, RadioGroup, Typography} from "@material-ui/core";
import React, {useContext} from "react";
import {AppContext} from "../../../AppContext";


export default function CommonFieldsTop() {
    const context = useContext(AppContext);

    const handleOnChange = (e) => {
        const type = e.target.value;
        const name = e.target.name;
        context.toggleAddEditCustomerState({...context.addEditCustomer, [name]: type})
    }

    return (
        <>
            <Typography variant="h5" component="h5" style={{marginTop: 20}}>
                Dane
            </Typography>
            <RadioGroup name="type" defaultValue={context.addEditCustomer.type}>

                    <Grid item xs={12} sm={12} style={{marginTop: 20}}>

                        <FormControlLabel
                            name='type'
                            value="COMPANY"
                            control={<Radio/>}
                            label="Firma"
                            onChange={handleOnChange}
                        />
                        <FormControlLabel
                            name='type'
                            value="PERSON"
                            control={<Radio/>}
                            label="Osoba"
                            onChange={handleOnChange}
                        />
                    </Grid>
            </RadioGroup>
        </>
    );
}
