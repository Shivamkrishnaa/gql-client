import Cookies from 'universal-cookie';
import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from "@material-ui/core/FormControl";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import AddAlert from "@material-ui/icons/AddAlert";
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';

import axios from '../../axios';
import Snackbar from '../Notification/Snackbar';
import { constants } from '../../config/constant';

const cookies = new Cookies();
const useStyles = makeStyles((theme) => ({ inputPadding: { padding: '8px' }, paperContainer: {}, cardHeader: { textAlign: 'center' }, buttonPadding: { marginBottom: '1px', marginTop: '25px' }, root: { flexGrow: 1, justifyContent: 'center' }, cardHidden: { opacity: "0", transform: "translate3d(0, -60px, 0)" }, paper: { padding: theme.spacing(2), margin: 'auto', maxWidth: 500, }, image: { width: 128, height: 128, }, img: { margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%', }, }));

export default function ComplexGrid() {
  const classes = useStyles();

  const [notify, setNotify] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [info, setInfo] = React.useState(false);
  const [customDanger, setCustomDanger] = React.useState(false);
  const [customMsg, setCustomMsg] = React.useState('');
  const didMount = useRef(false);

  const showNotification = (type) => {
    switch (type) {
      case "s": {
        setNotify(true);
        setTimeout(function () {
          setNotify(false);
        }, 6000);
      }
      break;
      case "d": {
        setDanger(true);
        setTimeout(function () {
          setDanger(false);
        }, 6000);
      }
      break;
      case "i": {
        setInfo(true);
        setTimeout(function () {
          setInfo(false);
        }, 6000);
      }
      break;
      case "c": {
        setCustomDanger(true);
        setTimeout(function () {
          setCustomDanger(false);
        }, 6000);
      }
    }
  }

  React.useEffect(() => {
    if (didMount.current) showNotification('c');
    else didMount.current = true;
  }, [customMsg]);

  const [formData, setFormData] = React.useState({ phone: '', password: '' });

  const login = function () {
    axios({
      method: constants.api.login.method,
      url: constants.api.login.url,
      data: formData
    })
      .then(r => {
        showNotification('s');
        cookies.set(constants.cookie.key, r.data.token, { path: '/' });
        setTimeout(() => {
          window.location = "/";
        }, 1000)
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length) {
          const [msg] = error.response.data.errors;
          setCustomMsg(msg);
        }
        else showNotification('d');
      })
  }
  return (
    <div >
      <Grid container spacing={3} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card login="true" >
            <CardHeader className={classes.cardHeader} title="Log in" color="rose" >
            </CardHeader>
            <CardContent>
              <form noValidate autoComplete="off">
                <FormControl fullWidth={true}>
                  <Input onChange={(e) => { setFormData({ ...formData, phone: e.target.value }) }} placeholder="Phone or Email" className={classes.inputPadding} id="phone" endAdornment={<InputAdornment position="start"> <Email /> </InputAdornment>} />
                </FormControl>
                <FormControl fullWidth={true}>
                  <Input onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} placeholder="Password" className={classes.inputPadding} id="password" endAdornment={<InputAdornment position="start"> <Lock /> </InputAdornment>} />
                </FormControl>
                <Box textAlign='center'>
                  <Button className={classes.buttonPadding} onClick={() => { login(); }} color="secondary">Login</Button>
                </Box>
                <Box textAlign='center'>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid >
      </Grid>
      <Snackbar place='tr' color='success' icon={AddAlert} message={constants.notification.login.s} open={notify} closeNotification={() => setNotify(false)} close />
      <Snackbar place='tr' color='info' icon={AddAlert} message={constants.notification.login.i} open={info} closeNotification={() => setInfo(false)} close />
      <Snackbar place='tr' color='danger' icon={AddAlert} message={constants.notification.login.d} open={danger} closeNotification={() => setDanger(false)} close />
      <Snackbar place='tr' color='danger' icon={AddAlert} message={customMsg} open={customDanger} closeNotification={() => setCustomDanger(false)} close />
    </div>
  );
}