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
          <div className="post-card">
        <div className="post-icon-area">
          <div className="post-icon"></div>
        </div>

        <div className="post-content-area">
          <div className="post-content-header">
            <div className="post-content-header-left">
              <div className="post-content-header-username">Username</div>
              <div className="post-content-header-id">@ID</div>
              <div className="post-content-header-time">14時間</div>
            </div>
            <div className="post-content-header-right">
              <div className="">・・・</div>
            </div>
          </div>
          <div className="post-content-main">main</div>
          <div className="post-content-image">image</div>
          <div className="post-content-buttons">
           <div className="left">
            <div className="koko">
              <button>1</button>
            </div>
            <div className="2">
            <button>2</button>
            </div>
            <div className="3">
            <button>3</button>
            </div>
            <div className="4">
            <button>4</button>
            </div>
           </div>
           <div className="right">
            <div classNAme="button5">
            <button>5</button>
            </div>
            <div className="6">
            <button>6</button>
            </div>
           </div>
          </div>
        </div>
      </div>  
      </div>

      
    );
}

export default Timeline;