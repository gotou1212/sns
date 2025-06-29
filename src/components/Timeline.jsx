import './Timeline.css'
import { PostForm } from './PostForm';
import { PostCard } from './PostCard';
import {useState} from 'react';
export const Timeline = () => {
  const[posts,setPosts] =useState([])
    return(
        <div className="kakoi1">
          <div className="timeline">timeline</div>

          <button
             onClick={() => {
               setPosts([
                  ...posts,
                  {
                    content: "Test post"
                  }
               ])
             }}
             >
              追加</button>
         <PostForm />
         <PostCard />

         <div>{posts?.length}</div>
      </div>

      
    );
}

export default Timeline;