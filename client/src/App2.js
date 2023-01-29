import React, {useEffect, useRef, useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
// import './App.css';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import Home from './pages/home'
import Register from './User/Register';
import Login from './User/Login';
import Footer from './common/footer';
import Navbar from './common/navbar';
import Threads from './pages/threads';
import AllPosts from './pages/AllPosts'
import IndivPost from './pages/IndivPost'
// import Comments from './pages/Comments'
import NewThread from './pages/NewThread'
import NewPost from './pages/newPost'
import Cookies from 'universal-cookie'
import EditPost from './components/editPost'
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { makeStyles } from '@material-ui/core/styles';
import bgimg from './giphy3.gif'
import Flash from './common/flash'
import InfiniteScroll from 'react-infinite-scroll-component';

// import Cookies from 'js-cookie'
const axios = require('axios')
toast.configure();
const useStyles = makeStyles({
  "@global":{   
        ".fade-exit":{
            opacity: 1,
            // left:"0vw",
            transform:"translateX(0%)",
            // top:"64px",
            position:"absolute",
            width:"100vw"
          },
        ".fade-exit-active":{
          opacity:1,
          // left:"0vw",
          transform:"translateX(-100%)",
            transition: "transform 500ms ease-in-out",
            // top:"64px",
            position:"absolute",
            width:"100vw"
          },
          ".fade-exit-done":{
            left:"-100vw"
          },
          "fade-enter":{
            opacity:"0 !important",
            left:"100vw !important",
            // transform:"translateX(100vw)",
            position:"absolute",
            // left:"0vw",
            width:"100vw"
          },
          ".fade-enter-active":{
          opacity:1,
          // left:"100vw",
          // left:"0vw",
          transform:"translateX(0vw)",
          position:"absolute",
          transition:"opacity 500ms ease-in-out, transform 500ms ease-in-out",
          width:"100vw"
        },
        "fade-enter-done":{
          left:"0vw",
          width:"100vw"
        },
    },
    bg:{
      height:"100vh",
      width:'100vw',
      position:"absolute",
      // top:"64px",
      left:"0",
      backgroundImage: `url(${bgimg})`,
      backgroundColor:"skyblue",
      background:"center fixed no-repeat",
      backgroundSize:"cover",
      // opacity:"0.7",
    },
    root:{
      // height:"100vh",
      // width:"100vw"
    }
})
function App() {
  const classes = useStyles();

  const [regData, setRegData] = useState(null);
  const [logData, setLogData] = useState(null);
  const [ThreadData, setThreadData] = useState(null);
  const [newThread, setNewThread] = useState({});
  const [delPost, setDelPost] = useState(false);
  const [postData, setPostData] = useState(null);
  const [postState, setPostState] = useState("");
  const [commentData, setCommentData] = useState("");
  const [comState, setComState] = useState("");
  const cookie = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(cookie.get('loginSession'));
  const [showNTFlash, setShowNTF] = useState(false)
  const [showNPFlash, setShowNPF] = useState(false)
  const [showEPFlash, setShowEPF] = useState(false)
  const [showDPFlash, setShowDPF] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState("home")
  const [timer, setTimer] = useState(0)
  const [renCom, setRenCom] = useState(true)
  // console.log(isLoggedIn)
  // if(isLoggedIn){
    cookie.set("loginSession",isLoggedIn, {path:'/', expires:(new Date(Date.now() + 24*14*60*60*1000))})
  // 
  // console.log(cookie.get('loginSession'))
  if(isLoggedIn === 'false'){
    setIsLoggedIn(false)
  }
  // const getThread = () =>{
    // axios.get('/threads').then(res=>console.log(...res.data.thread))

  useEffect(()=>{
    let cancel;
    console.log("Thread get")
    axios({
      method:"GET",
      url:"/getThreads",
      cancelToken: new axios.CancelToken(c=> cancel = c)
    })
    .then(res => res.data.thread.threads && setThreadData(res.data.thread.threads))
    .catch(e => {if(axios.isCancel(e)) return})
    return ()=> cancel()
  }, [newThread])
  
  useEffect(()=>{
    let cancel;
    console.log("Post get")
    axios({
      method:"GET",
      url:"/:threadName/getPosts",
      cancelToken: new axios.CancelToken(c=> cancel = c)
    })
    .then(res => res.data.post.posts && setPostData([...res.data.post.posts]))
    .catch(e => {if(axios.isCancel(e)) return})
    
    return ()=> cancel()
  }, [postState])

  if(newThread.title){
    axios.post('/getThreads', {newThread,log:isLoggedIn})
    .then(() => setShowNTF(true))
    // .then(res => setThreadData([...res.data.thread.threads]))
    .catch(err => console.log(err));
    setNewThread({})
  }
  if(delPost){
    // console.log(delPost)
    setDelPost(false)
    setPostState("deleted!")
    axios.delete('/threads/getPosts', {data:{delPost, log:isLoggedIn}})
    .then(() => {setShowDPF(true);})
    .catch(err => console.log(err))

  }
  const handleCom = async (routeProps) =>{
    if(commentData){
        // console.log("comment post called")
        const post = findPost(routeProps.params.threadName, routeProps.params.postName)
        await axios.post('/:threadName/getPosts/:postName', {commentData, post, log:isLoggedIn})
        .then(() => {setRenCom(true)})
        .catch(err => {console.log(err)})
    }
  }
  
  function findThread(name){
    // console.log("query is ", name, " data is ", ThreadData)
    if(ThreadData && ThreadData.length){
      return ThreadData.find(function(thread){
      return thread.title === name;
    });
  }
  else{return {}}
}
function findPost(threadName, postName){
  // console.log("query is ", postName, " data is ", findThread(threadName))
  if(postData && postData.length){
    let reqPost = null;
    postData.map(post => {
        if(post.thread && post.thread.title === threadName && post.title === postName) reqPost = post;
      })  
      return reqPost;
    }
    else{return {}}
  }
  function findAllPost(threadName){
    if(postData ){
      let all = [];
      postData.map(post => {
        if(post.thread && post.thread.title === threadName) all = [...all, post]
      })  
      // console.log(all)
      return all;
    }
    else{return {}}
  }
  return (
    <div className={classes.root}>
      <div className={classes.bg}>
      <Navbar isLoggedIn = {isLoggedIn} search={search} setSearch={setSearch} page = {page} timer ={timer} setTimer={setTimer}/>
      {/* <Footer /> */}
      <Route render = {({location})=>(
        <TransitionGroup className="All">     
        <CSSTransition classNames='fade' timeout = {500} key = {location.key} >
          {/* <FlashMessage position="top" /> */}
          <Switch location={location}>
          <Route exact path = "/" render = {(routeProps)=>
            <div className="Page">
            {/* <Navbar isLoggedIn = {isLoggedIn}/> */}
            {setPage("home")}
            <Home />    
            </div>
          } />
          <Route exact path = "/threads" render = {(routeProps)=> {
            // <div className="Page">
            {/* {console.log(ThreadData)} */}
            {setPage("threads")}
            return <Threads threads = {ThreadData && ThreadData.length>=0 ? ThreadData: null} isLoggedIn = {isLoggedIn} showFlash = {showNTFlash} setShow = {setShowNTF} search={search} setSearch={setSearch}/>
            // </div>
          }} />
          <Route exact path = "/threads/new" render = {(routeProps)=>
            <div className="Page">
            {setPage("newThread")}
            {/* {console.log(isLoggedIn)} */}
            {!isLoggedIn && (toast.error('Login to add Threads and Posts!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined , toastId: 1}), <Redirect to={`/threads`}/>)}
            {isLoggedIn && 
            <NewThread threads = {ThreadData || []} {...routeProps} setNewThread = {setNewThread} isLoggedIn = {isLoggedIn}/>}
            {/* {console.log(newThread)} */}
            </div>
          } />
          <Route exact path = "/:threadName/posts" render = {(routeProps)=>
            <div className="Page">
            {/* {console.log(findAllPost(routeProps.match.params.threadName))} */}
              {setPage("posts")}
            {!findThread(routeProps.match.params.threadName) && (toast.error('Thread does not exist!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined , toastId: 1}), <Redirect to={'/threads'}/>)}
            {showEPFlash && (<Flash actionName = "Edited" name = "Post"/>,
                toast.success('Successfully edited the post!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, id:1}),
                setShowEPF(false))}
            {setPostState("render post")}
            <AllPosts posts = {(findAllPost(routeProps.match.params.threadName) && findAllPost(routeProps.match.params.threadName).length>=0)? findAllPost(routeProps.match.params.threadName):null}{...routeProps} threadName = {routeProps.match.params.threadName} isLoggedIn={isLoggedIn} thread = {findThread(routeProps.match.params.threadName) || null} showFlash = {showNPFlash} setShow = {setShowNPF} setDelPost={setDelPost} showDelFlash = {showDPFlash} setDelShow = {setShowDPF} setPostState={setPostState} search={search} setSearch={setSearch}/>
            </div>
          } />
          <Route exact path = "/:threadName/posts/new" render = {(routeProps)=>
            <div className="Page">
            {/* {getThread()} */}
              {setPage("newPost")}
            {/* {setPostState("added!!")} */}
            {!isLoggedIn && (toast.error('Login to add Threads and Posts!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined , toastId: 1}), <Redirect to={`/${routeProps.match.params.threadName}/posts`}/>)}
            {isLoggedIn && <NewPost thread = {findThread(routeProps.match.params.threadName) || []}{...routeProps} threadName = {routeProps.match.params.threadName} isLoggedIn = {isLoggedIn} setShow = {setShowNPF} setPostState={setPostState} allPost = {findAllPost(routeProps.match.params.threadName)}/>}
            {setPostState("added post")}
            </div>
          } />
          <Route exact path = "/:threadName/posts/:postName" render = {(routeProps)=>
            <div className="Page">
              {setPage("indivPost")}
            {console.log(findPost(routeProps.match.params.threadName, routeProps.match.params.postName))}
            {!findThread(routeProps.match.params.threadName) && (toast.error('Thread does not exist!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined , toastId: 1}), <Redirect to={'/threads'}/>)}
            {!findPost(routeProps.match.params.threadName, routeProps.match.params.postName) && (toast.error('Post does not exist!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined , toastId: 1}), <Redirect to={`/${routeProps.match.params.threadName}/posts`}/>)}
            <IndivPost post = {findPost(routeProps.match.params.threadName, routeProps.match.params.postName) ? findPost(routeProps.match.params.threadName, routeProps.match.params.postName) : null || null} {...routeProps} threadName = {findThread(routeProps.match.params.threadName).title} setCommentData={setCommentData} handleAddCom = {handleCom} commentData = {commentData} isLoggedIn={isLoggedIn} showFlash = {showEPFlash} setShow = {setShowEPF} showDelFlash = {showDPFlash} setDelShow = {setShowDPF} setComState={setComState} comState={comState} search={search} setSearch={setSearch} renCom={renCom} setRenCom={setRenCom}/>
            </div>
          } />
          <Route exact path = "/:threadName/posts/:postName/edit" render = {(routeProps)=>
            <div className="Page">
            {/* {console.log(findPost(routeProps.match.params.threadName, routeProps.match.params.postName))} */}
              {setPage("editPost")}
            {!findPost(routeProps.match.params.threadName, routeProps.match.params.postName) && (toast.error('Post does not exist!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined , toastId: 1}), <Redirect to={`/${routeProps.match.params.threadName}/posts`}/>)}
            {findPost(routeProps.match.params.threadName, routeProps.match.params.postName).author && findPost(routeProps.match.params.threadName, routeProps.match.params.postName).author.username && findPost(routeProps.match.params.threadName, routeProps.match.params.postName).author.username !== isLoggedIn.username && (toast.error('Not Authorised to Edit this Post!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined , toastId: 1}), <Redirect to={`/${routeProps.match.params.threadName}/posts`}/>)}
            {findPost(routeProps.match.params.threadName, routeProps.match.params.postName) && findPost(routeProps.match.params.threadName, routeProps.match.params.postName).author &&  findPost(routeProps.match.params.threadName, routeProps.match.params.postName).author.username === isLoggedIn.username && 
            <EditPost post = {findPost(routeProps.match.params.threadName, routeProps.match.params.postName)} posts = {findAllPost(routeProps.match.params.threadName)} thread = {findThread(routeProps.match.params.threadName)} isLoggedIn={isLoggedIn} {...routeProps} postname = {routeProps.match.params.postName} setShow = {setShowEPF} setPostState={setPostState}/>}
            </div>
          } />
          <Route exact path = "/register" render = {(routeProps)=>
            <div className="Page">
              {setPage("register")}
            <Register {...routeProps} setIsLoggedIn = {setIsLoggedIn} isLoggedIn={isLoggedIn}/>
            </div>
          } />
          <Route exact path = "/login" render = {(routeProps)=>
            <div className="Page">
            {setPage("login")}
            <Login {...routeProps} setIsLoggedIn = {setIsLoggedIn} isLoggedIn={isLoggedIn}/>
            </div>
          } />
          <Route exact path = "/logout" render = {(routeProps)=>
            <div className="Page">
            {setIsLoggedIn(false),
                <Redirect to = '/login'/>}
            </div>
          } />
          <Route path ='*' render ={(routeProps)=>
            <div>
              {toast.error('Page does not exist!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined , toastId: 1})}
              <Redirect to = {'/threads'} />
              {/* {routeProps.history.push('/threads')} */}
            </div>
          }/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      )} />
      {/* </main> */}
      </div>
    </div>
  );
  
}

export default App;
