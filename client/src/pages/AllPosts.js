import React from 'react'
import SinglePost from '../components/singlePost'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import Flash from '../common/flash'
import {toast} from 'react-toastify'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import Loading from '../utils/loading';

const useStyles = makeStyles(theme =>({
  bg:{
    height:"90vh",
    width:"100%",
    position:"relative",
    backgroundColor:"rgba(0,0,0,0.1)",
    overflowY:"auto",
    background:"cover",
    // top:"5vh",
    // bottom:"5vh"
  },
  newLink:{
      position:"fixed",
      right:"5vw",
      bottom:"5vh",
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
      fontSize:"20px",
  }},
  newDisableLink:{
      position:"fixed",
      right:"5vw",
      bottom:"5vh",
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
      pointerEvents:"none",
      [theme.breakpoints.down('md')]: {
      width: '30px',
      height: '30px',
      borderRadius:"50px",
      padding:"10px",
      fontSize:"20px",
  }},
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
    },
    backDisableLink:{
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
      pointerEvents:"none",
      [theme.breakpoints.down('md')]: {
      width: '30px',
      height: '30px',
      borderRadius:"50px",
      padding:"10px",
      fontSize:"20px",
  }},
  link:{
    width:"70vw",
    left:"15vw",
    marginBottom:"5vh",
    top:"5vh",
    position:"relative",
    [theme.breakpoints.down('md')]: {
      left:"5vw"
    }
  },
  searchBox:{
    width:"66vw",
    padding:"2vh 2vw",
    margin:"5vh auto",
    backgroundColor:"white",
    wordWrap:"break-word",
    "& button":{
      backgroundColor:"lightgrey",
      marginLeft:"20px",
      padding:"5px"
    }
  },
    disableLink:{
      pointerEvents:"none",
    },
    none:{
      color:"white",
      fontSize:"5vw",
      fontFamily:"roboto",
      position:"relative",
      textAlign:"center",
    },
    title:{
    color:"white",
    textAlign:"center",
    fontFamily:"roboto",
    marginTop:"2vh",
    fontSize:"4vw",
        [theme.breakpoints.down('md')]: {
            fontSize:"6vw"
            },
        [theme.breakpoints.down('sm')]: {
            fontSize:"8vw"
            },
  },
}));

export default function AllPosts (props) {
    const classes = useStyles();
    const [reqPosts, setReqPosts] = React.useState(props.posts)
    const [val, setVal] = React.useState(true)
      React.useEffect(()=>{
        var req=[];
        props.posts && props.posts.map((post,i)=>{
          if(post.title.includes(props.search)){
            req.push(post)
          }
        })
        setReqPosts(req);
        req=[];
      },[props.search, props.posts])
    // if(props.posts && props.posts.length && props.search && props.search.length>0 && !reqPosts.length){console.log(reqPosts); setReqPosts(props.posts)}
    return (
      <>
      {!props.posts && <Loading />}
      {props.posts && <div className={classes.bg}>
        {props.isLoggedIn && val && <Link to = {`/${props.threadName}/posts/new`} className={classes.newLink} onClick = {()=>{setVal(false)}}>+</Link>}
        {props.isLoggedIn && !val && <Link to = {`/${props.threadName}/posts/new`} className={classes.newDisableLink} >+</Link>}
        {val && <Link to = {`/threads`} className={classes.backLink} onClick={()=>{setVal(false)}}><ArrowBackIosIcon /></Link>}
        {!val && <Link to = {`/threads`} className={classes.backDisableLink}><ArrowBackIosIcon /></Link>}
        {/* {console.log(props.posts)} */}
        {props.showFlash && 
        (
          <Flash actionName = "Created" name = "Post"/>,
          toast.success('Successfully created a post!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined}),
          props.setShow(false)
        )
      }
        {/* <TransitionGroup > */}
      <div>
          {props.search.trim().length>0 && <div className={classes.searchBox}>
            Searching for... {props.search}
            <button onClick = {()=>{props.setSearch("")}}>Cancel Search</button>
            </div>}
        </div>
        <div className={classes.title}>{props.threadName.toUpperCase()} - POSTS</div>
        {/* {console.log("reqPosts is ",reqPosts)} */}
        {reqPosts.map((post, i) => {
            return <div className={classes.link}>
                {/* <CSSTransition key = {post._id} classNames = "fade" timeout={500} in ={true} appear={true}> */}
                {(!post.isDeleted && val) && <Link to = {`/${props.threadName}/posts/${post.title}`} onClick={()=>{setVal(false)}}>
                <SinglePost threadName = {props.threadName} index={i} body = {post.body} title = {post.title} author = {post.author.username} isLoggedIn={props.isLoggedIn} isDeleted={post.isDeleted} isEdited = {post.isEdited} id = {post._id} key =  {post._id} i ={i} thread = {props.thread} setDelPost={props.setDelPost} history={props.history} setPostState={props.setPostState} img = {post.images[0]}/>
                {/* </CSSTransition> */}
                </Link>}
                {(post.isDeleted|| !val) && <Link to = {`/${props.threadName}/posts/${post.title}`} className={classes.disableLink}>
                <SinglePost threadName = {props.threadName} index={i} body = {post.body} title = {post.title} author = {post.author.username} isLoggedIn={props.isLoggedIn} isDeleted={post.isDeleted} isEdited = {post.isEdited} id = {post._id} key =  {post._id} i ={i} thread = {props.thread} setDelPost={props.setDelPost} history={props.history} setPostState={props.setPostState} img = {post.images[0]}/>
                {/* </CSSTransition> */}
                </Link>}

              </div>
        })}
        {/* {props.posts && !props.posts.length && <div className = {classes.none}>
          No Posts created in thread '{props.threadName}' yet!
          </div>} */}
        {/* </TransitionGroup> */}
    </div>}
      </>
    )
}
