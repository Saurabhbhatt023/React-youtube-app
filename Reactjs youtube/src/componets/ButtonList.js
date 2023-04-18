import React from 'react'
import Button from './Button'

const ButtonList = () => {

      const list = ["All" , "Live" , "Maps" , "football" , "React" , "Javascript"]
  return (
    <div className =" flex">
 
        
     {list.map((li , i) => <Button key= {i} name={li}/>)}
    </div>
  )
}

export default ButtonList