import { useEffect, useState } from 'react';
import { PostCard } from '../components/timeline/PostCard';
import './ProfilePage.css';

const API_BASE_URL = 'http://localhost:3000';

type Post = {
  id: number;
  content: string;
};

const ProfilePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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

  return (
    <div className="profile-page">
      <div className="profile-cover" />

      <div className="profile-header">
        <div className="profile-avatar" />
        <div className="profile-info">
          <div className="profile-username">Username</div>
          <div className="profile-id">@ID</div>
        </div>
        <div className="profile-stats">
          <span><strong>{posts.length}</strong> 投稿</span>
        </div>
      </div>

      <div className="profile-tabs">
        <div className="profile-tab active">投稿</div>
      </div>

      <div className="profile-posts">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            content={post.content}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
