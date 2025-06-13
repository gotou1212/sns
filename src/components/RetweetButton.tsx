import React, { useState } from 'react'
import { AiOutlineRetweet } from "react-icons/ai";
export const RetweetButton = () => {
    const [count,setCount] = useState(0);
  return (
    <div>
   <AiOutlineRetweet size={16}/>
    <span>{count}</span>
    </div>
  )
}