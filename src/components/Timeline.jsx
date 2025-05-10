import './Timeline.css'

export const Timeline = () => {
    return(
        <div className="kakoi1">
          <div className="timeline">timeline</div>
          <div className="kakoi2">
            <div className="box">
            <input type="text" className="text" placeholder="今どうしてる？" />
            <button className="button">投稿</button>
            </div>
          </div>
          
        </div>
    );
}

export default Timeline;