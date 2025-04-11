import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";
import Suggestion from "./components/Suggestion";
import './App.css'; 

const App = () => {
  return (
    <div className="zennbu">
      <Sidebar />
      <div className="timeline">
        <Timeline />
      </div>
      <div className="suggestion">
        <Suggestion/>
      </div>
    </div>
  );
};

export default App;
