function StorageStatus({ info, error }) {
  if (error) {
    return (
      <p className="storage-status storage-error">
        Помилка файлу даних: {error}
      </p>
    );
  }

  if (!info) {
    return <p className="storage-status">Перевірка файлу даних...</p>;
  }

  const messages = {
    created: `Файл даних створено: ${info.path}`,
    exists: `Файл даних знайдено: ${info.path} (${info.size} байт)`,
    unavailable: "Режим браузера: файл даних недоступний",
  };

  return <p className="storage-status">{messages[info.status]}</p>;
}

export default StorageStatus;