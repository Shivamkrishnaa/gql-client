import Link from '@material-ui/core/Link';
import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import Box from '@material-ui/core/Box';


import AddAlert from "@material-ui/icons/AddAlert";
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';

import Snackbar from '../Notification/Snackbar';
import axios from '../../axios';
import { constants } from '../../config/constant';

const useStyles = makeStyles((theme) => ({ inputPadding: { padding: '8px' }, paperContainer: {}, cardHeader: { textAlign: 'center' }, buttonPadding: { marginBottom: '1px', marginTop: '25px' }, root: { flexGrow: 1, justifyContent: 'center' }, cardHidden: { opacity: "0", transform: "translate3d(0, -60px, 0)" }, paper: { padding: theme.spacing(2), margin: 'auto', maxWidth: 500, }, image: { width: 128, height: 128, }, img: { margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%', }, }));

export default function ComplexGrid() {
  const classes = useStyles();

  const [notify, setNotify] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [customDanger, setCustomDanger] = React.useState(false);
  const [customMsg, setCustomMsg] = React.useState('');
  const didMount = useRef(false);
  const [errors, setErrors] =  React.useState({firstName: false, lastName: false, email: false, password: false, phone: false })

  React.useEffect(() => {
    if (didMount.current) showNotification('c');
    else didMount.current = true;
  }, [customMsg])

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
      case "c": {
        setCustomDanger(true);
        setTimeout(function () {
          setCustomDanger(false);
        }, 6000);
      }
    }
  }
  const [formData, setFormData] = React.useState({ firstName: '', lastName: '', phone: '', email: '', password: '' });

  const register = function () {
    setErrors({firstName: false, lastName: false, email: false, password: false, phone: false });
    axios({
      method: constants.api.register.method,
      url: constants.api.register.url,
      data: formData
    })
      .then(() => {
        showNotification('s');
        setTimeout(() => {
          window.location = constants.pages.login.url;
        }, 1000)
      })
      .catch(error => {
        if (error && error.response && error.response.data && error.response.data.isJoi) {
          const temp = errors;
          temp[error.response.data.details[0].context.key] = true;
          setErrors({...temp})
          const [{ message: msg }] = error.response.data.details
          setCustomMsg(msg);
        }
        else if (error && error.response && error.response.data && error.response.data.errors) {
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
          <form noValidate autoComplete="off">
            <Card login="true" >
              <CardHeader className={classes.cardHeader} title="Create Account" color="rose" >
              </CardHeader>
              <CardContent>
                <FormControl fullWidth={true}>
                  <Input error={errors.firstName} onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }) }} placeholder="First Name" className={classes.inputPadding} id="firstName" endAdornment={<InputAdornment position="start"> <PersonIcon /> </InputAdornment>} />
                </FormControl>
                <FormControl fullWidth={true}>
                  <Input error={errors.lastName}  onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }) }} placeholder="Last Name" className={classes.inputPadding} id="lastName" endAdornment={<InputAdornment position="start"> <PersonIcon /> </InputAdornment>} />
                </FormControl>
                <FormControl fullWidth={true}>
                  <Input error={errors.email}  onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} placeholder="Email" className={classes.inputPadding} id="email" endAdornment={<InputAdornment position="start"> <Email /> </InputAdornment>} />
                </FormControl>
                <FormControl fullWidth={true}>
                  <Input error={errors.phone}  onChange={(e) => { setFormData({ ...formData, phone: e.target.value }) }} placeholder="Phone" className={classes.inputPadding} id="phone" endAdornment={<InputAdornment position="start"> <Phone /> </InputAdornment>} />
                </FormControl>
                <FormControl fullWidth={true}>
                  <Input error={errors.password}  onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} placeholder="Password" className={classes.inputPadding} id="password" endAdornment={<InputAdornment position="start"> <Lock /> </InputAdornment>} />
                </FormControl>
                <Box textAlign='center'>
                  <Button className={classes.buttonPadding} onClick={() => { register(); }} color="secondary">Register</Button>
                </Box>
                <Box textAlign='center'>
                  <Link href="/login" variant="body2"> {"Already have an account? Login"} </Link>
                </Box>
              </CardContent>
            </Card>
          </form>
        </Grid >
      </Grid>
      <Snackbar place='tr' color='success' icon={AddAlert} message={constants.notification.register.s} open={notify} closeNotification={() => setNotify(false)} close />
      <Snackbar place='tr' color='danger' icon={AddAlert} message={constants.notification.register.d} open={danger} closeNotification={() => setDanger(false)} close />
      <Snackbar place='tr' color='danger' icon={AddAlert} message={customMsg} open={customDanger} closeNotification={() => setCustomDanger(false)} close />
    </div>
  );
}