import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { constants } from '../../config/constant';

const cookies = new Cookies();

class Logout extends Component {
    constructor(props) {
        super(props)
        cookies.remove(constants.cookie.key);
    }
    render() {
        return (
            <Redirect to={constants.pages.login.url}> </Redirect>
        )
    }
}

export default Logout;