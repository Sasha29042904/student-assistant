export const PRIORITIES = ["low", "medium", "high"];

export function isRealDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function validateTask(input) {
  const errors = {};
  const title = (input.title ?? "").trim();

  if (title.length === 0) {
    errors.title = "Введіть назву завдання.";
  } else if (title.length < 3) {
    errors.title = "Назва має містити щонайменше 3 символи.";
  } else if (title.length > 100) {
    errors.title = "Назва не може бути довшою за 100 символів.";
  }

  const dueDate = (input.dueDate ?? "").trim();
  if (dueDate.length === 0) {
    errors.dueDate = "Вкажіть термін виконання.";
  } else if (!isRealDate(dueDate)) {
    errors.dueDate = "Вкажіть існуючу дату у форматі РРРР-ММ-ДД.";
  } else {
    // Індивідуальне завдання: перевірка, чи дата не в минулому
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    if (dueDate < todayStr) {
      errors.dueDate = "Термін виконання не може бути в минулому.";
    }
  }

  if (!PRIORITIES.includes(input.priority)) {
    errors.priority = "Виберіть пріоритет зі списку.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: { title, dueDate, priority: input.priority },
  };
}