import React, { useState } from 'react'
import { FiShare } from "react-icons/fi";
export const ShareButton = () => {
    const [count,setCount] = useState(0);
  return (
    <div>
   <FiShare size={16}/>
    <span>{count}</span>
    </div>
  )
}