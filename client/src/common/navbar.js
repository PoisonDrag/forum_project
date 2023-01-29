import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import Timeout from '../utils/timeout'
// import styles from '../Styles/navStyles'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
      display: 'block',
      zIndex:100
    // },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 8,
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  links:{
    color:"white",
    display:"block",
    textDecoration:"none",
    "& :hover":{
      // transform:"translateY(1.5px)",
      borderBottom:"3px solid white"
    }
  },
  disableLink:{
    color:"white",
    fontSize:"20px",
    fontWeight:"bolder",
    display:"block",
    textDecoration:"none",
    pointerEvents:"none",
    // borderBottom:"3px solid white"
  },
  searchBox:{
    position:"absolute",
    top:"10vh",
    right:"5vw",
    // height:"10vh",
    // width:"15vw",
    padding:"2vh 2vw",
    maxWidth:"15vw",
    backgroundColor:"skyblue",
    color:"black",
    wordWrap:"break-word",
    "& button":{
      background:"none"
    }
  }
}));

function Navbar(props) {
  const {page} = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [val, setVal] = React.useState(true)
  const handleSearch =(e) =>{
    props.setSearch(e.currentTarget.value)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(()=>{
    props.setSearch("")
    handleMobileMenuClose()
  },[page])
  
  const menuId = 'primary-search-account-menu';
  // const renderMenu = (
  //   <Menu
  //   anchorEl={anchorEl}
  //   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //   id={menuId}
  //   keepMounted
  //   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //   open={isMenuOpen}
  //   onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );
  
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
    >
      <div style = {{backgroundColor:"#3f51b5", padding:0, margin:0, width:"100vw"}}>
      {val && (<>
      {page !== 'threads' && <Link to ="/threads" className={classes.links} onClick={()=>{Timeout(setVal)}}>
      <MenuItem >Threads</MenuItem>
      </Link>}
      {page === 'threads' && <Link to ="/threads" className={classes.disableLink} onClick={()=>{console.log("trying to disable ", page)}}>
      <MenuItem>Threads</MenuItem>
      </Link>}

      {!props.isLoggedIn && page !== 'login' && <Link to = "/login" className={classes.links} onClick={()=>{Timeout(setVal)}}>
        <MenuItem>Login</MenuItem> 
        </Link>}
      {!props.isLoggedIn && page === 'login' && <Link to = "/login" className={classes.disableLink}>
        <MenuItem>Login</MenuItem> 
        </Link>}
      
      {!props.isLoggedIn && page !== 'register' && <Link to ="/register" className={classes.links}  onClick={()=>{Timeout(setVal)}}>
        <MenuItem>Register</MenuItem>
        </Link>}
      {!props.isLoggedIn && page === 'register' && <Link to ="/register" className={classes.disableLink}>
        <MenuItem>Register</MenuItem>
        </Link>}

      {props.isLoggedIn && <div className = {classes.links}><MenuItem>{props.isLoggedIn.username}</MenuItem></div>}
      
      {props.isLoggedIn &&<Link to ="/logout" className={classes.links} onClick={()=>{Timeout(setVal)}}>
        <MenuItem> Logout</MenuItem> 
        </Link>}
      </>
      )}
      {!val && (<>
      {<Link to ="/threads" className={classes.disableLink}>
      <MenuItem>Threads</MenuItem>
      </Link>}

      {!props.isLoggedIn && <Link to = "/login" className={classes.disableLink}>
        <MenuItem>Login</MenuItem> 
        </Link>}

      {!props.isLoggedIn && <Link to ="/register" className={classes.disableLink}>
        <MenuItem>Register</MenuItem>
        </Link>}

      {props.isLoggedIn && <div className = {classes.links}>{props.isLoggedIn.username}</div>}
      
      {props.isLoggedIn &&<Link to ="/logout" className={classes.disableLink}>
        <MenuItem> Logout</MenuItem> 
        </Link>}
      </>
      )}

      </div> 
      {/* <MenuItem >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );
  
  return (
    <div className={classes.grow}>
      <AppBar style={{position:"sticky", top:"0"}}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            >
            <MenuIcon />
          </IconButton> */}
          {val && (<>
          <Typography className={classes.title} variant="h6" noWrap>
            {page !== 'home' && <Link to ="/"  className={classes.links}  onClick={()=>{Timeout(setVal)}} >Project</Link> }
            {page === 'home' && <Link to ="/" className={classes.disableLink} >Project</Link> }
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value = {props.search}
              onChange = {handleSearch}
              disabled = {['home','register','login','newThread','newPost','editPost'].includes(page)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {page !== 'threads' && <Link to = "/threads" className={classes.links}  onClick={()=>{Timeout(setVal)}}>
              <MenuItem>Threads</MenuItem>
            </Link>}
            {page === 'threads' && <Link to = "/threads" className={classes.disableLink} >
              <MenuItem>Threads</MenuItem>
            </Link>}
            
            {!props.isLoggedIn && page !== 'login' &&
            <Link to = "/login" className={classes.links} onClick={()=>{Timeout(setVal)}} >
            <MenuItem>Login</MenuItem> </Link>}
            {!props.isLoggedIn && page === 'login' &&
            <Link to = "/login" className={classes.disableLink} >
            <MenuItem>Login</MenuItem> </Link>}
            
            {!props.isLoggedIn && page !== 'register' && <Link to ="/register" className={classes.links} onClick={()=>{Timeout(setVal)}}>
            <MenuItem>Register</MenuItem>
              </Link>}
            {!props.isLoggedIn && page === 'register' && <Link to ="/register" className={classes.disableLink}>
            <MenuItem>Register</MenuItem>
              </Link>}

            {/* {console.log(props.isLoggedIn)} */}
            {props.isLoggedIn && <div className = {classes.links} onClick={()=>{Timeout(setVal)}}>
              <MenuItem>
            {props.isLoggedIn.username}
            </MenuItem></div>}
            {props.isLoggedIn && 
            <Link to ="/logout" className={classes.links} onClick={()=>{Timeout(setVal)}}><MenuItem>Logout</MenuItem></Link>
            }
            
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          </>
          )}
          {!val && (<>
          <Typography className={classes.title} variant="h6" noWrap>
            {<Link to ="/" className={classes.disableLink} >Project</Link> }
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value = {props.search}
              onChange = {handleSearch}
              disabled = {['home','register','login','newThread','newPost','editPost'].includes(page)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {<Link to = "/threads" className={classes.disableLink} >
              <MenuItem>Threads</MenuItem>
            </Link>}
            {!props.isLoggedIn &&
            <Link to = "/login" className={classes.disableLink} >
            <MenuItem>Login</MenuItem> </Link>}
            
            {!props.isLoggedIn && <Link to ="/register" className={classes.disableLink}>
            <MenuItem>Register</MenuItem>
              </Link>}

            {/* {console.log(props.isLoggedIn)} */}
            {props.isLoggedIn && <div className = {classes.links}>
              <MenuItem>
            {props.isLoggedIn.username}
            </MenuItem></div>}
            {props.isLoggedIn && 
            <Link to ="/logout" className={classes.disableLink}><MenuItem>Logout</MenuItem></Link>
            }
            
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          </>
          )}
          {/* {!props.search.trim().length && <div></div>} */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </div>
  );
}

export default (Navbar);  
// export default withStyles(styles)(Navbar);