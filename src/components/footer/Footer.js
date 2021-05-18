import React, {Component} from 'react';
import {Container} from "@material-ui/core";

class Footer extends Component {
    render() {
        return (
            <div style={{background: '#3f51b5', marginTop: 80}}>
                <Container style={{color: 'white', padding:80}}>
                    Paweł Frankowski<br/>
                    +48 507 14 96 92<br/>
                    <a style={{color: 'white'}} target="_blank" href="http://www.codeworld.pl">www.codeworld.pl</a>
                </Container>
            </div>
        );
    }
}

export default Footer;
