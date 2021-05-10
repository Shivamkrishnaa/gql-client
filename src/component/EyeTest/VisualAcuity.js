import converter from 'number-to-words';
import clsx from 'clsx';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: "100%",
  },
  control: {
    padding: theme.spacing(2),
  },
  show : {
    display:'block'
  },
  hide : {
    display:'none'
  }
}));
const Test = { 1:{ key: 'ArrowDown'}, 2:{ key: 'ArrowRight' }, 3:{ key: 'ArrowLeft' }, 4:{ key: 'ArrowDown' }, 5:{ key: 'ArrowUp'}, 6:{ key: 'ArrowRight'} }
export default function PaymentForm() {
  const [test] = React.useState(Test);
  const [result, setResult] = React.useState(false);
  const classes = useStyles();
  const [right, setRight] = React.useState(false);
  const [left, setLeft] = React.useState(false);
  const [down, setDown] = React.useState(true);
  const [, setUp] = React.useState(false);
  const [count, setCount] = React.useState(1);
  const [correct, setCorrect] = React.useState(0);
  const [size, setSize] = React.useState(100);
  document.onkeydown = function (e) {
    if (!result && test[count] && test[count].key == e.code ) {
      
      setCorrect(Number(correct) + 1);
    }
    if(count == Object.keys(test).length) {setResult(true);}
    if(count >= Object.keys(test).length ||!test[count].key == 'ArrowUp' ||!test[count].key == 'ArrowDown' ||!test[count].key == 'ArrowLeft' ||!test[count].key == 'ArrowDown' ) return;
    if(test[count].key == 'ArrowUp') setUp(false);
    if(test[count].key == 'ArrowDown') setDown(false);
    if(test[count].key == 'ArrowLeft') setLeft(false);
    if(test[count].key == 'ArrowRight') setRight(false);
    if(test[Number(count)+1] && test[Number(count)+1].key == 'ArrowUp') setUp(true);
    if(test[Number(count)+1] && test[Number(count)+1].key == 'ArrowDown') setDown(true);
    if(test[Number(count)+1] && test[Number(count)+1].key == 'ArrowLeft') setLeft(true);
    if(test[Number(count)+1] && test[Number(count)+1].key == 'ArrowRight') setRight(true);
    setCount((Number(count) + 1));
    setSize(size-10)
  };
  document.onkeydown.bind(this);
  return (
    <React.Fragment >
      <Typography variant="h6" gutterBottom>
        Visual acuity test
      </Typography>
      <div className="cont">
      <div id="test2" style={{ "fontSize": size+'%' }} className={(left ? 'left': (right? 'right': (down? 'down':"up")))}> 
          M
      </div>

      </div>

      <Grid container spacing={3}  alignContent="center">
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} >
        Question {converter.toWords(Number(count) )} of {converter.toWords(Object.keys(test).length)}
        </Grid>
        <Grid item xs={12} className={clsx(!result && classes.hide, result && classes.show)}>
        Your result:  {correct} of {Object.keys(test).length}
        <br/>
        </Grid>
        <Grid item xs={12}>
          
        </Grid>
      </Grid>
    </React.Fragment>
  );
}