import React, { useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';

import MovieIcon from '@material-ui/icons/Movie';
import AddAlert from "@material-ui/icons/AddAlert";
import SearchIcon from '@material-ui/icons/Search';

import Snackbar from '../Notification/Snackbar';
import { queries } from '../../config/gqlQueries';
import { constants } from '../../config/constant';

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
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1, height: "100%",
    padding: theme.spacing(3),
    minHeight: "100vh",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  modalContent: {
    position: 'relative',
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
    'pointer-events': 'auto',
    'border': '0 solid rgba(0,0,0,.2)',
    'border-radius': '.4375rem',
    outline: 0,
    height: '300px',
    'background-color': '#fff',
    'background-clip': 'padding-box',
    marginTop: "10px"
  },
  modalpaper: { margin: "auto" }
}));
const Movie = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [notify, setNotify] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [info, setInfo] = React.useState(false);

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
    }
  }


  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const [formState, setFormState] = React.useState({ name: '', description: '', actorInfo: '' });
  const [loadState, setLoadState] = React.useState({ limit: 3, page: 1, filter: '' });


  const [createMovie] = useMutation(queries.createMovies, {
    variables: { name: formState.name, description: formState.description, actorInfo: formState.actorInfo },
    onCompleted: () => { refetch(); showNotification('s'); handleClose(); }
  });
  const [updateRating] = useMutation(queries.updateMovies, { onCompleted: () => { } });
  const updateRate = function (id, val) { updateRating({ variables: { movieId: Number(id), rating: Number(val) } }) };
  const didMount = useRef(false);

  const { loading, error, data, refetch, subscribeToMore } = useQuery(queries.fetchMovie, { variables: loadState });
  if (error) showNotification('d');
  React.useEffect(() => {
    subscribeToMore({
      document: queries.subscriptionMovie,
      updateQuery: () => {
        if (didMount.current) showNotification('i');
        else didMount.current = true;
        refetch();
      }
    });
  }, [])
  React.useEffect(() => { refetch(); }, [loadState])
  return (
    <main style={{ backgroundColor: "white", height: "100%" }} className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Marvel Movies
            </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
            }}>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput, }} inputProps={{ 'aria-label': 'search' }} onChange={(e) => setLoadState({ ...loadState, filter: e.target.value })} />
            </form>
          </div>
          {/* </Typography> */}
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                  Add
                  </Button>

                <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={classes.modal} open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
                  <Fade in={open}>
                    <div className={classes.modalpaper}>
                      <Container component="main" maxWidth="xs" className={classes.modalContent}>
                        <CssBaseline />
                        <div className={classes.modalpaper}>
                          <Avatar className={classes.avatar}>
                            <MovieIcon />
                          </Avatar>
                          <Typography component="h1" variant="h5">
                            Create Movie
                          </Typography>

                          <form className={classes.form} noValidate onSubmit={(e) => {
                            e.preventDefault();
                          }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} >
                                <TextField autoComplete="fname" name="Title" variant="filled" required fullWidth id="title" label="Title" autoFocus onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
                              </Grid>
                              <Grid item xs={12} >
                                <TextField variant="filled" required fullWidth id="description" label="Description" name="description" autoComplete="description" onChange={(e) => setFormState({ ...formState, description: e.target.value })} />
                              </Grid>
                              <Grid item xs={12} >
                                <TextField variant="filled" required fullWidth id="actorInfo" label="Actor Info" name="actorInfo" autoComplete="actorInfo" onChange={(e) => setFormState({ ...formState, actorInfo: e.target.value })} />
                              </Grid>
                            </Grid>
                            <br />

                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={() => { createMovie(); }} >
                              Add Movie
                            </Button>
                          </form>
                        </div>
                      </Container>
                    </div>
                  </Fade>
                </Modal>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {data && (data.movie.movie.map(({ id, name, description, actorInfo, rating }) => (
            <Grid item key={name + id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Image title" />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {name}
                  </Typography>
                  <Typography>
                    Description : {description}
                  </Typography>
                  <Typography>
                    {JSON.stringify(rating)} Actor Info: {actorInfo}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Rating id={`myid-${id}`} className={`rate.rating${rating}`} readOnly={false} key={`lalal=${id}`} name={`lalal${id}`} onChange={(e, val) => { updateRate(Number(e.target.parentElement.id.replace('myid-', '')), val) }} defaultValue={((rating && rating.rating) ? rating.rating : 0)} size="large" />
                </CardActions>
              </Card>
            </Grid>
          )))}
        </Grid>
      </Container>
      {loading ? (

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>{Array.from(new Array(3)).map((r, i) => (
            <Grid item key={'skeleton' + i} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <Skeleton variant="rect" width="100%" height={118} />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Skeleton width="40%" />
                  </Typography>
                  <Typography>
                    <Skeleton width="70%" />
                  </Typography>
                  <Typography>
                    <Skeleton width="60%" />
                  </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </Grid>))}   </Grid>
        </Container>
      ) :
        <Grid container justify="center">
          <Pagination page={(data && data.movie) ? data.movie.page : 1} count={(data && data.movie) ? data.movie.totalPages : 0} onChange={(e, p) => { setLoadState({ ...formState, page: p }) }} />
        </Grid>}
      <Snackbar place='tr' color='success' icon={AddAlert} message={constants.notification.movie.s} open={notify} closeNotification={() => setNotify(false)} close />
      <Snackbar place='tr' color='info' icon={AddAlert} message={constants.notification.movie.i} open={info} closeNotification={() => setInfo(false)} close />
      <Snackbar place='tr' color='danger' icon={AddAlert} message={constants.notification.movie.d} open={danger} closeNotification={() => setDanger(false)} close />
    </main>
  );
}
export default Movie;