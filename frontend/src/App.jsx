import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import StorageStatus from "./components/StorageStatus";
import { ensureTasksFile } from "./storage/ensureTasksFile";
import initialTasks from "./tasks.json";
import "./App.css";

function App() {
  const [tasks] = useState(initialTasks);
  const [storage, setStorage] = useState(null);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const result = await ensureTasksFile();
        setStorage(result);
      } catch (err) {
        setStorageError(err.message);
      }
    }
    init();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <StorageStatus info={storage} error={storageError} />
      <main>
        <TaskList tasks={tasks} />
      </main>
    </div>
  );
}

export default App;