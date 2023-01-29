import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    bg:{
    height:"90vh",
    width:"100%",
    position:"relative",
    backgroundColor:"rgba(0,0,0,0.1)",
    overflowY:"auto",
    background:"cover"
  },
backLink:{
  position:"fixed",
  left:"5vw",
  top:"10vh",
  border:"1px solid (255,255,255,0.5)",
  width:"4vw",
  height:"4vw",
  borderRadius:"4vw",
  backgroundColor:"(255,255,255,0.5)",
  boxShadow: "5px 5px 8px rgba(0,0,0,0.5)",
  textAlign:"Center",
  textDecoration:"none",
  fontSize:"2.5vw",
  color:"skyblue",
  "& :hover":{
      width:"4vw",
      fontSize:"2.5vw",
      borderRadius:"4vw",
      height:"4vw",
      backgroundColor:"white",
      border:"1px solid white"
  }
},
content:{
    position:"relative",
    // height:"80%",
    overflowY:"auto",
    width:"70vw",
    maxWidth:"70vw",
    left:"12.5vw",
    top:"5vh",
    backgroundColor:"white",
    background:"cover",
    textAlign:"justify",
    padding:"5vh 5vw 5vh 5vw",
    marginBottom:"5vh",
    "& h3":{
        textAlign:"center"
    }
},
content2:{
    position:"relative",
    height:"80%",
    overflowY:"auto",
    left:"12.5vw",
    width:"70vw",
    top:"5vh",
    backgroundColor:"white",
    background:"cover",
    textAlign:"justify",
    padding:"5vh 5vw 0 5vw",
    "& h3":{
        textAlign:"center"
    },
},
    comArea:{
        width:"50vw",
        fontFamily:"default",
        fontSize:"17px",
        height:"40px"
    },
    allCom:{
        border:"1px solid black"
    },
    comList:{
        padding:"5px"
    }
})
export default function IndivPost(props) {
    const classes = useStyles();
    const {threadName, comments,setCommentData} = props;
    // console.log(props)
    const [com, setCom] = React.useState("")
    // post = JSON.parse(post)
    const handleCom = (e) =>{
        setCom(e.target.value)
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log("Set the data")
        setCommentData({body:com, author:"ABCD"})
        setCom("")
        props.handleAddCom(props.match)
    }
    // console.log(post.comments)
    // const postName = props.match.params.postName;
    const checkCom = () =>{if(comments && comments.length){
        return <div className={classes.allCom}>{comments.map(com=><div className={classes.comList}>{com}</div>)}</div>
        }else{return "No discussions yet, start one by commenting now!"}}
    return (
        <div className = {classes.bg}>
            <div className = {classes.content}>
                <Typography gutterBottom variant="h3">
                    Discussions
                </Typography>
                <Typography gutterBottom variant="body1">
                    {checkCom()}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="Comment..." className={classes.comArea} onChange={handleCom} value = {com} required></textarea>
                    <button type="submit" variant="outlined" color="primary">Post comment</button>
                </form>
            </div>
        </div>
    )
}
