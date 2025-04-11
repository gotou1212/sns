import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";
import Suggestion from "./components/Suggestion";
import './App.css'; 

const App = () => {
  return (
    <div className="zennbu">
      <Sidebar />
      <Timeline />
      <Suggestion />
    </div>
  );
};

export default App;
