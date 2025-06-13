import React, { useState } from 'react'
import { BiMessageRounded } from "react-icons/bi";
export const MessageButton = () => {
    const [count,setCount] = useState(0);
  return (
    <div>
    <BiMessageRounded size={16}/>
    <span>{count}</span>
    </div>
  )
}