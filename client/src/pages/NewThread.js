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
import {Dialogue} from '../common/dialog'

const useStyles = makeStyles(theme=> ({
  root: {
    width: "50vw",
    boxShadow: "10px 10px 8px rgba(0,0,0,0.5)",
    position:"relative",
    left:"25vw",
    top:"5vh",
    marginBottom:"15vh",
    padding:"5vh 0",
    [theme.breakpoints.down('md')]: {
      left:"15vw",
      width:"70vw",
      fontSize:"50px"
      // left:"100px"
    },
    [theme.breakpoints.down('sm')]: {
      left:"5vw",
      width:"90vw",
      padding:"25px 0px",
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
        fontSize:"5vw"
    },
      [theme.breakpoints.down('sm')]: {
        fontSize:"8vw"
    }
  },
  action:{
      justifyContent:"space-between",
      margin:"auto",
      padding:"2vh 5vw",
      "& a":{
          textDecoration:"none"
      },
      [theme.breakpoints.down('sm')]: {
      padding:"25px 20px",
    } 
  },
  input:{
      padding:"0",
      width:"25vw",
      marginBottom:"5vh",
      [theme.breakpoints.down('sm')]: {
      width:"45vw"
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
        width:"70%",
        padding:"0"
    },
      [theme.breakpoints.down('sm')]: {
        width:"80%",
        padding:"0"
    }
  }
}));

export default function NewThread(props) {
  const classes = useStyles();
    const [title, setNThreadName] = React.useState([])
    const [location, setNThreadLoc] = React.useState([])
    const [showDial, setShowDial] = React.useState(false)
    const [val, setVal] = React.useState(true)    

    // const [NThread, setNThread] = React.useState([])
  React.useEffect(()=>{if(props.threads.length){ValidatorForm.addValidationRule("isThreadNameUnique", value=>{
    return(props.threads.every(({title}) => title.toLowerCase().trim() !== value.toLowerCase().trim()))
  })}else{
    ValidatorForm.addValidationRule("isThreadNameUnique", value=>{return {}})
  }} , [props.threads])
  React.useEffect(()=>{ValidatorForm.addValidationRule("isThreadShort", value=>{
    return(value.length<=30)
  })} , [props.threads])

  const handleSubmitThread = async () => {
    console.log("trying");
    // Dialogue()
    setShowDial(true)
    setVal(false)
    // props.setNewThread({title, location});
    // props.history.push('/threads');
  }
  const handleThreadName = (e) => {setNThreadName(e.target.value)}
  const handleThreadLoc = (e) => {setNThreadLoc(e.target.value)}
  const handleCancel = () => {setVal(false); props.history.push('/threads')}
  
  return (
    <div className={classes.bg}>
    {props.isLoggedIn && 
    <Card className={classes.root}>
          <ValidatorForm onSubmit={handleSubmitThread} >
      {/* <CardActionArea> */}
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent className= {classes.content}>
          <Typography gutterBottom variant="h4" component="h2" className= {classes.content}>
            New Thread
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
                <div className={classes.inputBox}>
                <TextValidator value={title} label="Title of Thread" onChange={handleThreadName} validators={["required", "isThreadNameUnique", "isThreadShort"]} errorMessages={["This field is required!","Thread name taken!", "Title is too long!"]} className={classes.input}/>
                </div>
                <div className={classes.inputBox}>
                <TextValidator value={location} label = "Location" onChange={handleThreadLoc} validators={["required"]} errorMessages={["This field is required"]} className={classes.input}/>  
                </div>
                {/* <div className={classes.inputBox}>
                <TextValidator value={NThread} label = "Field of Study/Work" onChange={handleThread} validators={["required", "isThreadNameUnique"]} errorMessages={["This field is required","Thread name taken!"]} className={classes.input}/>  
                </div> */}
                {/* <Button variant='outline' style={{backgroundColor:currentColor}} type='submit'>Add Colour</Button> */}
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
      <CardActions className={classes.action}>
        {/* <Link to = {"/threads"}> */}
        <Button size="large" variant = "outlined" color="secondary" onClick = {handleCancel} disabled={!val}>
          Cancel
        </Button>
        {/* </Link> */}
        <Button size="large" variant = "outlined" color="primary" type='submit' disabled={!val}>
            Submit
        </Button>
      </CardActions>
            </ValidatorForm>
        {showDial && <Dialogue submitAction = {props.setNewThread} action = {"Create"} name = {title} value= {{title,location}} history={ props.history} setShowDial={setShowDial}/>}
    </Card>
    }
    {!props.isLoggedIn && props.history.push("/login")}
    </div>
  );
}
