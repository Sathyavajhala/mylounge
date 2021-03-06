import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import myLogo from "../../User/myLogo.png"
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from '../MenuItems';
import absyz from '../../../Utils/images/absyz.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { HashRouter, Route, Switch ,useHistory,Redirect} from "react-router-dom";
import AllUsers from "../User"
import QuestionExcel from "../QuestionExcel";
import Dashboard from "../Dashboard";
import SignIn from "../Login/index"
import store from "../../../Store/store";
// import store from "../../../../../"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
}));

export default function Layout() {
  const classes = useStyles();
  const history=useHistory();
  const [logout,setLogout]=useState(false);
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const logsout=()=>{
setLogout(true)
  }

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="absolute"style={{backgroundColor:'#fff'}} className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="#283741"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography  style={{alignSelf:'center',color:'black',fontFamily:'Source Sans Pro',fontWeight:'500',fontSize:25}} component="h1" variant="h6" noWrap className={classes.title}>
          Admin 
          </Typography>
          
          <IconButton 
            color="#283741"
          onClick={logsout}
          >
            {logout ? 
                  <Redirect
          to={{
            pathname: "/admin/login",
            state: { isLoggedIn:false }
          }}
        /> : null
}

                 <LogoutIcon 
            
            />
            {/* </Link> */}
            {/* <Route exact path='/admin/login' component={SignIn} >
       
            </Route> */}
        
            {/* </Badge> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        style={{backgroundColor:'#1D7B84'}}
      >
        <div style={{ backgroundColor: '#1D7B84', height: '100%', }}  >
        <div className={classes.toolbarIcon} style={{backgroundColor:'#283741'}}>
        <img src={myLogo} alt="Absyz.logo" width="100" height="50" />
          <IconButton onClick={handleDrawerClose}
          // color='white'
          
          >
              
            <ChevronLeftIcon style={{color:'white'}} />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        {/* <Divider />
        <List>{secondaryListItems}</List> */}
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <Route path="/admin/login" exact={true} component={SignIn} /> */}
        <Route path="/admin" exact={true} component={AllUsers} />
        <Route path="/admin/addQuestionsExcel" exact={true} component={QuestionExcel} />
        
        
      </main>
    </div>
  );
}
// document.body.style = 'background: #F6F8FA';
