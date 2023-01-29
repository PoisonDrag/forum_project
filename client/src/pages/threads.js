import React from 'react'
import SingleThread from '../components/singleThread'
import { makeStyles } from '@material-ui/core/styles';
import Flash from '../common/flash'
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import Loading from '../utils/loading'
const useStyles = makeStyles(theme => ({
    root:{
    // width:"100vw",
    marginLeft:"15vw",
    marginTop:"5vh",
    marginBottom:"5vh",
    position:"relative",
    display:"flex",
    [theme.breakpoints.down('md')]: {
      marginLeft:"7vw"
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft:"5vw"
    }
  },
  bg:{
    height:"90vh",
    width:"100%",
    position:"relative",
    // backgroundColor:"rgba(0,0,0,0.1)",
    overflowY:"auto",
    background:"cover"
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
      zIndex:100,
      [theme.breakpoints.down('md')]: {
      width: '30px',
      height: '30px',
      borderRadius:"50px",
      padding:"10px",
      fontSize:"20px",
    //   "& a":{
    //       textDecoration:"none",
    //   }
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
      zIndex:100,
      [theme.breakpoints.down('md')]: {
      width: '30px',
      height: '30px',
      borderRadius:"50px",
      padding:"10px",
      fontSize:"20px",
    //   "& a":{
    //       textDecoration:"none",
    //   }
  }},
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
  disableLink:{
    pointerEvents:"none"
  }
}));

export default function Threads(props) {
      const classes = useStyles();
      const [reqThreads, setReqThreads] = React.useState(props.threads)
      const [val, setVal] = React.useState(true)
      React.useEffect(()=>{
        var req=[];
        props.threads && props.threads.map((thread,i)=>{
          if(thread.title.includes(props.search)){
            req.push(thread)
          }
        })
        setReqThreads(req);
        req=[];
      },[props.threads, props.search])
    if(props.threads && props.threads.length && props.search === "" && !reqThreads.length){setReqThreads(props.threads)}
    
    return (
        <>
        {!props.threads && <Loading />}
        {props.threads && <div className={classes.bg}>
          {props.isLoggedIn && val && 
            <Link to = {"/threads/new"} className={classes.newLink} onClick={()=>{setVal(false)}}>+</Link>}
          {props.isLoggedIn && !val && 
            <Link to = {"/threads/new"} className={classes.newDisableLink} >+</Link>}
          {props.showFlash && 
            (
              <Flash actionName = "Created" name = "Thread"/>,
              toast.success('Successfully created a thread!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined}),
              props.setShow(false)
            )
          }
          <div>
            {props.search.trim().length>0 && <div className={classes.searchBox}>
              Searching for... "{props.search}"
              <button onClick = {()=>{props.setSearch("")}}>Cancel Search</button>
              </div>}
          </div>
          {/* <TransitionGroup> */}
          {/* {!props.search && setReqThreads(props.threads)} */}
          {/* {console.log(reqThreads)}*/}
          <div className={classes.title}>THREADS</div>
          {reqThreads && reqThreads.length>0 && reqThreads.map((thread, i) => {
                  return <div className={classes.root}>
                        {val && <Link to = {`/${thread.title}/posts`} onClick={()=>{setVal(false)}}>
                      {/* <CSSTransition key = {thread._id} classNames = "fade" timeout={500}> */}
                        <SingleThread index={i} title = {thread.title} author = {thread.author.username} key =  {thread._id}/>
                      {/* </CSSTransition> */}
                          </Link>}
                        {!val && <Link to = {`/${thread.title}/posts`} className={classes.disableLink}>
                      {/* <CSSTransition key = {thread._id} classNames = "fade" timeout={500}> */}
                        <SingleThread index={i} title = {thread.title} author = {thread.author.username} key =  {thread._id}/>
                      {/* </CSSTransition> */}
                          </Link>}
                    </div>
            })}
          {/* </TransitionGroup> */}
        </div>}
      </>
    )
}
