import './Timeline.css'
import { PostCard } from './PostCard';
import { useState,useEffect} from 'react';
import { PostForm } from './PostForm';
import { usePostModal } from '../../contexts/PostModalContext';
import { useAuth } from '../../contexts/AuthContext';

const FEED_TABS = [
  { key: 'recommended', label: 'おすすめ' },
  { key: 'following', label: 'フォロー中' },
];

const getFollowingState = (post) => {
  const candidates = [
    post?.isFollowing,
    post?.author?.isFollowing,
    post?.user?.isFollowing,
    post?.author?.followedByViewer,
    post?.user?.followedByViewer,
    post?.relationship?.isFollowing,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'boolean') {
      return candidate;
    }
  }

  return null;
};

const getPostAuthorName = (post) => (
  post?.username
  ?? post?.user?.username
  ?? post?.user?.name
  ?? post?.author?.username
  ?? post?.author?.name
  ?? 'Unknown User'
);

const getPostAuthorId = (post) => (
  post?.user_id
  ?? post?.userId
  ?? post?.authorId
  ?? post?.user?.id
  ?? post?.author?.id
  ?? null
);

export const Timeline = () => {
  const[posts,setPosts] =useState([])
  const { postVersion, notifyPosted } = usePostModal();
  const { isLoggedIn, token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [activeFeed, setActiveFeed] = useState('recommended');

  useEffect(() => {
    const init = async () => {
      const res = await fetch("http://localhost:3000/posts/");  //GET method
      const data =await res.json();
      console.log(data)
      setPosts(data);
    }

    init();
  },[postVersion])

  const handleCreatePost = async ({ content, title }) => {
    if (!token) {
      setFormError('認証情報がありません。再ログインしてください。');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError('');

      const response = await fetch('http://localhost:3000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: content.trim(), title }),
      });

      if (!response.ok) {
        setFormError('投稿に失敗しました。');
        return;
      }

      notifyPosted();
      setFormKey((prev) => prev + 1);
    } catch {
      setFormError('サーバーに接続できませんでした。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
  };

  const hasFollowingMetadata = posts.some((post) => getFollowingState(post) !== null);
  const visiblePosts = activeFeed === 'following'
    ? posts.filter((post) => getFollowingState(post) === true)
    : posts;

  const emptyMessage = activeFeed === 'following'
    ? hasFollowingMetadata
      ? 'フォロー中のユーザーの投稿はまだありません。'
      : 'フォロー中タブの判定に必要なユーザー情報が投稿データにまだ含まれていません。'
    : '表示できる投稿がありません。';

    return(
        <div className="kakoi1">
          <div className="timeline">timeline</div>

          {isLoggedIn ? <PostForm key={formKey} onSubmit={handleCreatePost} /> : null}
          {isLoggedIn && formError ? <p>{formError}</p> : null}
          {isLoggedIn && isSubmitting ? <p>送信中...</p> : null}

          <div className="feed-toggle" role="tablist" aria-label="投稿一覧の切り替え">
            {FEED_TABS.map((tab) => {
              const isActive = activeFeed === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={isActive ? 'feed-toggle-button is-active' : 'feed-toggle-button'}
                  onClick={() => setActiveFeed(tab.key)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

         {visiblePosts.length > 0 ? visiblePosts.map((post, index) => (
          <PostCard 
          key={post.id ?? index}
          id={post.id}
          authorName={getPostAuthorName(post)}
          authorId={getPostAuthorId(post)}
          content={post.content}
          onDelete={handleDeletePost}
          />
         )) : <p className="timeline-empty-message">{emptyMessage}</p>}

     

      
      </div>

      
    );
}

export default Timeline;