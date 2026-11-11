function TaskItem({ task, onToggle }) {
  const cls = `task-card priority-${task.priority}`;
  return (
    <li className={cls + (task.completed ? " completed" : "")}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.title}</span>
      <span> - {task.priority}</span>
    </li>
  );
}

export default TaskItem;