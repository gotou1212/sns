import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext';
import './LikePostButton.css';



interface LikePostButtonProps {
  postId: number;
}

export const LikePostButton = ({ postId }: LikePostButtonProps) => {
  const { token } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadLikeSummary = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}/like-summary`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const summary = await response.json();
        setIsLiked(Boolean(summary.isLiked));
        setCount(Number(summary.likesCount) || 0);
      } catch (error) {
        const isAbortError = typeof error === 'object'
          && error !== null
          && 'name' in error
          && error.name === 'AbortError';
        if (!isAbortError) {
          console.error('いいね情報を取得できませんでした。', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadLikeSummary();
    return () => controller.abort();
  }, [postId, token]);

  const handleToggleLike = async () => {
    if (!token || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return;
      }

      const result = await response.json();
      setIsLiked(Boolean(result.isLiked));
      setCount(Number(result.likesCount) || 0);
    } catch (error) {
      console.error('いいねを更新できませんでした。', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="like-post-button"
        aria-label={isLiked ? 'いいねを取り消す' : 'いいねする'}
        aria-pressed={isLiked}
        disabled={!token || isLoading}
        onClick={handleToggleLike}
      >
        {isLiked
          ? <FaHeart size={16} className="red-icon" />
          : <FaRegHeart size={16} />}
      </button>
      <span>{count}</span>
    </div>
  );
}
