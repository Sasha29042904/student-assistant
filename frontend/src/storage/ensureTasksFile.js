// Початковий вміст нового файлу з демонстраційним завданням (Індивідуальне завдання)
const INITIAL_CONTENT = JSON.stringify(
  [
    {
      id: 1,
      title: "Демонстраційне завдання",
      completed: false,
      dueDate: "2026-10-15",
      priority: "medium",
    },
  ],
  null,
  2
) + "\n";

// Перевіряємо, чи ми працюємо у NW.js (де є window.require)
function getNode() {
  if (typeof window !== "undefined" && window.require) {
    return {
      fs: window.require("fs"),
      path: window.require("path"),
    };
  }
  return null;
}

// Формуємо шлях до data/tasks.json (на 2 рівні вище від frontend/dist)
function getDataPath(node) {
  const cwd = window.process.cwd();
  return node.path.resolve(cwd, "..", "..", "data", "tasks.json");
}

export async function ensureTasksFile() {
  const node = getNode();
  if (!node) return { status: "unavailable" };

  const filePath = getDataPath(node);
  const dir = node.path.dirname(filePath);

  // Створюємо папку data, якщо її немає
  await node.fs.promises.mkdir(dir, { recursive: true });

  try {
    // Прапорець "wx": створити файл, але НЕ перезаписувати, якщо він вже є!
    await node.fs.promises.writeFile(filePath, INITIAL_CONTENT, {
      encoding: "utf-8",
      flag: "wx",
    });
    return { status: "created", path: filePath };
  } catch (err) {
    if (err.code !== "EEXIST") throw err;

    // Якщо файл вже існує, перевіряємо його розмір
    const info = await node.fs.promises.stat(filePath);
    if (!info.isFile()) {
      throw new Error("tasks.json не є файлом: " + filePath);
    }
    return { status: "exists", path: filePath, size: info.size };
  }
}