import bundledTasks from "../tasks.json";
import {
  ensureTasksFile,
  getNode,
  getDataPath,
} from "./ensureTasksFile";

// Десеріалізація: текст файлу -> масив об'єктів
export async function loadTasks() {
  const node = getNode();
  if (!node) return bundledTasks;

  await ensureTasksFile(); // гарантуємо наявність файлу
  const text = await node.fs.promises.readFile(
    getDataPath(node),
    "utf-8"
  );
  return JSON.parse(text);
}

// Серіалізація: масив об'єктів -> текст файлу
export async function saveTasks(tasks) {
  const node = getNode();
  if (!node) return;

  const text = JSON.stringify(tasks, null, 2) + "\n";
  const filePath = getDataPath(node);
  await node.fs.promises.writeFile(filePath, text, "utf-8");
}