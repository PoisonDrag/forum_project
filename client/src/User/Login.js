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
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import {toast} from "react-toastify";
import Timeout from '../utils/timeout';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "40vw",
    boxShadow: "10px 10px 8px rgba(0,0,0,0.5)",
    position:"relative",
    // left:"30vw",
    margin:"auto",
    top:"5vh",
    marginBottom:"5vh",
    padding:"5vh 0",
    [theme.breakpoints.down('md')]: {
      width:"60vw",
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
      padding:"10px 15px",
      fontSize:"40px"
    }
  },
  action:{
      justifyContent:"space-between",
      margin:"auto",
      padding:"2vh 5vw",
      "& a":{
          textDecoration:"none"
      }
  },
  input:{
      padding:"0",
      width:"20vw",
      marginBottom:"5vh",
      [theme.breakpoints.down('md')]: {
      // left:"100px"
            width:"30vw"
      },
      [theme.breakpoints.down('sm')]: {
      padding:"0px 0px",

      width:"60vw",
      marginBottom:"20px"
      }
    },
    inputBox:{
        marginBottom:"5vh",
        border:"1px solid rgb(0,0,0,0.4)",
        borderRadius:"10px",
        padding:"3.5vh 2.5vw 0vh 2.5vw",
        margin:"auto",
        width:"60%",
        [theme.breakpoints.down('md')]: {
      // left:"100px"
            width:"70%"
      },
      [theme.breakpoints.down('sm')]: {
      padding:"10px 30px",
      width:"75%",
      // marginBottom:"0px"
      }
  },
  visible:{
    position:"absolute",
    padding:0,
    margin:0,
    cursor:"pointer",
    marginTop:"20px",
    marginLeft:"8vw",
    zIndex:10,
    outline:"none",
    border:"none",
    backgroundColor:"rgb(0,0,0,0)",
    [theme.breakpoints.down('md')]: {
      marginTop:"20px",
      marginLeft:"25vw",
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

export default function NewPost(props) {
  const [user,setUser] = React.useState("")
  const [pass,setPass] = React.useState("")
  const [showPass,setShowPass] = React.useState(false)
  const [log, setLog] = React.useState(true)
  const [val, setVal] = React.useState(true)

  const classes = useStyles();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    // console.log("trying to post")
        Timeout(setVal); 

    props.setIsLoggedIn(false)
    await axios.post('/getLogin', {username: user,password: pass})
        .then (res => {
          if(res.data.loggedInUser){
            toast.success(`Welcome back, ${user}!`, {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
            props.setIsLoggedIn(res.data.loggedInUser)
          }else{
            setPass(""); toast.error('Incorrect Username or Password!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
          }
        
        })
        .catch(err => {console.log(err)});

    // console.log(props.isLoggedIn)
  }
  if(props.isLoggedIn && log){
    // props.setIsLoggedIn(false)
    setLog(false)
    props.history.goBack();
    // <Redirect to = '/threads'/>
  }
  // else{console.log("Fail")}
  const handleUser = (e) => {setUser(e.target.value)}
  const handlePass = (e) => {setPass(e.target.value)}
  // const handlePost = (e) => {setNPost(e.target.value)}
  const handleCancel = () => {Timeout(setVal); props.history.goBack()}

  return (
    <div className={classes.bg}>
    <Card className={classes.root}>
    <ValidatorForm onSubmit={handleSubmitLogin} >
      <CardContent className= {classes.content}>
          <Typography gutterBottom variant="h4" component="h2" className= {classes.content}>
            Login
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
                <div className={classes.inputBox}>
                <TextValidator value={user} label="Username" onChange={handleUser} validators={["required"]} errorMessages={["This field is required"]} className={classes.input}/>
                </div>
                <div className={classes.inputBox}>
                <button type = "button" onClick = {() => setShowPass(!showPass)} className = {classes.visible}>{!showPass ? <VisibilityOutlinedIcon />: <VisibilityOffOutlinedIcon /> }</button>
                <TextValidator value={pass} label = "Password" type={`${showPass?"text":"password"}`} onChange={handlePass} validators={["required"]} errorMessages={["This field is required"]} className={classes.input}/>  
                </div>
                {/* <Button variant='outline' style={{backgroundColor:currentColor}} type='submit'>Add Colour</Button> */}
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
      <CardActions className={classes.action}>
        {/* <Link to = {`/threads`}> */}
        <Button size="large" variant = "outlined" color="secondary" onClick = {handleCancel} disabled={!val}>
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
