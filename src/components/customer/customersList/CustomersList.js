import React, {Component} from 'react';
import axios from "axios";
import {AppContext} from "../../../AppContext";
import PersonIcon from '@material-ui/icons/Person';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Container,
    Divider, Grid, IconButton, Paper, TextField, Typography
} from "@material-ui/core";
import _DeleteCustomer from "./_DeleteCustomer";
import {Redirect} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';

class CustomersList extends Component {

    static contextType = AppContext;

    static loadCustomers(context, page, name) {
        context.toggleAddEditCustomerState({...context.addEditCustomer, redirectToList: false})
        if (name === undefined) {
            name = ''
        }
        axios.get(`${context.config.hostname}/api/customer/page/${page}?name=` + name, {
            withCredentials: true,

        }).then(res => {
            if (res.status === 200) {
                const customers = res.data;
                console.log(customers)
                context.toggleCustomersState({
                    // ...context.customersList,
                    customers: customers.content,
                    showDeleteModal: false,
                    pageNumber: page + 1,
                    totalPages: customers.totalPages - 1
                })
            }
            if (res.status === 401) {
                window.location.href = `/login`;
            }
        })
            .catch((error) => {
            });
    }

    componentDidMount() {
        CustomersList.loadCustomers(this.context, 0, '')
    }


    handleOnClickDeleteButton = (e, data) => {
        this.context.toggleCustomersState(
            {...this.context.customersList, showDeleteModal: true, idCustomerToDelete: e.currentTarget.id}
        )
    }

    handleOnClickEditButton = (customer) => {
        this.context.toggleAddEditCustomerState({...this.context.addEditCustomer, ...customer})
        this.context.toggleCustomersState({...this.context.customersList, redirectToEdit: true})
    }

    handleChangePage = (e, data) => {
        const pageNumber = data;
        console.log(pageNumber)
        CustomersList.loadCustomers(this.context, pageNumber - 1)
    }

    handleOnClickSearchButton = () => {
        CustomersList.loadCustomers(this.context, 0, this.context.customersList.searchingWord)
    }

    handleOnChangeTextField = (e) => {
        this.context.toggleCustomersState({...this.context.customersList, searchingWord: e.target.value})
    }

    render() {
        const {customers} = this.context.customersList


        return (
            <Container style={{maxWidth: 800, marginTop: 40}}>
                {this.context.customersList.redirectToEdit ? <Redirect to='/add'/> : false}
                <Typography
                    variant='h5' style={{marginBottom: 20}}>Lista kontrahentów</Typography>

                <div style={{alignItems: 'left', textAlign: 'left'}}>
                    <TextField
                        id="standard-basic"
                        label="Szukaj..."
                        style={{marginBottom: 25}}
                        onChange={this.handleOnChangeTextField}
                        value={this.context.customersList.searchingWord}
                    />
                    <IconButton aria-label="delete" color="primary" onClick={this.handleOnClickSearchButton}>
                        <SearchIcon/>
                    </IconButton>
                </div>
                {customers.map((customer, index) =>
                    <Accordion key={customer.id}
                               defaultExpanded={false}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                        >
                            <div>
                                <Typography>
                                    {customer.type === 'COMPANY' ?
                                        <> {customer.companyName}</>
                                        :
                                        <>{customer.lastName} {customer.firstName}
                                        </>
                                    }
                                </Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid item xs={12}>
                                <Grid container justify="center">
                                    <Grid item>
                                        <Paper style={{height: 100, width: 250, margin: 5}}>
                                            {customer.type == "COMPANY" ?
                                                <><Typography variant='h6'> Nazwa</Typography>
                                                    {customer.companyName}<br/><LocationCityIcon/>
                                                </>
                                                :
                                                <><Typography variant='h6'> Imię i nazwisko</Typography>
                                                    {customer.firstName} {customer.lastName}<br/><PersonIcon/>
                                                </>
                                            }
                                        </Paper>
                                    </Grid>
                                    <Grid item>
                                        <Paper style={{height: 100, width: 250, margin: 5}}>
                                            <Typography variant='h6'>Adres:</Typography>
                                            {customer.address.street} {customer.address.buildingNumber}
                                            /{customer.address.apartmentNumber}
                                            <br/>{customer.address.postCode} {customer.address.city}
                                            <br/>{customer.address.province}
                                        </Paper>
                                    </Grid>
                                    <Grid item>
                                        <Paper style={{height: 100, width: 250, margin: 5}}>
                                            <Typography variant='h6'>Dane kontaktowe:</Typography>
                                            tel. {customer.phoneNumber}<br/>
                                            {customer.email}<br/>
                                            {customer.webSite}<br/>
                                        </Paper>
                                    </Grid>
                                    <Grid item>
                                        <Paper style={{height: 100, width: 250, margin: 5}}>
                                            <Typography variant='h6'>Pozostałe:</Typography>
                                            {customer.type === "COMPANY" ?
                                                <>
                                                    NIP: {customer.taxpayerIdentificationNumber}<br/>
                                                    REGON: {customer.nationalBusinessRegistryNumber}
                                                </>
                                                :
                                                <>
                                                    PESEL {customer.personalIdNumber}<br/>
                                                    Nr. dow. {customer.idCardNumber}
                                                </>
                                            }
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                        <Divider/>
                        <AccordionActions>
                            <Button size="small" id={customer.id}
                                    onClick={this.handleOnClickDeleteButton}
                            >Usuń</Button>
                            <Button
                                value={customer}
                                size="small" color="primary"
                                onClick={(c) => this.handleOnClickEditButton(customer)}
                            >
                                Edytuj
                            </Button>
                        </AccordionActions>
                    </Accordion>
                )}
                <Pagination style={{marginTop: 20, display: "flex", justifyContent: 'center',}}
                            count={this.context.customersList.totalPages + 1}
                            page={this.context.customersList.pageNumber} onChange={this.handleChangePage}
                            variant="outlined" shape="rounded"/>
                <_DeleteCustomer/>
            </Container>
        );
    }
}

export default CustomersList;
