import { useState } from 'react';
import { usePostModal } from '../contexts/PostModalContext';
import { useAuth } from '../contexts/AuthContext';
import './PostModal.css';

const API_BASE_URL = 'http://localhost:3000';

const PostModal = () => {
  const { isOpen, closeModal, notifyPosted } = usePostModal();
  const { isLoggedIn, token } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }
    setContent('');
    setError('');
    closeModal();
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('投稿内容を入力してください。');
      return;
    }

    try {
      if (!token) {
        setError('認証情報がありません。再ログインしてください。');
        return;
      }

      setIsSubmitting(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: content.trim(), title: 'dummy' }),
      });

      if (!response.ok) {
        setError('投稿に失敗しました。');
        return;
      }

      notifyPosted();
      handleClose();
    } catch {
      setError('サーバーに接続できませんでした。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !isLoggedIn) {
    return null;
  }

  return (
    <div className="post-modal-overlay" onClick={handleClose}>
      <div className="post-modal" onClick={(event) => event.stopPropagation()}>
        <div className="post-modal-header">
          <h2>投稿を作成</h2>
          <button type="button" className="post-modal-close" onClick={handleClose}>
            x
          </button>
        </div>

        <textarea
          className="post-modal-textarea"
          placeholder="今どうしてる？"
          rows={6}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={100}
        />

        {error ? <p className="post-modal-error">{error}</p> : null}

        <div className="post-modal-actions">
          <button type="button" className="post-modal-cancel" onClick={handleClose}>
            キャンセル
          </button>
          <button
            type="button"
            className="post-modal-submit"
            disabled={isSubmitting || !content.trim()}
            onClick={handleSubmit}
          >
            {isSubmitting ? '送信中...' : '投稿'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
