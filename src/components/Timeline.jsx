import './Timeline.css'
import { PostForm } from './PostForm';
import { PostCard } from './PostCard';
export const Timeline = () => {
    return(
        <div className="kakoi1">
          <div className="timeline">timeline</div>

         <PostForm />
         <PostCard />
      </div>

      
    );
}

export default Timeline;