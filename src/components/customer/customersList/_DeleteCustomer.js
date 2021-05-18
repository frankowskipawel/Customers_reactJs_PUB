import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {AppContext} from "../../../AppContext";
import {Button} from "@material-ui/core";
import axios from "axios";
import CustomersList from "./CustomersList";
import DefaultValues from "../../../utils/DefaultValues";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function _DeleteCustomer() {
    const classes = useStyles();
    const context = useContext(AppContext);

    const handleOnClickDeleteButton = () => {

        axios.delete(`${context.config.hostname}/api/customer/` + context.customersList.idCustomerToDelete, {
                withCredentials: true
            },
        ).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                const defaultValues = DefaultValues.customerValues
                context.toggleAddEditCustomerState({...defaultValues, redirectToList: true, showDeleteModal: false})
                CustomersList.loadCustomers(context, 0)
            }
            if (res.status === 401){
                window.location.href = `/login`;
            }
        })
            .catch((error) => {
                console.log({error})
            });
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={context.customersList.showDeleteModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={context.customersList.showDeleteModal}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Czy napewno chcesz usunąć kontrahenta</h2>
                        <Button onClick={() => context.toggleCustomersState(
                            {...context.customersList, showDeleteModal: false}
                        )}>Anuluj</Button>
                        <Button onClick={handleOnClickDeleteButton}>Usuń</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
