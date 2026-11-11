import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import { loadTasks, saveTasks } from "./storage/tasksFile";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  function handleToggle(id) {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updated);
    saveTasks(updated);
  }

  // Обчислення кількості виконаних завдань (Індивідуальне завдання)
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <h1>Student Assistant</h1>
      <p className="task-counter">
        Виконано: {completedCount} з {tasks.length}
      </p>
      <TaskList tasks={tasks} onToggle={handleToggle} />
    </div>
  );
}

export default App;