import React from 'react'
import { LikePostButton } from '../LikePostButton';
import { MessageButton } from '../MessageButton';
import { RetweetButton } from '../RetweetButton';
import { NumberOfViewsButton } from '../NumberOfViewsButton';
import { ShareButton } from '../ShareButton';
import { BookmarkPostButton } from '../BookmarkPostButton';
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
              <MessageButton />
            </div>
            <div className="2">
              <RetweetButton />
            </div>
            <div className="3">
              <LikePostButton />
            </div>
            <div className="4">
              <NumberOfViewsButton />
            </div>
          </div>
          <div className="right">
            <div className="button5">
              <BookmarkPostButton />
            </div>
            <div className="6">
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
