import './Timeline.css'
import { PostForm } from './PostForm';
import { PostCard } from './PostCard';
import {useState} from 'react';
export const Timeline = () => {
  const[posts,setPosts] =useState([])
    return(
        <div className="kakoi1">
          <div className="timeline">timeline</div>

         <PostForm 
        onSubmit ={(post) => {
          setPosts([post, ...posts]);
         }}
         />

         {posts.map((post,index) => (
          <PostCard key={index} />
         ))}

     

      
      </div>

      
    );
}

export default Timeline;