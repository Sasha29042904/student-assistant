import styled from "styled-components";

// Альтернативна картка для демонстрації Styled Components (Крок 7)
const StyledCard = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  margin-bottom: 12px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  list-style: none;
  border-left: 5px solid
    ${(props) =>
      props.$priority === "high"
        ? "#e63946"
        : props.$priority === "medium"
        ? "#f4a261"
        : "#2a9d8f"};
`;

function TaskItem({ task }) {
  if (!task) return null;

  const isCompleted = task.completed ? "completed" : "";
  const cardClassName = `task-card priority-${task.priority} ${isCompleted}`.trim();

  return (
    <li className={cardClassName}>
      <span className="task-title">{task.title}</span>
      <span className="task-priority">{task.priority}</span>
    </li>
  );
}

export default TaskItem;