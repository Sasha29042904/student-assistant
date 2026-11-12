import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { loadTasks, saveTasks } from "./storage/tasksFile";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function init() {
      try {
        setTasks(await loadTasks());
      } catch (err) {
        setLoadFailed(true);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // Спочатку запис у файл, і лише після успіху - оновлення екрана
  async function commit(updated) {
    try {
      await saveTasks(updated);
      setTasks(updated);
      setError("");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  function handleToggle(id) {
    if (loadFailed) return;
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    commit(updated);
  }

  function handleAdd(values) {
    if (loadFailed) return false;
    const ids = tasks.map((task) => task.id);
    const maxId = Math.max(0, ...ids);
    const newTask = {
      id: maxId + 1,
      title: values.title,
      completed: false,
      dueDate: values.dueDate,
      priority: values.priority,
    };
    return commit([...tasks, newTask]);
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <h1>Student Assistant</h1>
      {error && <p className="error-banner">{error}</p>}
      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <>
          <p className="task-counter">
            Виконано: {completedCount} з {tasks.length}
          </p>
          <TaskForm onAdd={handleAdd} disabled={loadFailed} />
          <TaskList tasks={tasks} onToggle={handleToggle} />
        </>
      )}
    </div>
  );
}

export default App;