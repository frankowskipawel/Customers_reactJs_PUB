import React, {Component, useContext} from 'react';
import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import {AppContext} from "../../AppContext";
import DefaultValues from "../../utils/DefaultValues";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar() {

    const classes = useStyles();
    const context = useContext(AppContext);

    const handleOnClickAddCustomer = () => {
        const defaultValues = DefaultValues.customerValues
        context.toggleAddEditCustomerState({
            ...defaultValues,
            id: undefined,
            redirectToList: false
        })
    }

    const handleOnClickLogout = () =>{
        axios.get(`${context.config.hostname}/logout`, {
        }).then(res => {
            if (res.status === 200) {
                window.location.href = `/login`;
            }
        })
            .catch((error) => {
            });
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <GroupIcon/>&nbsp;&nbsp;&nbsp;<Typography variant='h6'>
                    <Button
                        color="inherit"
                    >KONTRAHENCI - zadanie rekrutacyjne</Button>
                </Typography>
                    <Typography variant="h7" className={classes.title}>
                        {context.config.isUserLogged===true ?
                            <>
                        <Button
                            component={Link}
                            color="inherit"
                            to='/list'
                            onClick={() => context.toggleCustomersState({
                                ...context.customersList, redirectToEdit: false
                            })}
                        >Lista</Button>
                        <Button
                            component={Link}
                            color="inherit"
                            to='/add'
                            onClick={handleOnClickAddCustomer}
                        >Dodaj</Button> </>: false}
                    </Typography>
                    {context.config.isUserLogged===true ?
                    <Button component={Link}
                            color="inherit"
                            to='/login'
                            color="inherit"
                            onClick={handleOnClickLogout}
                    >Wyloguj</Button>
                        :
                        <Button component={Link}
                                color="inherit"
                                to='/login'
                                color="inherit"
                        >Zaloguj</Button>}
                        </Toolbar>
            </AppBar>
        </div>
    );
}
