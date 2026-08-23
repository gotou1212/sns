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

type FollowSummary = {
  userId: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
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

const getNormalizedId = (value: number | string | null | undefined) =>
  value === null || value === undefined ? null : String(value);

const ProfilePage = () => {
  const { currentUserId, token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileError, setProfileError] = useState('');
  const [followSummary, setFollowSummary] = useState<FollowSummary | null>(null);
  const [isFollowPending, setIsFollowPending] = useState(false);
  const [followError, setFollowError] = useState('');
  const [searchParams] = useSearchParams();
  const authorIdParam = searchParams.get('authorId');
  const effectiveAuthorIdParam = authorIdParam ?? currentUserId;
  const authorId = effectiveAuthorIdParam ? Number(effectiveAuthorIdParam) : NaN;
  const hasValidAuthorId = Number.isInteger(authorId) && authorId > 0;
  const isSelfProfile = Boolean(currentUserId) && hasValidAuthorId && getNormalizedId(currentUserId) === String(authorId);
  const canShowFollowButton = Boolean(token) && hasValidAuthorId && !isSelfProfile;

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

  useEffect(() => {
    if (!canShowFollowButton) {
      setFollowSummary(null);
      setFollowError('');
      return;
    }

    const fetchFollowSummary = async () => {
      try {
        setFollowError('');
        const res = await fetch(`${API_BASE_URL}/users/${authorId}/follow-summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setFollowSummary(null);
          return;
        }

        const data = await res.json();
        setFollowSummary({
          userId: Number(data.userId ?? authorId),
          followersCount: Number(data.followersCount ?? 0),
          followingCount: Number(data.followingCount ?? 0),
          isFollowing: Boolean(data.isFollowing),
        });
      } catch {
        setFollowSummary(null);
      }
    };

    fetchFollowSummary();
  }, [authorId, canShowFollowButton, token]);

  const handleFollowToggle = async () => {
    if (!canShowFollowButton || !authorId || !token) {
      return;
    }

    const previousSummary = followSummary;
    const nextIsFollowing = !(previousSummary?.isFollowing ?? false);
    const optimisticCount = previousSummary ? previousSummary.followersCount : 0;

    setIsFollowPending(true);
    setFollowError('');

    setFollowSummary((current) => (current
      ? {
          ...current,
          isFollowing: nextIsFollowing,
          followersCount: Math.max(0, current.followersCount + (nextIsFollowing ? 1 : -1)),
        }
      : {
          userId: authorId,
          followersCount: nextIsFollowing ? 1 : 0,
          followingCount: 0,
          isFollowing: nextIsFollowing,
        }
    ));

    try {
      const res = await fetch(`${API_BASE_URL}/users/${authorId}/follow`, {
        method: nextIsFollowing ? 'POST' : 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFollowSummary(previousSummary);
        setFollowError(payload?.error ?? 'フォロー状態の更新に失敗しました。');
        return;
      }

      setFollowSummary((current) => ({
        userId: authorId,
        followersCount: Number(payload.followersCount ?? current?.followersCount ?? optimisticCount),
        followingCount: Number(payload.followingCount ?? current?.followingCount ?? 0),
        isFollowing: Boolean(payload.isFollowing ?? nextIsFollowing),
      }));
    } catch {
      setFollowSummary(previousSummary);
      setFollowError('サーバーに接続できませんでした。');
    } finally {
      setIsFollowPending(false);
    }
  };

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

        <div className="profile-header-row">
          <div className="profile-stats">
            <span><strong>{visiblePosts.length}</strong> 投稿</span>
            <span><strong>{followSummary?.followersCount ?? 0}</strong> フォロワー</span>
            <span><strong>{followSummary?.followingCount ?? 0}</strong> フォロー中</span>
          </div>

          {canShowFollowButton ? (
            <button
              type="button"
              className={followSummary?.isFollowing ? 'profile-follow-button is-following' : 'profile-follow-button'}
              onClick={handleFollowToggle}
              disabled={isFollowPending}
            >
              {isFollowPending ? '処理中...' : (followSummary?.isFollowing ? 'フォロー中' : 'フォローする')}
            </button>
          ) : null}
        </div>
      </div>

      {profileError ? <p>{profileError}</p> : null}
      {followError ? <p className="profile-follow-error">{followError}</p> : null}

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
