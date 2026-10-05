import TaskList from "./components/TaskList";
import tasksData from "./tasks.json";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Student Assistant</h1>
      <TaskList tasks={tasksData} />
    </div>
  );
}

export default App;