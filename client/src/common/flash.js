import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function Flash(props) {
console.log(props)
//   const [open, setOpen] = React.useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleSubmit = () => {
//     props.submitAction(props.value); 
//     props.history.push('/threads')
//     setOpen(false);
//   }
  return (
    <div>
        {/* <FlashMessage duration={5000} persistOnHover={true} onClose={true}>
          <p>Successfully {props.actionName} {props.name}</p>
        </FlashMessage>; */}
        {console.log(props)}
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false}/>
        {setTimeout(() => {props.setShow(false)}, 3000)}
    </div>
  );
}
