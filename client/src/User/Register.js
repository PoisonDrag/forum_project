import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import {toast} from "react-toastify";
import Timeout from '../utils/timeout'
const useStyles = makeStyles(theme => ({
  root: {
    width: "50vw",
    boxShadow: "10px 10px 8px rgba(0,0,0,0.5)",
    position:"relative",
    margin:"auto",
    top:"5vh",
    marginBottom:"10vh",
    padding:"5vh 0",
    [theme.breakpoints.down('md')]: {
      width:"70vw",
      fontSize:"50px"
      // left:"100px"
    },
    [theme.breakpoints.down('sm')]: {
      width:"90vw",
      padding:"5vh 0px",
      fontSize:"40px"
    }

},
media: {
    height: 140,
},
bg:{
    height:"90vh",
    width:"100%",
    position:"relative",
    backgroundColor:"rgba(0,0,0,0.1)",
    overflowY:"auto",
    backgroundSize:"cover",
    background:"no-repeat center fixed",
  }, 
  content:{
    textAlign:"center",
    fontFamily:"Roboto",
    letterSpacing:"1px",
    color:"rgb(0,0,0,0.8)",
    fontSize:"4vw",
    [theme.breakpoints.down('md')]: {
      fontSize:"50px"
      // left:"100px"
    },
    [theme.breakpoints.down('sm')]: {
      // padding:"10px 15px",
      fontSize:"40px"
    }
  },
  action:{
      justifyContent:"space-between",
      margin:"auto",
      padding:"0vh 5vw",
      "& a":{
          textDecoration:"none"
      }
  },
  input:{
      padding:"0",
      width:"25vw",
      marginBottom:"3vh",
      [theme.breakpoints.down('md')]: {
      // left:"100px"
            width:"40vw",
            marginBottom:"25px"
      },
      [theme.breakpoints.down('sm')]: {
      padding:"0px 0px",
      width:"60vw",
      // margin:"auto",
      marginBottom:"5px"
      }
    },
    inputBox:{
        marginBottom:"5vh",
        border:"1px solid rgb(0,0,0,0.4)",
        borderRadius:"10px",
        padding:"3.5vh 2.5vw 3.5vh 2.5vw",
        margin:"auto",
        width:"60%",
      [theme.breakpoints.down('md')]: {
      // left:"100px"
            width:"70%"
      },
      [theme.breakpoints.down('sm')]: {
      padding:"15px 30px",
      width:"80%",
      // marginBottom:"20px"
      }
  },
  // visible:{
  //   position:"relative",
  //   top:"-8vh",
  //   left:"13vw",
  //   outline:"none",
  //   border:"none",
  //   backgroundColor:"rgb(0,0,0,0)",
  //   [theme.breakpoints.down('md')]: {
  //     // fontSize:"50px"
  //     top:"-60px",
  //     left:"20vw"
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     // padding:"10px 15px",
  //     top:"-40px",
  //     left:"25vw"
  //   }
  // }
  visible:{
    position:"absolute",
    padding:0,
    margin:0,
    cursor:"pointer",
    marginTop:"20px",
    marginLeft:"10vw",
    zIndex:10,
    outline:"none",
    border:"none",
    backgroundColor:"rgb(0,0,0,0)",
    [theme.breakpoints.down('md')]: {
      marginTop:"20px",
      marginLeft:"37vw",
      // fontSize:"50px"
      left:"15vw"
    },
    [theme.breakpoints.down('sm')]: {
      marginTop:"20px",
      marginLeft:"40vw",
      // padding:"10px 15px",
      left:"25vw"
    }
  }
}));

export default function NewUser(props) {
  const [users,setUsers] = React.useState([])
  const [NUser,setNUser] = React.useState([])
  const [NPass,setNPass] = React.useState([])
  const [CPass,setCPass] = React.useState([])
  const [showNPass,setShowNPass] = React.useState(false)
  const [showCPass,setShowCPass] = React.useState(false)
  const [log, setLog] = React.useState(true)
  const classes = useStyles();
  const [val, setVal] = React.useState(true)

  const handleSubmitAuth = (e) => {
    e.preventDefault();
    // console.log("trying to post")
    Timeout(setVal); 
    if(CPass === NPass){
      axios.post('/getRegister', {username: NUser,password: NPass})
          .then(res => {
            toast.success(`Welcome, ${NUser}!`, {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:2})
            props.setIsLoggedIn(res.data.loggedInUser)})
          .catch(err => console.log(err));
        }
    else{
      setCPass([])
      toast.error('Passwords do not match!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:3})
    }
  }
  if(props.isLoggedIn && log){
    // props.setIsLoggedIn(false)
    if(!NUser.length && !NPass.length){
      console.log("In flash")
      toast.error(`Already logged in as ${props.isLoggedIn.username}!`, {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, id:2})
    }
    setLog(false)
    // console.log("New user is ", NUser, NPass)
    props.history.goBack();
  }
  const handleUser = (e) => {setNUser(e.target.value)}
  const handleNPass = (e) => {setNPass(e.target.value)}
  const handleCPass = (e) => {setCPass(e.target.value)}
  const handleCancel = () => {Timeout(setVal); props.history.push('/threads')}
  
  React.useEffect(()=>{
    let cancel;
    axios({
      method:"GET",
      url:"/getRegister",
      cancelToken: new axios.CancelToken(c=> cancel = c)
    })
    .then(res => {
      setUsers([...res.data.users])})
    .catch(e => {if(axios.isCancel(e)) return})
    return ()=> cancel()
  }, [props.isLoggedIn])
  
  // console.log(users);
  React.useEffect(()=>{if(users && users.length){ValidatorForm.addValidationRule("isUsernameUnique", value=>{
    return(users.every(({username}) => {return username.toLowerCase() !== value.toLowerCase().trim()}))
  })}else{ValidatorForm.addValidationRule("isUsernameUnique", ()=>{
    return(true)
  })}} , [NUser])
  
  return (
    <div className={classes.bg}>
    <Card className={classes.root}>
    {/* <Flash actionName = "Confirm" name = "Pass"/> */}
    <ValidatorForm onSubmit={handleSubmitAuth} >
      <CardContent className= {classes.content}>
          <Typography gutterBottom variant="h4" component="h2" className= {classes.content}>
            Register
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
                <div className={classes.inputBox}>
                <TextValidator value={NUser} label="Enter name" onChange={handleUser} validators={["required", "isUsernameUnique"]} errorMessages={["This field is required", "Username already taken!"]} className={classes.input}/>
                </div>
                <div className={classes.inputBox}>
                <button type = "button" onClick = {()=> setShowNPass(!showNPass)} className = {classes.visible}>{!showNPass ? <VisibilityOutlinedIcon />: <VisibilityOffOutlinedIcon /> }</button>
                <TextValidator value={NPass} label = "Password" type={`${showNPass?"text":"password"}`}  onChange={handleNPass} validators={["required"]} errorMessages={["This field is required"]} className={classes.input}/> 
                </div>
                <div className={classes.inputBox}>
                <button type = "button" onClick = {() => setShowCPass(!showCPass)} className = {classes.visible}>{!showCPass ? <VisibilityOutlinedIcon />: <VisibilityOffOutlinedIcon /> }</button>
                <TextValidator value={CPass} label = "Confirm password" type={`${showCPass?"text":"password"}`} onChange={handleCPass} validators={["required"]} errorMessages={["This field is required"]} className={classes.input}/>
                </div>
                {/* <Button variant='outline' style={{backgroundColor:currentColor}} type='submit'>Add Colour</Button> */}
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
      <CardActions className={classes.action}>
        {/* <Link to = {`/threads`}> */}
        <Button size="large" variant = "outlined" color="secondary" onClick = {(e)=>{handleCancel(e)}} disabled={!val}>
          Cancel
        </Button>
        {/* </Link> */}
        <Button size="large" variant = "outlined" color="primary" type = "submit" disabled={!val}>
            Submit
        </Button>
      </CardActions>
    </ValidatorForm>
    </Card>
    </div>
  );
}
