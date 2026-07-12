import Sidebar from "./components/Sidebar";
import ProfilePage from "./pages/ProfilePage";
import Suggestion from "./components/Suggestion";
import PostModal from "./components/PostModal";
import './App.css';

const ProfileApp = () => {
  return (
    <div className="zennbu">
      <Sidebar />
      <ProfilePage />
      <Suggestion />
      <PostModal />
    </div>
  );
};

export default ProfileApp;
