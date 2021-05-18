import React, {Component} from 'react';
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import axios from "axios";
import {AppContext} from "../../AppContext";
import {Redirect} from "react-router-dom";

class Login extends Component {

    static contextType = AppContext;

    state = {redirectToList: false}



    handleOnClickLoginButton = () =>{
       axios.get(`${this.context.config.hostname}/api/auth`, {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            },
            withCredentials: true,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        }).then(res => {
            if (res.status === 200) {
                this.setState({redirectToList: true})
                this.context.toggleConfigState({...this.context.config, isUserLogged: true})
            }
            if (res.status === 401){
                window.location.href = `/login`;
            }
        })
            .catch((error) => {
            });
    }

    render() {
        return (
            <Grid container justify="center" style={{marginTop: 60}}>
                {this.state.redirectToList===true ? <Redirect to='/list'/> : false}
                <Paper style={{maxWidth:400, padding:50, margin: 50}}>
                    <Typography variant='h5'>Logowanie</Typography>

                    <TextField
                        style={{minWidth:300}}
                        value='admin'
                        label='login'/><br/>
                    <TextField
                        style={{width:300}}
                        value='admin'
                        label='hasło'
                        type='password'/><br/>
                    <Grid justify="space-between" container spacing={24}>
                        <Grid item/>
                        <Grid item>
                            <div>
                                <Button
                                    style={{marginTop: 20}}
                                    raised
                                    onClick={this.handleOnClickLoginButton}
                                    color="accent"
                                >
                                    Zaloguj
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default Login;
