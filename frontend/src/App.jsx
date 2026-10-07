import Header from "./components/Header";
import TaskList from "./components/TaskList";
import tasksData from "./tasks.json";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header taskCount={tasksData.length} />
      <main>
        <TaskList tasks={tasksData} />
      </main>
    </div>
  );
}

export default App;