// import React, {useEffect, useRef, useState} from 'react'
// import {Route, Switch, Redirect} from 'react-router-dom'
// // import './App.css';
// import {CSSTransition,TransitionGroup} from 'react-transition-group';
// import Home from './pages/home'
// import Register from './User/Register';
// import Login from './User/Login';
// import Footer from './common/footer';
// import Navbar from './common/navbar';
// import Threads from './pages/threads';
// import AllPosts from './pages/AllPosts'
// import IndivPost from './pages/IndivPost'
// import Comments from './pages/Comments'
// import NewThread from './pages/NewThread'
// import NewPost from './pages/newPost'
// import Cookies from 'universal-cookie'
// import EditPost from './components/editPost'
// import {toast} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'
// import { makeStyles } from '@material-ui/core/styles';
// import bgimg from './giphy3.gif'
// // import Cookies from 'js-cookie'
// const axios = require('axios')
// toast.configure();
// const useStyles = makeStyles({
//   "@global":{   
//         ".fade-exit":{
//             opacity: 1,
//             // left:"0vw",
//             transform:"translateX(0%)",
//             // top:"64px",
//             position:"absolute",
//             width:"100vw"
//           },
//         ".fade-exit-active":{
//           opacity:1,
//           // left:"0vw",
//           transform:"translateX(-100%)",
//             transition: "transform 500ms ease-in-out",
//             // top:"64px",
//             position:"absolute",
//             width:"100vw"
//           },
//           ".fade-exit-done":{
//             left:"-100vw"
//           },
//           "fade-enter":{
//             opacity:"0 !important",
//             left:"100vw !important",
//             // transform:"translateX(100vw)",
//             position:"absolute",
//             // left:"0vw",
//             width:"100vw"
//           },
//           ".fade-enter-active":{
//           opacity:1,
//           // left:"100vw",
//           // left:"0vw",
//           transform:"translateX(0vw)",
//           position:"absolute",
//           transition:"opacity 500ms ease-in-out, transform 500ms ease-in-out",
//           width:"100vw"
//         },
//         "fade-enter-done":{
//           left:"0vw",
//           width:"100vw"
//         },
//     },
//     bg:{
//       height:"91vh",
//       width:'100vw',
//       position:"absolute",
//       // top:"64px",
//       left:"0",
//       backgroundImage: `url(${bgimg})`,
//       background:"center fixed no-repeat",
//       backgroundSize:"cover",
//       opacity:"0.7"
//     },
//     root:{
//       height:"100vh",
//       width:"100vw"
//     }
// })
// function App() {
//   const classes = useStyles();

//   const [regData, setRegData] = useState(null);
//   const [logData, setLogData] = useState(null);
//   const [ThreadData, setThreadData] = useState([]);
//   const [newThread, setNewThread] = useState({});
//   const [delPost, setDelPost] = useState(false);
//   const [postData, setPostData] = useState([]);
//   const [commentData, setCommentData] = useState("");
//   const cookie = new Cookies();
//   const [isLoggedIn, setIsLoggedIn] = useState(cookie.get('loginSession'));
//   const [showNTFlash, setShowNTF] = useState(false)
//   const [showNPFlash, setShowNPF] = useState(false)
//   const [showEPFlash, setShowEPF] = useState(false)
//   const [showDPFlash, setShowDPF] = useState(false)
//   // console.log(isLoggedIn)
//   // if(isLoggedIn){
//     cookie.set("loginSession",isLoggedIn, {path:'/', expires:(new Date(Date.now() + 24*14*60*60*1000))})
//   // 
//   // console.log(cookie.get('loginSession'))
//   if(isLoggedIn === 'false'){
//     setIsLoggedIn(false)
//   }
//   // const getThread = () =>{
//     // axios.get('/threads').then(res=>console.log(...res.data.thread))

//   useEffect(()=>{
//     let cancel;
//     axios({
//       method:"GET",
//       url:"/threads",
//       cancelToken: new axios.CancelToken(c=> cancel = c)
//     })
//     .then(res => setThreadData([...res.data.thread.threads]))
//     .catch(e => {if(axios.isCancel(e)) return})
//   }, [ThreadData])

//   useEffect(()=>{
//     let cancel;
//     axios({
//       method:"GET",
//       url:"/:threadName/posts",
//       cancelToken: new axios.CancelToken(c=> cancel = c)
//     })
//     .then(res => setPostData([...res.data.post.posts]))
//     .catch(e => {if(axios.isCancel(e)) return})
//   }, [postData])

//   if(newThread.title){
//     axios.post('/threads', newThread)
//     .then(() => setShowNTF(true))
//     // .then(res => setThreadData([...res.data.thread.threads]))
//     .catch(err => console.log(err));
//     setNewThread({})
//   }
//   if(delPost){
//     // console.log(delPost)
//     setDelPost(false)
//     axios.delete('/threads/posts', {data:{delPost}})
//     .then(() => {setShowDPF(true);})
//     .catch(err => console.log(err))

//   }
//   const handleCom = (routeProps) =>{
//     if(commentData){
//       // console.log("comment post called")
//       const post = findPost(routeProps.params.threadName, routeProps.params.postName)
//       axios.post('/:threadName/posts/:postName', {commentData, post})
//       .then(() => {console.log('updated')})
//       .catch(err => console.log(err));
//     }
//   }
  
//   function findThread(name){
//     // console.log("query is ", name, " data is ", ThreadData)
//     if(ThreadData.length){
//       return ThreadData.find(function(thread){
//       return thread.title === name;
//     });
//     }
//     else{return []}
//   }
//   function findPost(threadName, postName){
//     // console.log("query is ", postName, " data is ", findThread(threadName))
//     if(findThread(threadName).posts && (findThread(threadName).posts).length){
//       return (findThread(threadName).posts).find(function(post){
//       return post.title === postName;
//       });
//     }
//     else{return []}
//   }
//   return (
//     <div className={classes.root}>
//       <Navbar isLoggedIn = {isLoggedIn} />
//       <Footer />
//       <div className={classes.bg}/>
//       <Route render = {({location})=>(
//         <TransitionGroup className="All">     
//         <CSSTransition classNames='fade' timeout = {500} key = {location.key} appear={true} in={true}>
//           {/* <FlashMessage position="top" /> */}
//           <Switch location={location}>
  
//           <Route exact path = "/" render = {(routeProps)=>
//             <div className="Page">
//             {/* <Navbar isLoggedIn = {isLoggedIn}/> */}
//             <Home />    
//             </div>
//           } />
//           <Route exact path = "/threads" render = {(routeProps)=>
//             <div className="Page">
//             {/* {console.log(ThreadData)} */}
//             <Threads threads = {ThreadData} isLoggedIn = {isLoggedIn} showFlash = {showNTFlash} setShow = {setShowNTF}/>
//             </div>
//           } />
//           <Route exact path = "/threads/new" render = {(routeProps)=>
//             <div className="Page">
//             <NewThread threads = {ThreadData || []} {...routeProps} setNewThread = {setNewThread} isLoggedIn = {isLoggedIn}/>
//             {/* {console.log(newThread)} */}
//             </div>
//           } />
//           <Route exact path = "/:threadName/posts" render = {(routeProps)=>
//             <div className="Page">
//             {/* {console.log(ThreadData)} */}
//             <AllPosts posts = {findThread(routeProps.match.params.threadName).posts|| []}{...routeProps} threadName = {findThread(routeProps.match.params.threadName).title} isLoggedIn={isLoggedIn} thread = {findThread(routeProps.match.params.threadName) || []} showFlash = {showNPFlash} setShow = {setShowNPF} setDelPost={setDelPost} showDelFlash = {showDPFlash} setDelShow = {setShowDPF}/>
//             </div>
//           } />
//           <Route exact path = "/:threadName/posts/new" render = {(routeProps)=>
//             <div className="Page">
//             {/* {getThread()} */}
//             <NewPost thread = {findThread(routeProps.match.params.threadName) || []}{...routeProps} threadName = {findThread(routeProps.match.params.threadName).title} isLoggedIn = {isLoggedIn} setShow = {setShowNPF}/>
//             </div>
//           } />
//           <Route exact path = "/:threadName/posts/:postName" render = {(routeProps)=>
//             <div className="Page">
//             {/* {console.log(findPost(routeProps.match.params.threadName, routeProps.match.params.postName))} */}
//             <IndivPost post = {findPost(routeProps.match.params.threadName, routeProps.match.params.postName)|| []} {...routeProps} threadName = {findThread(routeProps.match.params.threadName).title} setCommentData={setCommentData} handleAddCom = {handleCom} commentData = {commentData} isLoggedIn={isLoggedIn} showFlash = {showEPFlash} setShow = {setShowEPF} showDelFlash = {showDPFlash} setDelShow = {setShowDPF}/>
//             </div>
//           } />
//           <Route exact path = "/:threadName/posts/:postName/edit" render = {(routeProps)=>
//             <div className="Page">
//             {/* {console.log(findPost(routeProps.match.params.threadName, routeProps.match.params.postName))} */}
//             <EditPost post = {findPost(routeProps.match.params.threadName, routeProps.match.params.postName)} thread = {findThread(routeProps.match.params.threadName)} isLoggedIn={isLoggedIn} {...routeProps} postname = {routeProps.match.params.postName} setShow = {setShowEPF}/>
//             <Footer />
//             </div>
//           } />
//           <Route exact path = "/register" render = {(routeProps)=>
//             <div className="Page">
//             {/* <Navbar isLoggedIn = {isLoggedIn}/> */}
//             <Register {...routeProps} setIsLoggedIn = {setIsLoggedIn} isLoggedIn={isLoggedIn}/>
//             </div>
//           } />
//           <Route exact path = "/login" render = {(routeProps)=>
//             <div className="Page">
//             {/* <Navbar isLoggedIn = {isLoggedIn}/> */}
//             <Login {...routeProps} setIsLoggedIn = {setIsLoggedIn} isLoggedIn={isLoggedIn}/>
//             </div>
//           } />
//           <Route exact path = "/logout" render = {(routeProps)=>
//             <div className="Page">
//             {/* <Navbar />
//             <Login {...routeProps} setIsLoggedIn = {setIsLoggedIn} isLoggedIn={isLoggedIn}/>
//             <Footer /> */}
//             {setIsLoggedIn(false),
//                 <Redirect to = '/login'/>}
//             </div>
//           } />
//           </Switch>
//         </CSSTransition>
//       </TransitionGroup>
//       )} />
//       {/* </main> */}
//     </div>
//   );
  
// }

// export default App;
