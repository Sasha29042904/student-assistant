import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}

export default TaskList;