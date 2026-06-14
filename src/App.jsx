import Sidebar from "./components/Sidebar";
import Timeline from "./components/timeline/Timeline";
import Suggestion from "./components/Suggestion";
import PostModal from "./components/PostModal";
import './App.css'; 

const App = () => {
  return (
    <div className="zennbu">
      <Sidebar />
      <Timeline />
      <Suggestion />
      <PostModal />
    
    </div>
  );
}

export default App;
