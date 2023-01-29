import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ReplyIcon from '@material-ui/icons/Reply';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import {Dialogue} from '../common/dialog'
import Flash from '../common/flash'
import {toast} from 'react-toastify'
import Loading from '../utils/loading';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const useStyles = makeStyles(theme => ({
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
marginTop:"2vh",
  border:"1px solid (255,255,255,0.5)",
  width:"4vw",
  height:"4vw",
  borderRadius:"4vw",
  backgroundColor:"rgb(255,255,255, 0.3)",
  zIndex:25,
  boxShadow: "5px 5px 8px rgba(0,0,0,0.5)",
  textAlign:"center",
  textDecoration:"none",
  fontSize:"2.5vw",
  color:"skyblue",
  [theme.breakpoints.down('md')]: {
      width: '30px',
      height: '30px',
      borderRadius:"50px",
      padding:"10px",
      fontSize:"20px"
    },
//   "& :hover":{
//       width:"3vw",
//       borderRadius:"3vw",
//       height:"3vw",
//       backgroundColor:"white",
//       border:"1px solid white"
//   }
},
backDisableLink:{
  position:"fixed",
  left:"5vw",
marginTop:"2vh",
  border:"1px solid (255,255,255,0.5)",
  width:"4vw",
  height:"4vw",
  borderRadius:"4vw",
  backgroundColor:"rgb(255,255,255,0.5)",
  boxShadow: "5px 5px 8px rgba(0,0,0,0.5)",
  textAlign:"Center",
  textDecoration:"none",
  fontSize:"2.5vw",
  color:"skyblue",
  pointerEvents:"none",
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
    // left:"12.5vw",
    margin:"auto",
    top:"5vh",
    backgroundColor:"white",
    background:"cover",
    textAlign:"justify",
    padding:"5vh 5vw 5vh 5vw",
    marginBottom:"5vh",
    "& h3":{
        textAlign:"center"
    },
    [theme.breakpoints.down('md')]: {
      width:"75vw",
      padding:"5vh 5vw",
      "& h3":{
        fontSize:"30px"
      }
    },
    [theme.breakpoints.down('sm')]: {
        width:"85vw",
        // fontSize:"15px",
        padding:"5vh 4vw",
        "& h3":{
            fontSize:"30px"
        }
    }
},
comArea:{
    width:"50vw",
    // maxWidth:"70vw",
        fontFamily:"default",
        fontSize:"17px",
        height:"40px",
        marginLeft:"3vw",
        [theme.breakpoints.down('md')]: {
            marginLeft:"20px",
            width:"70vw",
            maxWidth:"75vw",
            // fontSize:"15px",
            // padding:"5vh 4vw",
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft:"5px",
            width:"80vw",
            maxWidth:"80vw",
            // fontSize:"15px",
            // padding:"5vh 4vw",
        }
    },
    allCom:{
        // border:"1px solid black"
        [theme.breakpoints.down('md')]: {
            margin:"0px",
            padding:"0"
        },
        [theme.breakpoints.down('sm')]: {
            margin:"0px"
        }
        
    },
    comBodyList:{
        margin:"40px",
        padding:"10px",
        backgroundColor:"rgb(0,0,0,0.2)",
        position:"relative",
        // border:"1px solid black",
        [theme.breakpoints.down('md')]: {
            fontSize:"13px",
            margin:"10px 0px"
        },
        [theme.breakpoints.down('sm')]: {
            margin:"15px 0px"
        }
        
    },
    mine:{
        margin:"40px",
        padding:"10px",
        backgroundColor:"rgb(0,255,0,0.2)",
        position:"relative",
        // border:"1px solid black",
        [theme.breakpoints.down('md')]: {
            fontSize:"13px",
            margin:"30px 0px"
        },
        [theme.breakpoints.down('sm')]: {
            margin:"30px 0px"
        }
    },
    author:{
        fontWeight:"bold"
    },
    del:{
        color:"rgb(255,0,0,0.5)",
        position:"relative",
        float:"right",
        // marginRight:"5px",
        top:"-20px",
        // right:"40px",
        // paddingBottom:"55px",
        // verticalAlign:"top",
        padding:"0",
        margin:"0",
        outline:"none",
        border:"none",
        background:"none",
        cursor:"pointer",
        "& :hover":{
            color:"rgb(255,0,0)",
        }
        // height:"50px",
        // width:"50px"
    },
    edit:{
        color:"rgb(16, 94, 68, 0.5)",
        position:"relative",
        float:"right",
        marginRight:"5px",
        // right:"10px",
        top:"-20px",
        padding:"0",
        margin:"0",
        outline:"none",
        border:"none",
        background:"none",
        cursor:"pointer",
        "& :hover":{
            color:"rgb(16, 94, 68)",
        }
        // height:"50px",
        // width:"50px"
    },
    showEdited:{
        color:"rgb(0,0,0,0.5)",
        position:"absolute",
        top:"1px",
        left:"50px",
    },
    replyButton:{
        color:"rgb(0,0,0,0.3)",
        // border:"1px solid rgb(0,0,0,0.3)",
        top:"-22px",
        // display:"flex",
        float:"right",
        // justifyContent:"right",
        // textAlign:"right",
        // marginLeft:"auto",
        marginRight:"5px",
        position:"relative",
        // fontSize:"5px",
        background:"none",
        cursor:"pointer",
        "& :hover":{
            color:"rgb(0,0,0,0.8)",
            // border:"1px solid rgb(0,0,0,0.6)"
        },
        border:"none"
    },
    postButton:{
        marginTop:"-5vh",
        marginLeft:"5vw",
        [theme.breakpoints.down('md')]: {
            marginTop:"0px",
            height:"45px",
            // width:"75px",
            fontSize:"12px"
        },
        [theme.breakpoints.down('sm')]: {
            marginTop:"0px",
            height:"45px",
            // width:"75px",
            fontSize:"10px"
        }
    },
    showReply:{
        backgroundColor:"rgb(0,0,0,0.1)",
        margin:"0 40px",
        padding:"10px",
        position:"relative",
        [theme.breakpoints.down('sm')]: {
            margin:"2px 8px",
        }
        // width:"30vw",
    },
    exitReply:{
        position:"absolute",
        top:"1px",
        right:"15px",
        fontSize:"20px",
        cursor:"pointer"
    },
    replyCom:{
        backgroundColor:"rgb(0,0,0,0.1)",
        // margin:"0 40px",
        position:"relative",
        padding:"10px",
    },
    mainCom:{
        position:"relative"
    },
    carousel:{
        height:"auto",
        width:"30vw",
        margin:"auto",
        border:"1px solid black",
        marginBottom:"10vh",
        [theme.breakpoints.down('md')]: {
            width:"40vw",
            // padding:"0"
        },
        [theme.breakpoints.down('sm')]: {
            width:"70vw",
            // padding:"0"
        }
    }
    // delMenu:{
        //     color:"rgb(255,0,0,0.5)",
        //     position:"absolute",
        //     top:"10px"
        // },
        // actionMenu:{
            //     position:"relative",
            //     right:"25px",
            //     top:"25px"
    // }
}))
export default function IndivPost(props) {
    const classes = useStyles();
    const {threadName, post,setCommentData} = props;
    const [comments, setComments] = React.useState([])
    const [comms, setComms] = React.useState(null)
    const [com, setCom] = React.useState("")
    const [editCom, setEditCom] = React.useState([])
    const [commentBody, setCommentBody] = React.useState([])
    const [commentAuthor, setCommentAuthor] = React.useState([])
    const [commentDelete, setCommentDelete] = React.useState([])
    const [commentEdit, setCommentEdit] = React.useState([])
    const [commentId, setCommentId] = React.useState([])
    const [renderCom, setRenderCom] = React.useState(true)
    const [renderSetCom, setRSCom] = React.useState(true)
    const [isEdit, setIsEdit] = React.useState([])
    const [wasEdit, setWasEdit] = React.useState(false)
    const [wasDelete, setWasDelete] = React.useState(false)
    const [isDelete, setIsDelete] = React.useState([])
    // const [showDial, setShowDial] = React.useState(false)
    const [reply, setReply] = React.useState([])
    const [replyAuth, setReplyAuth] = React.useState([])
    const [replyBody, setReplyBody] = React.useState([])
    const replyRef = React.useRef()
    const [val, setVal] = React.useState(true)
    const [comState, setComState] = React.useState(props.comState)

    // post = JSON.parse(post)
    const handleCom = (e) =>{
        setCom(e.target.value)
    }

    const handleEditCom = (e,i) =>{
        props.setComState("edit ", e.target.value)
        setComState("edit ", e.target.value)
        props.setRenCom(false)
        const edited = [];
        editCom.map((com,ind) => {
            if(i === ind){
                edited.push(e.target.value)
            }
            else{edited.push(com)}
        })
        setEditCom(edited)
    }
    const Toggler = (i) =>{
        const edited = [];
        // console.log(isEdit)
        isEdit.map((com,ind) => {
            if(i === ind){
                edited.push(!com)
            }
            else{edited.push(com)}
        })
        setIsEdit(edited)
    }
    const DelToggler = (i) =>{
        const edited = [];
        isDelete.map((com,ind) => {
            if(i === ind){
                edited.push(!com)
            }
            else{edited.push(com)}
        })
        setIsDelete(edited)
    }
    
    const handleSubmit = (e, authorDetail)=>{
        e.preventDefault()
        // console.log("Render com is ", renderCom)
        // React.useEffect(()=>{
            if(renderCom){
                setCommentData({body:com, author:authorDetail, isEdited:false, isDeleted:false, replyAuth:reply[0], replyBody:reply[1]})
                setRenderCom(false)
            }
            // }, [renderCom])
            setCom("")
        setComState("added ", com)
        props.setComState("added ", com)
        setRSCom(true)
        setIsEdit([...isEdit, false])
        setIsDelete([...isDelete, false])
        props.setRenCom(false)
        setReply([])
    }

    const handleDel = (i) =>{
        // console.log("button clicked!", i)
        comments[i].body = "Message Deleted"
        commentBody[i] = "Comment Deleted"
        const delId = commentId[i]
        DelToggler(i)
        axios.delete('/:threadName/getPosts/:postName', {data: {i, post, delId, log:props.isLoggedIn}})
        setRSCom(true)
        props.setRenCom(true)
        setComState("deleted ", commentBody[i])
        props.setComState("deleted ", commentBody[i])
    }
    const handleEdit = (e,i) =>{
        e.preventDefault()
        props.setComState("edited ", commentBody[i])
        setComState("edited ", commentBody[i])
        props.setRenCom(true)
        comments[i].body = editCom[i];
        commentBody[i] = editCom[i];
        const editId = commentId[i]
        const comEdit = editCom[i]
        // console.log("comEdit is ", editCom)
        Toggler(i)
        // console.log(isEdit)
        axios.put('/:threadName/getPosts/:postName', {data: {i, post, comEdit, editId, log: props.isLoggedIn}})
        setRSCom(true)
    }
    
    const handleReply =(e,i)=>{
        e.preventDefault();
        props.setComState("replied to ", commentBody[i])
        setComState("replied to ", commentBody[i])
        props.setRenCom(true)
        replyRef.current.scrollIntoView({ behavior: 'smooth' }) 
        setReply([commentAuthor[i], commentBody[i]])
    }

    if(props.commentData.body && !renderCom){
        // console.log(props.commentData)
        props.handleAddCom(props.match)
        setRenderCom(true)
        setRSCom(true)
    }
    React.useEffect(() => {
        // console.log(comments, comments.length, post.length)
        if(comments && post && renderSetCom){
            // console.log("post is ", post, "comments are ", comments)
            let allBody =[], allAuth=[], allDel=[], allEdit=[], allEC=[], allId=[], allReplyAuth=[], allReplyBody=[];
            comments.map(onecom => {
                    // console.log("One com is ", onecom, " and post id is ", post._id)
                    if(onecom.post && post._id === onecom.post._id && onecom.body.includes(props.search)){
                        // console.log("Search ", props.search, " and post is ", p)
                        allBody = [...allBody, onecom.body]
                        allAuth = [...allAuth, onecom.author.username]
                        allDel = [...allDel, onecom.isDeleted]
                        allEdit = [...allEdit, onecom.isEdited]
                        allEC = [...allEC, onecom.body]
                        allId = [...allId, onecom._id]
                        allReplyAuth = [...allReplyAuth, onecom.replyAuth]
                        allReplyBody = [...allReplyBody, onecom.replyBody]
                        // setIsEdit([...isEdit, false])
                        // setIsDelete([...isDelete, false])
                    }
                })
            setCommentBody(allBody)
            setCommentAuthor(allAuth)
            setCommentDelete(allDel)
            setCommentEdit(allEdit)
            setEditCom(allEC)
            setCommentId(allId)
            setReplyAuth(allReplyAuth)
            setReplyBody(allReplyBody)
            allBody.map((com,i)=>{
                setIsEdit(isEdit=> [...isEdit, false])
                setIsDelete(isDelete=> [...isDelete, false])
            })
        }
    }, [post, comments, props.search])

    React.useEffect(()=>{
    let cancel;
    if(props.renCom){
        axios({
            method:"GET",
            url:"/:threadName/getPosts/:postName",
            cancelToken: new axios.CancelToken(c=> cancel = c)
        })
        .then(res => {
            setComments(res.data.comment.comments)
            console.log("Trying to set comments")
            // console.log("Trying to set comments")
            // setEditCom([comments.map(com => com.body)])
        })
        .catch(e => {if(axios.isCancel(e)) return})
    }
    if(cancel){
        return ()=> cancel()
    }
    }, [props.commentData, comState, props.renCom])

    const checkCom = () =>{
        if(comments.length && commentBody.length && props.post && !props.post.isDeleted){
            // console.log(comments)
            return <div className={classes.allCom}>{
            // commentBody.map((onecom,i)=><div className={classes.comBodyList} onBlur = {() => {console.log("blurred"); isEdit[i] = false}}>
            commentBody.map((onecom,i)=><div className={commentAuthor[i] !== props.isLoggedIn.username ? classes.comBodyList : classes.mine}> 
                {replyAuth[i] && replyAuth[i].length > 0 && <div className={classes.replyCom}>
                    {replyAuth[i]}<br/>{replyBody[i]}
                    </div>}
                <div className={classes.mainCom}>
                <div className={classes.author}>{commentAuthor[i]}</div>

                {!isDelete[i] && !commentDelete[i] && props.isLoggedIn && props.isLoggedIn.username === commentAuthor[i] && <button type = "button" className={classes.del} onClick = {() => handleDel(i)}><DeleteForeverOutlinedIcon/></button>}
                {!isDelete[i] && !commentDelete[i] && props.isLoggedIn && props.isLoggedIn.username === commentAuthor[i] && <button type = "button" className={classes.edit} onClick = {() => {console.log(isEdit[i]); props.setComState("changed!"); Toggler(i) }}><EditOutlinedIcon/></button>}
                {!isDelete[i] && !commentDelete[i] &&
                // <ScrollLink to='replyScroll' activeClass="active" smooth={true} spy={true} duration={1000} offset={50}>
                <button type = "button"  className={classes.replyButton} onClick={(e)=>{handleReply(e,i)}}>
                <ReplyIcon/>
                </button>}
                {!isEdit[i] && <div className={classes.comnt}>
                    {/* {console.log(onecom)} */}
                    
                    {commentEdit[i] && !isDelete[i] && !commentDelete[i] && <div className={classes.showEdited}><i>Edited</i></div>}
                    {!isDelete[i] && !commentDelete[i] && onecom}
                    {(isDelete[i] || commentDelete[i]) && <i>{onecom}</i>}
                    {/* {props.setComState("changed!")} */}
                    </div>}
                {/* {console.log(isEdit[i])} */}
                {isEdit[i] && !isDelete[i] && !commentDelete[i] && <form onSubmit={(e) => handleEdit(e, i)}>
                    <textarea placeholder="Edited Comment..." className={classes.comArea} onChange={(e) => handleEditCom(e,i)} value = {editCom[i]} required></textarea>
                    <button type="submit" variant="outlined" color="primary">Post comment</button>
                    </form>}
                </div>
                <br></br>
                </div>)
            }</div>
    }
    else{
        if(props.search.trim() === "") {return "No discussions yet, start one by commenting now!"}
        else {return "No results found!"}
    }}
    return (
        <>
        {/* {console.log("Post is ", props.post)} */}
        {!props.post && <Loading />}
        {props.post && props.post.title && <div className = {classes.bg}>   
            {/* {console.log(props.isLoggedIn)} */}
            {props.showDelFlash && 
                (
            <Flash actionName = "Deleted" name = "Post"/>,
                toast.success('Successfully deleted the post!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined}),
                props.setDelShow(false)
                )
            }
            {val && <Link to = {`/${threadName}/posts`} className={classes.backLink} onClick={()=>{setVal(false)}}><ArrowBackIosIcon /></Link>}
            {!val && <Link to = {`/${threadName}/posts`} className={classes.backDisableLink}><ArrowBackIosIcon /></Link>}
            <div className = {classes.content}>
                <Typography gutterBottom variant="h3">
                    {post.title}
                </Typography>
                {props.post.images.length>0 && props.post.images[0].url && <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} interval={3000} className={classes.carousel}>
                    {props.post.images.map(img=>{ return <div >
                        {/* <div> */}
                            {/* {console.log(img.url)} */}
                            <img src={img.url} />
                            {/* <p className="legend">Legend 1</p> */}
                        {/* </div>     */}
                    </div>
                    })}
                </Carousel>}
                <Typography gutterBottom variant="body1">
                    {post.body}
                </Typography>
            </div>
            {comments && !props.post.isDeleted &&
            <div className = {classes.content}>
                <Typography gutterBottom variant="h3">
                    Discussions
                </Typography>
                <div>
                    {props.search.trim().length>0 && <div className={classes.searchBox}>
                    Searching for... {props.search}
                    <button onClick = {()=>{props.setSearch("")}}>Cancel Search</button>
                </div>}
                </div>
                <Typography gutterBottom variant="body1">
                    {checkCom()}
                </Typography>
                
                {reply && reply.length>0 && <div className={classes.showReply} >
                    Replying to: {reply[0]} <br /> {reply[1]} <span className={classes.exitReply} onClick = {()=>{setReply([])}}>x</span>
                    </div>}
                {/* </Element> */}
                {props.isLoggedIn && 
                (
                    <form onSubmit={e => handleSubmit(e, props.isLoggedIn)} >
                    <textarea placeholder="Comment..." className={classes.comArea} onChange={handleCom} value = {com} required></textarea>
                    <Button type="submit" variant="outlined" color="primary" className={classes.postButton} color="default">Post comment</Button>
                </form>
                )
            }
                {!props.isLoggedIn && 
                <form onSubmit={e => handleSubmit(e, props.isLoggedIn)}>
                    <textarea placeholder="Login to Comment..." className={classes.comArea} onChange={handleCom} value = {com} required></textarea>
                    <Button type="submit" variant="outlined" color="primary" className={classes.postButton} disabled>Post comment</Button>
                </form>
                }
                <div ref={replyRef}/>
            </div>
            }
        </div>}
        </>
    )
}
