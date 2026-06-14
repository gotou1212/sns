import './Timeline.css'
import { PostCard } from './PostCard';
import { useState,useEffect} from 'react';
import { usePostModal } from '../../contexts/PostModalContext';
export const Timeline = () => {
  const[posts,setPosts] =useState([])
  const { postVersion } = usePostModal();

  useEffect(() => {
    const init = async () => {
      const res = await fetch("http://localhost:3000/posts/");  //GET method
      const data =await res.json();
      console.log(data)
      setPosts(data);
    }

    init();
  },[postVersion])
    return(
        <div className="kakoi1">
          <div className="timeline">timeline</div>

         {posts.map((post,index) => (
          <PostCard 
          key={index} 
          content={post.content}
          />
         ))}

     

      
      </div>

      
    );
}

export default Timeline;