function TaskItem({ task }) {
  return (
    <li className="task-item">
      <span>{task.title}</span>
      <span> - {task.priority}</span>
    </li>
  );
}

export default TaskItem;