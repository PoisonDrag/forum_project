import React from 'react'

export default function timeout(setVal) {
    setVal(false)
    console.log("Started")
    setTimeout(()=>{
        console.log("Ended")
        setVal(true) 
    }, 500)
    // return (
    //     <div>
            
    //     </div>
    // )
}
