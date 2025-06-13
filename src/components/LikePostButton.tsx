import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import './LikePostButton.css';



export const LikePostButton = () => {
  const [isLiked,setIsLiked] = useState (false);
  const [count,setCount] = useState (0);
  if (isLiked){
  return (
    <div>
   <FaRegHeart 
   size={16} 
   className="red-icon"
   onClick={() =>{
    setIsLiked(false)
   }}
   />
   <span>{count+1}</span>
   </div>
  )
}else{
  return (
    <div>
    <FaRegHeart size={16} 
    onClick={() => {
      setIsLiked(true);
    }}
    />
   <span>{count}</span>
   </div>
    )
  }
  
}
