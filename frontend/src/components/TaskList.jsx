import TaskItem from "./TaskItem";

function TaskList({ tasks }) {
  if (!tasks || !Array.isArray(tasks)) {
    return <p>Завантаження завдань...</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;