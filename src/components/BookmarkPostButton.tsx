import React, { useState } from 'react'
import { CiBookmark } from "react-icons/ci";
export const BookmarkPostButton = () => {
    const [count,setCount] = useState(0);
  return (
    <div>
    <CiBookmark size={16}/>
    <span>{count}</span>
    </div>
  )
}