import React, {Component} from 'react';

class DefaultValues extends Component {

    static customerValues = {
        type: 'COMPANY',
        shortName: '',
        companyName: '',
        taxpayerIdentificationNumber: '',
        nationalBusinessRegistryNumber: '',
        firstName: '',
        lastName: '',
        personalIdNumber: '',
        idCardNumber: '',
        address: {
            apartmentNumber: '',
            buildingNumber: '',
            city: '',
            country: '',
            postCode: '',
            province: '',
            street: ''
        },
        phoneNumber: '',
        email: '',
        webSite: '',
        provinces: [
            'dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie',
            'mazowieckie', 'opolskie', 'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie',
            'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie'
        ],
        redirectToList: false,

        errorCompanyName: false,
        validatorMessageCompanyName: '',
        errorFirstName: false,
        validatorMessageFirstName: '',
        errorLastName: false,
        validatorMessageLastName: '',
        errorEmail: false,
        validatorMessageEmail: ''

    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

export default DefaultValues;
