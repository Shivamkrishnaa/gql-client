import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ContrastCheck from './ContrastCheck';
import VisualAcuity from './VisualAcuity';
import { constants } from '../../config/constant';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1, height: "100%",
    padding: theme.spacing(3),
    minHeight: "100vh",
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = constants.pages.eye.steps;

function getStepContent(step) {
  switch (step) {
    case 0:
      return <div >
        <Grid container spacing={0}>
          <Grid item xs={12}>
          <h1 id="timeleft">Introduction</h1>
            <Typography variant="overline" display="block" gutterBottom>
              Use your keyboard to select the arrow to indicate the direction of the open side of the “E”.
          </Typography>
          </Grid>
        </Grid></div>;
    case 1:
      return <ContrastCheck />;
    case 2:
      return <VisualAcuity />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    if (activeStep === 2) window.location.reload();
    else setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <main style={{ backgroundColor: "white", height: "100%" }} className={classes.content}>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Online Vision Screening
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for participating in the online vision screening check.
                </Typography>
                <Typography variant="subtitle1" >
                  Contrast Check : {localStorage.getItem('2-score') || 0}<br />
                  Visual acuity test: {localStorage.getItem('3-score') || 0}<br />
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {false && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    id="next"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Retake' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </main>
  );
}