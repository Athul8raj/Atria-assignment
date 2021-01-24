import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles,fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from './Chart';
import Query from './QueryData';
import TableData from './TableData';
import FormData from './Form'
import Layout from '../../Layout'
import axios from 'axios'
import { get_sensors,query_data } from '../../Services'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Sensor Data
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    textAlign:'left'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [reading,setReading] = useState('')
  const [post_type,setPostType] = useState('')
  const [query_type,setQueryType] = useState('')
  const [timestamp,setTimestamp] = useState('')
  const [sensorTypes,setSensorTypes]= useState([])
  const [from,setFrom] = useState(Date.now())
  const [to,setTo] = useState(Date.now())
  const [notify,setNotify] = useState(false)
  const [sensor,setSensor] = useState('Temparature')
  const [details,setDetails] = useState([])
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(false);
  const [stats,setStats] = useState([])
  const [close,setClose] = useState(false)
  

  const handleReading = (event) => {
      setReading(event.target.value)
  }

  const handlePostType = (event) => {
    setPostType(event.target.value)
  }

  const handleQueryType = (event) => {
    setQueryType(event.target.value)
    setClose(false)
  }

  const handleTimestamp = (event) => {
      setTimestamp(event.target.value)
  }

  const handleFrom = (event) => {
    setFrom(event.target.value)
    setClose(false)
  }

  const handleTo = (event) => {
    setTo(event.target.value)
    setClose(false)
  }

  const handleSensor = (type) => {
    setSensor(type)
  }

  useEffect(() => {
    const signal = axios.CancelToken.source();
    const handleSensors = async () => {
      const resp = await get_sensors(signal.token)
      if (resp) {
        const sensor_types = []
        resp.data.forEach(element => {
          sensor_types.push(element.sensor_type)
          
        });
        setSensorTypes(sensor_types)
      }
    }
    handleSensors()
  },[])

  const handleNotify = () => {
    setNotify(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotify(false);
  };

  const handleDetails = (detail_list) => {
    setDetails(detail_list)
  }

  useEffect(() => {
    const signal = axios.CancelToken.source();
    const handleTempData = async () => {
    const resp = await query_data('Temperature',1,1,signal.token)
    if (resp) {
      console.log(resp.data)
      handleDetails(resp.data['details'])
            }
      }
    handleTempData()
  },[])

  const handleDialogClose = () => {
    setOpen(false);
    setClose(true)
  };

  const handleQuery = () => {
    setQuery(true)
    setOpen(true);
  }

  const handleStats = (stats_list) => {
    setStats(stats_list)
  }
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Layout></Layout>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <FormData 
                reading={reading} 
                type={post_type} 
                timestamp={timestamp}
                handleReading= {handleReading} 
                handleType= {handlePostType} 
                handleTimestamp = {handleTimestamp}
                sensors={sensorTypes}
                handleNotify={handleNotify}
                 />
              </Paper>
              <Snackbar open={notify} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{ vertical: 'top',
                  horizontal: 'right', }}>
              <Alert onClose={handleClose} severity="success">
                Data has been saved successfully!
              </Alert>
            </Snackbar>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Paper className={fixedHeightPaper}>
                <Query 
                from={from}
                to={to}
                type={query_type}
                sensors={sensorTypes}
                handleFrom={handleFrom}
                handleTo={handleTo}
                handleType= {handleQueryType}
                handleSensor={handleSensor}
                handleDetails={handleDetails}
                handleQuery={handleQuery}
                handleStats={handleStats}
                close={close}
                stats={stats}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} >
              <Paper className={fixedHeightPaper}>
                <Chart 
                sensor={sensor}
                details={details}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TableData 
                sensor={sensor}
                details={details}
                />
              </Paper>
            </Grid>
          </Grid>
          {query && <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Readings Statistics for {sensor}</DialogTitle>
        <DialogContent>
          <Typography>&#9679; Min - {stats[0]}</Typography>
          <Typography>&#9679; Max - {stats[1]}</Typography>
          <Typography>&#9679; Mean - {stats[2]}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}