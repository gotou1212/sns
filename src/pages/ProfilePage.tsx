import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PostCard } from '../components/timeline/PostCard';
import './ProfilePage.css';

const API_BASE_URL = 'http://localhost:3000';

type Post = {
  id: number;
  content: string;
  username?: string;
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

const getPostAuthorName = (post: Post) => (
  post?.username
  ?? post?.user?.username
  ?? post?.user?.name
  ?? post?.author?.username
  ?? post?.author?.name
  ?? 'Unknown User'
);

const getPostAuthorId = (post: Post) => (
  post?.userId
  ?? post?.authorId
  ?? post?.user?.id
  ?? post?.author?.id
  ?? null
);

const ProfilePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams] = useSearchParams();
  const authorName = searchParams.get('authorName') ?? 'Username';
  const authorId = searchParams.get('authorId') ?? 'ID';

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

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const visiblePosts = posts.filter((post) => {
    const postAuthorId = getPostAuthorId(post);
    if (postAuthorId !== null && String(postAuthorId) === authorId) {
      return true;
    }

    return getPostAuthorName(post) === authorName;
  });

  return (
    <div className="profile-page">
      <div className="profile-cover" />

      <div className="profile-header">
        <div className="profile-avatar" />
        <div className="profile-info">
          <div className="profile-username">{authorName}</div>
          <div className="profile-id">@{authorId}</div>
        </div>
        <div className="profile-stats">
          <span><strong>{posts.length}</strong> 投稿</span>
        </div>
      </div>

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
