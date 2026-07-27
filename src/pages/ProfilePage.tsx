import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PostCard } from '../components/timeline/PostCard';
import { useAuth } from '../contexts/AuthContext';
import './ProfilePage.css';

const API_BASE_URL = 'http://localhost:3000';

type Post = {
  id: number;
  content: string;
  username?: string;
  user_id?: number | string | null;
  authorId?: number | string | null;
  userId?: number | string | null;
  author?: {
    id?: number | string | null;
    username?: string;
    name?: string;
  };
  user?: {
    id?: number | string | null;
    username?: string;
    name?: string;
  };
};

type UserProfile = {
  id: number;
  username?: string;
  name?: string;
};

const getPostAuthorName = (post: Post) => (
  post?.username
  ?? post?.user?.username
  ?? post?.user?.name
  ?? post?.author?.username
  ?? post?.author?.name
  ?? 'Unknown User'
);

const getPostAuthorId = (post: Post) => (
  post?.user_id
  ?? post?.userId
  ?? post?.authorId
  ?? post?.user?.id
  ?? post?.author?.id
  ?? null
);

const ProfilePage = () => {
  const { currentUserId } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileError, setProfileError] = useState('');
  const [searchParams] = useSearchParams();
  const authorIdParam = searchParams.get('authorId');
  const effectiveAuthorIdParam = authorIdParam ?? currentUserId;
  const authorId = effectiveAuthorIdParam ? Number(effectiveAuthorIdParam) : NaN;
  const hasValidAuthorId = Number.isInteger(authorId) && authorId > 0;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/posts/`);
        const data = await res.json();
        setPosts(data);
      } catch {
        // fetch失敗時はそのまま空表示
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!hasValidAuthorId) {
      setProfile(null);
      setProfileError('');
      return;
    }

    const fetchUser = async () => {
      try {
        setProfileError('');
        const res = await fetch(`${API_BASE_URL}/users/${authorId}`);

        if (!res.ok) {
          if (res.status === 404) {
            setProfileError('ユーザーが見つかりません。');
          } else if (res.status === 400) {
            setProfileError('ユーザーIDが不正です。');
          } else {
            setProfileError('ユーザー情報の取得に失敗しました。');
          }
          setProfile(null);
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch {
        setProfile(null);
        setProfileError('サーバーに接続できませんでした。');
      }
    };

    fetchUser();
  }, [authorId, hasValidAuthorId]);

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const displayAuthorName = profile?.username ?? profile?.name ?? 'Unknown User';
  const displayAuthorId = profile?.id ? String(profile.id) : (effectiveAuthorIdParam ?? 'ID');

  const visiblePosts = posts.filter((post) => {
    const postAuthorId = getPostAuthorId(post);
    if (hasValidAuthorId && postAuthorId !== null && String(postAuthorId) === String(authorId)) {
      return true;
    }

    return getPostAuthorName(post) === displayAuthorName;
  });

  return (
    <div className="profile-page">
      <div className="profile-cover" />

      <div className="profile-header">
        <div className="profile-avatar" />
        <div className="profile-info">
          <div className="profile-username">{displayAuthorName}</div>
          <div className="profile-id">@{displayAuthorId}</div>
        </div>
        <div className="profile-stats">
          <span><strong>{visiblePosts.length}</strong> 投稿</span>
        </div>
      </div>

      {profileError ? <p>{profileError}</p> : null}

      <div className="profile-tabs">
        <div className="profile-tab active">投稿</div>
      </div>

      <div className="profile-posts">
        {visiblePosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            authorName={getPostAuthorName(post)}
            authorId={getPostAuthorId(post)}
            content={post.content}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
