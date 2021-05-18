import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, FormControl, Typography} from "@material-ui/core";
import CompanyFields from "./CompanyFields";
import PersonFields from "./PersonFields";
import AddressFields from "./AddressFields";
import {AppContext} from "../../../AppContext";
import CommonFieldsTop from "./CommonFieldsTop";
import CommonFieldsBottom from "./CommonFieldsBottom";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import DefaultValues from "../../../utils/DefaultValues";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
}));


export default function AddEditCustomer() {
    const classes = useStyles();
    const context = useContext(AppContext);


    const handleOnClickSaveButton = () => {

        const customer = context.addEditCustomer
        console.log(context.addEditCustomer.id)
        context.toggleCustomersState({...context.customersList, redirectToEdit: false})

        if (validation(context)) {
            if (context.addEditCustomer.id === undefined) {

                axios.post(`${context.config.hostname}/api/customer`,
                    customer,
                    {withCredentials: true}
                ).then(res => {
                    if (res.status === 200) {
                        const defaultValues = DefaultValues.customerValues
                        context.toggleAddEditCustomerState({...defaultValues, redirectToList: true})
                    }
                    if (res.status === 401) {
                        window.location.href = `/login`;
                    }
                })
                    .catch((error) => {
                        console.log({error})
                    });
            } else {
                axios.put(`${context.config.hostname}/api/customer`,
                    customer,
                    {withCredentials: true}
                ).then(res => {
                    if (res.status === 200) {
                        const defaultValues = DefaultValues.customerValues
                        context.toggleAddEditCustomerState({...defaultValues, redirectToList: true})
                    }
                    if (res.status === 401) {
                        window.location.href = `/login`;
                    }
                })
                    .catch((error) => {
                        console.log({error})
                    });
            }
        }
    }
    return (
        <>
            {context.addEditCustomer.redirectToList ? <Redirect to='/list'/> : false}
            {context.addEditCustomer.id === undefined ?
                <Typography style={{marginTop: 20}} variant='h5'>Nowy kontrahent</Typography>
                :
                <Typography style={{marginTop: 20}} variant='h5'>Edycja kontrahenta</Typography>
            }

            <form className={classes.root} noValidate autoComplete="off">
                <FormControl component="fieldset">
                    <CommonFieldsTop/>
                    {context.addEditCustomer.type === 'COMPANY' ? <CompanyFields/> : <PersonFields/>}
                    <AddressFields/>
                    <CommonFieldsBottom/>

                    <Button
                        style={{marginTop: 10, marginBottom: 10}}
                        variant="contained"
                        color="primary"
                        onClick={handleOnClickSaveButton}
                    >
                        Zapisz
                    </Button>
                </FormControl>
            </form>
        </>
    );
}

function validation(context) {

    let validator = true;
    let errorCompanyName = false;
    let validatorMessageCompanyName = '';
    let errorFirstName = false;
    let validatorMessageFirstName = '';
    let errorLastName = false;
    let validatorMessageLastName = '';
    let errorEmail = false;
    let validatorMessageEmail = '';

    if (context.addEditCustomer.companyName.length < 3 && context.addEditCustomer.type === 'COMPANY') {
        errorCompanyName = true;
        validatorMessageCompanyName = 'Nazwa musi mieć min 3 znaki'
        validator = false;
    }

    if (context.addEditCustomer.firstName.length < 3 && context.addEditCustomer.type === 'PERSON') {
        errorFirstName = true;
        validatorMessageFirstName = 'Imię musi mieć min 3 znaki'
        validator = false;
    }

    if (context.addEditCustomer.lastName.length < 3 && context.addEditCustomer.type === 'PERSON') {
        errorLastName = true;
        validatorMessageLastName = 'Nazwisko musi mieć min 3 znaki'
        validator = false;
    }

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = regex.test(String(context.addEditCustomer.email).toLowerCase());
    if (context.addEditCustomer.email.length === 0) {
        errorEmail = true;
        validatorMessageEmail = 'Adres email jest wymagany'
        validator = false;
    } else if (!isValidEmail) {
        errorEmail = true;
        validatorMessageEmail = 'Niepoprawny adres email'
        validator = false;
    }


    context.toggleAddEditCustomerState({
        ...context.addEditCustomer,
        errorCompanyName,
        validatorMessageCompanyName,
        errorFirstName,
        validatorMessageFirstName,
        errorLastName,
        validatorMessageLastName,
        errorEmail,
        validatorMessageEmail
    })

    return validator
}



