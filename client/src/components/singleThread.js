import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import {Link} from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  root: {
    width: "70vw",
    boxShadow: "10px 10px 8px rgba(0,0,0,0.5)",
    position:"relative",
    margin:"auto",
    height:"25vh",
    [theme.breakpoints.down('md')]: {
      width:"80vw"
    },
    [theme.breakpoints.down('sm')]: {
      width:"90vw"
    }
  },
  media: {
    height: "15vh",
    width:"15vw",
    position:"absolute",
    left:"2.5vw",
    top:"2.5vh"
  },
  content:{
    position:"absolute",
    left:"20vw",
    top:"2.5vh",
    [theme.breakpoints.down('md')]: {
      left:"30px",
      width:"80vw",
      "& h4":{
        fontSize:"30px"
      }
    },
    [theme.breakpoints.down('sm')]: {
      width:"90vw",
      left:"35px",
      "& h4":{
        fontSize:"30px"
      }
    }
  },
  disableLink:{
    pointerEvents:"none"
  }
}));

export default function SingleThread(props) {
  const classes = useStyles();
  const [val, setVal] = React.useState(true)
  return (
    <>
    <Card className={classes.root}>
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/abroad1.jpg"
          title="Abroad"
        /> */}
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h4" >
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* <ValidatorForm onSubmit={handleAddColor} >
                <TextValidator value={inputColor} onChange={handleIC} validators={["required", "isColorUnique", "isColorNameUnique"]} errorMessages={["This field is required","Colour already used!", "Colour name taken!"]}/>  
                <Button variant='contained' style={{backgroundColor:currentColor}} type='submit'>Add Colour</Button>
            </ValidatorForm> */}
            Started by {props.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
    )
  };

