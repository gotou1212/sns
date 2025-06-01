import React from 'react'
import { LikePostButton } from './LikePostButton';
export const PostCard = () => {
  return (
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
           <LikePostButton />
            </div>
            <div className="4">
            <button>4</button>
            </div>
           </div>
           <div className="right">
            <div className="button5">
            <button>5</button>
            </div>
            <div className="6">
            <button>6</button>
            </div>
           </div>
          </div>
        </div>
      </div> 
  )
}
