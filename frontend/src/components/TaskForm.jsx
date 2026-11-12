import { useState } from "react";
import { validateTask } from "../validation";

function TaskForm({ onAdd, disabled }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [errors, setErrors] = useState({});

  const on = (setter) => (e) => setter(e.target.value);
  const error = (name) =>
    errors[name] && <p className="field-error">{errors[name]}</p>;

  async function handleSubmit(event) {
    event.preventDefault();
    const result = validateTask({ title, dueDate, priority });
    setErrors(result.errors);
    if (!result.valid) return;

    const saved = await onAdd(result.values);
    if (saved) {
      setTitle("");
      setDueDate("");
      setPriority("medium");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label>
        Назва
        <input value={title} onChange={on(setTitle)} />
      </label>
      {error("title")}

      <label>
        Термін виконання
        <input
          value={dueDate}
          placeholder="РРРР-ММ-ДД"
          onChange={on(setDueDate)}
        />
      </label>
      {error("dueDate")}

      <label>
        Пріоритет
        <select value={priority} onChange={on(setPriority)}>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </label>
      {error("priority")}

      <button type="submit" disabled={disabled}>
        Додати завдання
      </button>
    </form>
  );
}

export default TaskForm;