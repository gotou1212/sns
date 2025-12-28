import Sidebar from "./components/Sidebar";
import Timeline from "./components/timeline/Timeline";
import Suggestion from "./components/Suggestion";
import './App.css'; 

const App = () => {
  return (
    <div className="zennbu">
      <Sidebar />
      <Timeline />
      <Suggestion />
    
    <div className ='sider-post-button'> 
    ポストする
    </div>

    <a href="/login">ログイン</a>
    <a href="/signup">登録</a>
    </div>
  );
}

export default App;
