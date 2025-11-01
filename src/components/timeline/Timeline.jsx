import './Timeline.css'
import { PostForm } from './PostForm';
import { PostCard } from './PostCard';
import { useState,useEffect} from 'react';
import { API_URL}  from '../../constants';
export const Timeline = () => {
  const[posts,setPosts] =useState([])

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`${API_URL}/posts`);  //GET method
      const data =await res.json();
      console.log(data)
      setPosts(data);
    }

    init();
  },[])
  return(
    <div className="kakoi1">
      <div className="timeline">timeline</div>

      <PostForm 
        onSubmit ={async(post) => {

          const res = await fetch(
            `${API_URL}/posts`,
            "http://localhost:3000/posts/",
            { method: "POST",body: JSON.stringify(post),headers: { "Content-type": "application/json"}}
          );
          setPosts([post, ...posts]);
        }}
      />

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