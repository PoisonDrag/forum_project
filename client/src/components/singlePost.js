import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EditPost from './editPost'
import axios from 'axios'
import {Dialogue} from '../common/dialog'
import Timeout from '../utils/timeout'

const useStyles = makeStyles(theme => ({
  root: {
    width: "70vw",
    boxShadow: "20px 20px 10px rgba(0,0,0,0.6)",
    position:"relative",
    // left:"15vw",
    height:"25vh",
    borderRadius:"25px",
    color:"rgb(0,0,0)",
    [theme.breakpoints.down('md')]: { 
      width:"90vw",
    }
  },
  media: {
    height: "15vh",
    width:"15vw",
    position:"absolute",
    left:"2.5vw",
    top:"5vh",
     [theme.breakpoints.down('md')]: {
        // width:"70%",
        // padding:"0"
    },
     [theme.breakpoints.down('sm')]: {
        width:"80%",
        backgroundSize:"0% 0%"
        // padding:"0"
    }
    // backgroundColor:"rgb(0,0,0,0.2)"
    // border:"1px solid rgb(0,0,0,0.5)"
    // margin:"auto"
  },
  content:{
    position:"absolute",
    left:"20vw",
    top:"2.5vh",
    // [theme.breakpoints.down('md')]: {
    //   left:"100px"
    // },
    [theme.breakpoints.down('sm')]: {
      left:"10px"
    },
    "& h4":{
      [theme.breakpoints.down('md')]: {
      fontSize:"30px",
    },
      [theme.breakpoints.down('sm')]: {
      fontSize:"25px",
    }
    }
  },
  del:{
        color:"rgb(255,0,0,0.5)",
        position:"absolute",
        right:"25px",
        top:"25px",
        padding:"0",
        margin:"0",
        outline:"none",
        border:"none",
        cursor:"pointer",
        zIndex:100,
        background:"none",
        // filter:"drop-shadow(4px 6px 4px red)",
        // height:"50px",
        // width:"50px"
        "& :hover":{
          color:"rgb(255,0,0)",
        }
      },
    edit:{
        color:"rgb(16, 94, 68, 0.5)",
        zIndex:100,
        position:"absolute",
        right:"25px",
        background:"none",
        top:"50px",
        padding:"0",
        margin:"0",
        outline:"none",
        border:"none",
        cursor:"pointer",
        // height:"50px",
        // width:"50px"
        "& :hover":{
          color:"rgb(16, 94, 68)",
        }
    },
    showEdited:{
        color:"rgb(0,0,0,0.5)",
        position:"absolute",
        top:"30px",
        right:"75px"
    },
    disableLink:{
      pointerEvents:"none"
    },
    body:{
      display: "box",
      maxWidth:"50vw",
      fontSize:15,
      lineHeight:1.4,
      // height:15*1.3*3,  
      lineClamp:3,
      boxOrient:"vertical",
      textOverflow:"ellipsis",
      overflow: "hidden",
      marginBottom:"1vh",
      marginRight:"2vw",
      [theme.breakpoints.down('md')]: {
      fontSize:"13px"
    }
    }
}));

export default function SinglePost(props) {
  const classes = useStyles();
  // console.log(props)
    const [showDial, setShowDial] = React.useState(false)
    var isEdited = props.isEdited;
    var isDeleted = props.isDeleted;
    const [val, setVal] = React.useState(true)

    // console.log(props)
    const handleDel = (e) =>{
      console.log("button clicked!")
      // e.stopPropagation();
      e.preventDefault()
      isDeleted = true;
      setShowDial(true)
      props.setPostState(props.title + " deleted")
      // .then
      // commentBody[i] = "Message Deleted"
      // isDelete[i] = true
      // axios.delete('/:threadName/posts/:postName', {data: {i, post}})
      // setRSCom(false)
    }
    const handleEdit = (e) =>{
      console.log("button clicked!")
      // e.preventDefault();
      Timeout(setVal)
      isEdited = true;
        // console.log("edit button clicked!", i)
        // onClick = {e => handleEdit(e,props.i)}
        // commentBody[i] = editCom;
        // axios.put('/:threadName/posts/:postName', {data: {i, post, editCom}})
        // isEdit.map((edit)=>{
        //     setIsEdit = false;
        // })
    }

  return (
    <>
        {/* <Link to = {`/${props.threadName}/posts/${props.title}`} className={(isDeleted || !val) ? classes.disableLink: classes.link} onClick={()=>{console.log(val);setVal(false);}}> */}
    <Card className={classes.root}>
        {!isDeleted && props.isLoggedIn && props.isLoggedIn.username === props.author && <button type = "button" className={classes.del} onClick = {e => {e.stopPropagation(); return handleDel(e)}}><DeleteForeverOutlinedIcon/></button>}
        <Link to = {`/${props.threadName}/posts/${props.title}/edit`}>
        {!isDeleted && props.isLoggedIn && props.isLoggedIn.username === props.author && <button type = "button" className={classes.edit} onClick = {e => handleEdit(e)} disabled={val}><EditOutlinedIcon/></button>} 
        </Link>
      <CardActionArea>
        {!isDeleted && isEdited && <div className = {classes.showEdited}><i>Edited</i></div>}
        {props.img && <CardMedia
          className={classes.media}
          image= {props.img.url}      
          title="Image"
          />}
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h4" component="h4">
            {props.title}
          </Typography>
          <div className={classes.body}>
            {props.body}
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            Posted by {props.author}
          </Typography>
          {/* {isDeleted && <Typography variant = "body2" color = "textPrimary" component = "p">This Post has been deleted by its creator</Typography>} */}
        </CardContent>
      </CardActionArea>
      {showDial && <Dialogue submitAction = {props.setDelPost} action = {"Delete"} name = {props.title} value= {props.id} history={ props.history} setShowDial={setShowDial}/>}
    </Card>
    </>
  );
}
