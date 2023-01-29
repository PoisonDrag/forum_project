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
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Upload from '../images/upload'

const useStyles = makeStyles(theme => ({
  root: {
    width: "50vw",
    boxShadow: "10px 10px 8px rgba(0,0,0,0.5)",
    position:"relative",
    left:"25vw",
    top:"5vh",
    marginBottom:"5vh",
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
  },
  textArea:{
    width:"33vw",
    fontSize:"18px",
    borderRadius:"10px",
    letterSpacing:"0",
    fontFamily:"default",
     [theme.breakpoints.down('md')]: {
        width:"70%",
        padding:"0"
    },
     [theme.breakpoints.down('sm')]: {
        width:"80%",
        padding:"0"
    }
  },
  upload:{
    border:"1px dashed black",
    width:"70%",
    padding:"2vh 0vw 2vh 0vw",
    margin:"auto",
    borderRadius:"10px",
    marginTop:"2vh",
    [theme.breakpoints.down('md')]: {
        width:"80%",
        padding:"0"
    },
      [theme.breakpoints.down('sm')]: {
        width:"80%",
        padding:"0"
    }
  }
}));

export default function NewPost(props) {
  const classes = useStyles();
    const [title, setNPostTitle] = React.useState([])
    const [body, setNPostBody] = React.useState([])
    const [images, setImages] = React.useState([])
    const [submit, setSubmit] = React.useState(false)
    const [post, setPost] = React.useState(false)
    const [val, setVal] = React.useState(true)    
    const [allImgs, setAllImgs] = React.useState([])
  
    React.useEffect(()=>{if(props.allPost && props.allPost.length){ValidatorForm.addValidationRule("isPostNameUnique", value=>{
    return(props.allPost.every(({title}) => {return title.toLowerCase().trim() !== value.toLowerCase().trim()}))
  })}else{ValidatorForm.addValidationRule("isPostNameUnique", ()=>{
    return(true)
  })}} , [title])
  React.useEffect(()=>{ValidatorForm.addValidationRule("isPostShort", value=>{
    return(value.length<=30)
  })} , [props.threads])
  
  const handleSubmitPost = () => {
    // console.log("Images is ", images, "length is ", images.length)
    setSubmit(true)
    setVal(false)
    // props.setPostState("addedPost!");
    // formData.append("file","https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png")
    // formData.append("file","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg")
    // formData.append("file",images)
    // console.log("all length is ", allImgs.length, " images length is ", images.length)
    // if(images.length === allImgs.length){
    //   setSubmit(true)
    // }
  }
  // console.log(process.env.UPLOAD_PRESET)
      
  React.useEffect(()=>{
    if(submit){
      images.map(image=>{
        var formData = new FormData()
        formData.append("file",image)
        formData.append("upload_preset","wxx8tts3")
        formData.append('cloud_name', 'poison04')
        const config = {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        };
        axios.post("https://api.cloudinary.com/v1_1/poison04/image/upload", formData, config)
        .then(res=> {
          // console.log("Response is ", res)
        setAllImgs(allImgs => [...allImgs, {name : res.data.public_id, path:res.data.secure_url}]);
        // console.log("File data is ", allImgs, "length is ", allImgs.length, "SUBMIT IS ", submit) 
        });
      })
      // console.log("Re rendering, ",images.length === allImgs.length)
      if(allImgs.length === images.length){
        // console.log("In")
        setSubmit(false)
        setPost(true)
      }
    }
  },[{submit, allImgs}])
    
  React.useEffect(()=>{
    if(post){
        // console.log("All data is ", allImgs)   
          axios.post(`/${props.threadName}/getPosts`, {
            post:{title,body, isEdited:false, isDeleted:false}, 
            thread:props.thread,
            log:props.isLoggedIn,
            imgs:allImgs
          })
          .then(()=>props.setShow(true))
          .catch(e=>console.log(e)); 
          props.setPostState("Created ", title) 
          setAllImgs([])
          setPost(false)
          props.history.push(`/${props.threadName}/posts`)
    }
  }, [post])

  const handlePostTitle = (e) => {setNPostTitle(e.target.value)}
  const handlePostBody = (e) => {setNPostBody(e.target.value)}
  const handleCancel = () => {setVal(false); props.history.push(`/${props.threadName}/posts`)}

  return (
    <div className={classes.bg}>
    {props.isLoggedIn && 
    <Card className={classes.root}>
          <ValidatorForm onSubmit={handleSubmitPost} enctype = "multipart/form-data" >
      {/* <CardActionArea> */}
        <CardContent className= {classes.content}>
          <Typography gutterBottom variant="h4" component="h2" >
            New Post
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
                <div className={classes.inputBox}>
                <TextValidator value={title} label="Title of Post" onChange={handlePostTitle} validators={["required", "isPostNameUnique", "isPostShort"]} errorMessages={["This field is required", "Post title taken!", "Post too long!"]} className={classes.input}/>
                </div>
                <textarea className = {classes.textArea} rows = {10} onChange={handlePostBody} placeholder="Enter post" required/>
                {/* <textarea className = {classes.textArea} rows = {10} onChange={handlePostBody} placeholder="Enter post" required onInvalid={()=>setCustomValidity('Please Enter valid email')} onInput={setCustomValidity('')}/> */}
                <div className={classes.upload}>
                <Upload files={images} setFiles={setImages}/>
                </div>
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
      <CardActions className={classes.action}>
        {/* <Link to = {`/${props.threadName}/posts`}> */}
        <Button size="large" variant = "outlined" color="secondary" onClick = {handleCancel} disabled = {!val}>
          Cancel
        </Button>
        {/* </Link> */}
        <Button size="large" variant = "outlined" color="primary" type='submit' disabled = {!val}>
          Post
        </Button>
      </CardActions>
            </ValidatorForm>
        
    </Card>
    }
    {!props.isLoggedIn && props.history.push("/login")}
    </div>
  );
}
