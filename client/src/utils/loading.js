import React from 'react'
import RingLoader from 'react-spinners/RingLoader'
import { makeStyles } from '@material-ui/core/styles';

// import { css } from "@emotion/react";

const useStyles = makeStyles(theme => ({
  load:{
    // backgroundColor:"black",
    height:"90vh",
    width:"100%",
    position:"relative",
    // backgroundColor:"rgba(0,0,0,0.1)",
    overflowY:"auto",
    background:"cover",
    color:"white",
    // fontSize:"5vw",
    // textAlign:"center",
    // justifyContent:"center",
    // alignItems:"center",
    // paddingTop:"25vh",
    // paddingLeft:"40vw"
    // left:"45vw",
  },
  loader:{
      position:"relative",
      margin:"25vh 45vw",
      [theme.breakpoints.down('md')]: {
      margin:"25vh 40vw"
    },
      [theme.breakpoints.down('sm')]: {
      margin:"25vh 30vw"
    },
  }
}))
export default function Loading() {
    const classes = useStyles();
    return (
        <div className={classes.load}>
            <div className={classes.loader}>
            <RingLoader color={"#FFFFFF"} size={150} loading={true} css={""} speedMultiplier={1.5}/>
            </div>
        </div>
    )
}
