import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
    foot:{
        height:"4vh",
        width:"100vw",
        position:"absolute",
        bottom:"0px",
        background:"#3f51b5",
        // background:"rgb(0,0,0,0)",
        display:"flex",
        color:"white",
        letterSpacing:"1px",
        justifyContent:"space-between",
        paddingTop:"2vh",
        // marginTop:"5vh !important",
        zIndex:110,
    }   
}
function footer(props) {
    return (
        <footer className = {props.classes.foot}>
            <span>Social Media</span>
            <span>Made by Nirmay &copy; 2021</span>
        </footer>
    )
}

export default withStyles(styles)(footer)