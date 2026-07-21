import React from 'react'
import { LikePostButton } from '../LikePostButton';
import { MessageButton } from '../MessageButton';
import { RetweetButton } from '../RetweetButton';
import { NumberOfViewsButton } from '../NumberOfViewsButton';
import { ShareButton } from '../ShareButton';
import { BookmarkPostButton } from '../BookmarkPostButton';
import { Link } from 'react-router';

interface props {
  id: number;
  authorName?: string;
  authorId?: number | string | null;
  content: string;
  onDelete: (id: number) => void;
}

export const PostCard = ({
  id,
  authorName = 'Unknown User',
  authorId = null,
  content,
  onDelete
} : props) => {
  const createFallbackHandle = (source: string) => {
    let hash = 0;

    for (let index = 0; index < source.length; index += 1) {
      hash = (hash * 31 + source.charCodeAt(index)) % 10000;
    }

    return String(Math.abs(hash)).padStart(4, '0');
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/posts/${id}`,{
      method: "DELETE",
    });
    if (res.ok)(
    onDelete(id)
    )
  }

  const displayAuthorId = authorId ?? createFallbackHandle(authorName);
  
  return (
    <div className="post-card">
      <div className="post-icon-area">
        <Link
          to={`/profile?authorName=${encodeURIComponent(authorName)}&authorId=${encodeURIComponent(displayAuthorId)}`}
          aria-label={`${authorName} のプロフィールを開く`}
        >
          <div className="post-icon" />
        </Link>
      </div>

      <div className="post-content-area">
        <div className="post-content-header">
          <div className="post-content-header-left">
            <div className="post-content-header-username">{authorName}</div>
            <div className="post-content-header-id">@{displayAuthorId}</div>
          </div>
          <div className="post-content-header-right">
            <div className="" onClick={handleDelete}>・・・</div>
          </div>
        </div>
        <div className="post-content-main">
          {content}
        </div>
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
  )};