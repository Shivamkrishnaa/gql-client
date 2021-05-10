import React, { useEffect } from 'react'
import Cookies from 'universal-cookie';

import { makeStyles } from '@material-ui/core/styles';

import axios from '../../axios';
import Header from '../Header/Header';
import { constants } from '../../config/constant';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    }
}));

export default (WrappedComponent) => {
    function requireAuth(props) {
        const classes = useStyles();
        const cookies = new Cookies();
        const [user, setUser] = React.useState('');
        useEffect(() => {
            const headers = {};
            headers[constants.cookie.key] = cookies.get(constants.cookie.key)
            axios({
                method: constants.api.token.method,
                url: constants.api.token.url,
                headers
            })
                .then(r => {
                    setUser({ user: r.data });
                })
                .catch(err => {
                    if (err.response && err.response.status == 403) window.location.href = constants.pages.login.url;
                });
        }, []);
        return (
            <div className={classes.root}> <Header />
                <WrappedComponent {...props} {...user} />
            </div>
        )
    }

    return requireAuth;
};