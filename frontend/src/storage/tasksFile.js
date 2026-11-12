import bundledTasks from "../tasks.json";
import {
  ensureTasksFile,
  getNode,
  getDataPath,
} from "./ensureTasksFile";

export class TasksFileError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "TasksFileError";
    this.cause = cause;
  }
}

// Перетворює системну помилку на зрозуміле повідомлення
function toFriendlyError(err, action) {
  let message = "Не вдалося " + action + " файл tasks.json";
  if (err instanceof SyntaxError) {
    message =
      "Файл tasks.json пошкоджено (помилка JSON). Перевірте " +
      "коми, лапки та маркери конфлікту <<<<<<<.";
  } else if (err.code === "EACCES" || err.code === "EPERM") {
    message = "Немає дозволу, щоб " + action + " файл tasks.json.";
  } else if (err.code) {
    message += " (" + err.code + ").";
  }
  if (!message.endsWith(".")) message += ".";
  return new TasksFileError(message, err);
}

export async function loadTasks() {
  const node = getNode();
  if (!node) return bundledTasks;

  const filePath = getDataPath(node);
  try {
    await ensureTasksFile(); // створює файл, якщо його немає
    const text = await node.fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(text);
    if (!Array.isArray(data)) {
      throw new TasksFileError("Файл tasks.json має містити масив.");
    }
    return data;
  } catch (err) {
    if (err instanceof TasksFileError) throw err;
    throw toFriendlyError(err, "прочитати");
  }
}

export async function saveTasks(tasks) {
  const node = getNode();
  if (!node) return;

  const filePath = getDataPath(node);
  try {
    const dir = node.path.dirname(filePath);
    await node.fs.promises.mkdir(dir, { recursive: true });
    const text = JSON.stringify(tasks, null, 2) + "\n";
    await node.fs.promises.writeFile(filePath, text, "utf-8");
  } catch (err) {
    throw toFriendlyError(err, "записати");
  }
}