import { makeStyles } from '@material-ui/core';
import React from 'react'
import Typewriter from 'typewriter-effect';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme =>({
    bg:{
        // display:"flex",
        // opacity:1,
        // marginTop:"-2.3vw",
        position:"relative",
        // paddingTop:0,
        // height:"calc(100vh - 64px)",
        height:"90vh",
        width:"100vw",
        overflowY:"auto",
        background:"cover"
    },
    title:{
        // color:"rgb(255, 255, 255)",
        color:"white",
        fontFamily:"Roboto",
        // color:"rgb(217, 221, 222, 0.5)",
        opacity:1,
        // position:"relative",
        textAlign:"center",
        zIndex:100,
        paddingTop:"5vh",
        // margin:"0 auto",
        fontSize:"4vw",
        [theme.breakpoints.down('md')]: {
            fontSize:"6vw"
            },
        [theme.breakpoints.down('sm')]: {
            fontSize:"8vw"
            },
    },
    type:{
        zIndex:100,
        color:"white",
        textAlign:"center",
        // position:"relative",
        fontSize:"3vw",
        [theme.breakpoints.down('md')]: {
            fontSize:"4vw"
            },
        [theme.breakpoints.down('sm')]: {
            fontSize:"6vw"
            },
        // margin:"auto"
    },
    thread:{
        marginTop:"10vh",
        color:"white",
        fontFamily:"Roboto",
        // color:"rgb(217, 221, 222, 0.5)",
        opacity:1,
        // position:"relative",
        textAlign:"center",
        zIndex:100,
        padding:"5vh 2vw",
        margin:"0 auto",    
        fontSize:"3vw",
        border:"3px solid white",
        width:"22vw",
        transition:"all 0.5s ease-in-out",
        [theme.breakpoints.down('md')]: {
            width:"35vw",
            fontSize:"4vw"
            },
        [theme.breakpoints.down('sm')]: {
            width:"45vw",
            fontSize:"6vw"
            },
    },
    threadLink:{
        textDecoration:"none",
        transition:"all 0.5s ease-in-out",
        "& :hover":{
            transform:"scale(1.1,1.1)",
        }
    },
    disableLink:{
        textDecoration:"none",
        pointerEvents:"none",
        transition:"all 0.5s ease-in-out",
        "& :hover":{
            transform:"scale(1.1,1.1)",
        }
    }
}))
export default function () {
    const classes = useStyles();
    const [val,setVal] = React.useState(true)
    return (
        <div className={classes.bg}>
           <h1 className={classes.title}>Welcome to Nirmay's Forum!</h1> 
           {/* {console.log(typewriter.start)} */}
           {/* {typewriter.start} */}
           <div className={classes.type}>
           <Typewriter
            onInit= {(typewriter) =>{
                typewriter
                .pauseFor(500)
                .typeString('SHARE YOUR EXPERIENCES!')
                .pauseFor(300)
                .deleteChars(35)
                .typeString('CREATE <strong>THREADS</strong>! ')
                .pauseFor(300)
                .deleteChars(9)
                .typeString('<strong>POSTS</strong>! ')
                .pauseFor(600)
                .deleteChars(20)
                .typeString('PARTICIPATE IN <strong>DISCUSSIONS</strong>!')
                .pauseFor(1000)
                .start();
            }}
            options={{
                deleteSpeed: 4,
                loop:true
            }} />
           </div>
        {val && <Link to ="/threads" className={classes.threadLink} onClick={()=>{setVal(false)}}><h1 className = {classes.thread}>Go to Threads!</h1></Link>}
        {!val && <Link to ="/threads" className={classes.disableLink}><h1 className = {classes.thread}>Go to Threads!</h1></Link>}
        </div>
    )
}