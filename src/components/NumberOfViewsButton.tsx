import React, { useState } from 'react'
import { VscGraph } from "react-icons/vsc";
export const NumberOfViewsButton = () => {
    const [count,setCount] = useState(0);
  return (
    <div>
    <VscGraph size={16}/>
    <span>{count}</span>
    </div>
  )
}