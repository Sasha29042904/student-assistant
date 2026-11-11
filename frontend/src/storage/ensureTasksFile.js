const INITIAL_CONTENT = "[]\n";

// Додано export!
export function getNode() {
  if (typeof window !== "undefined" && window.require) {
    return {
      fs: window.require("fs"),
      path: window.require("path"),
    };
  }
  return null;
}

// Додано export!
export function getDataPath(node) {
  const cwd = window.process.cwd();
  return node.path.resolve(cwd, "..", "..", "data", "tasks.json");
}

export async function ensureTasksFile() {
  const node = getNode();
  if (!node) return { status: "unavailable" };

  const filePath = getDataPath(node);
  const dir = node.path.dirname(filePath);

  await node.fs.promises.mkdir(dir, { recursive: true });

  try {
    await node.fs.promises.writeFile(filePath, INITIAL_CONTENT, {
      encoding: "utf-8",
      flag: "wx",
    });
    return { status: "created", path: filePath };
  } catch (err) {
    if (err.code !== "EEXIST") throw err;

    const info = await node.fs.promises.stat(filePath);
    if (!info.isFile()) {
      throw new Error("tasks.json не є файлом: " + filePath);
    }
    return { status: "exists", path: filePath, size: info.size };
  }
}