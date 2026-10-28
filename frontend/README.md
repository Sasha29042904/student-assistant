# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
## Запуск десктопної версії (NW.js)

1. Завантажити NW.js SDK та розпакувати в папку `C:\nwjs` (файл `C:\nwjs\nw.exe`).
2. Для збірки та автоматичного запуску виконати з папки `frontend`:
   ```bash
   npm run desktop
## Файл даних (ПР10)

Розташування: `data/tasks.json`

### Логіка створення та безпека:
- При відсутності файлу він автоматично створюється асинхронно через Node API з початковим JSON.
- Для створення використан прапорець `wx` (`writeFile`), який гарантує, що якщо файл вже існує, він НЕ буде перезаписаний (запобігає втраті даних).

### Результати тестування сценаріїв:
| Сценарій | Очікуваний результат | Фактичний результат |
| :--- | :--- | :--- |
| **А. Файл існує** | Виведено "Файл даних знайдено...", файл не змінено | Успішно |
| **Б. Файлу немає** | Створено новий файл із базовим завданням | Успішно |
| **В. Немає папки data** | Папка та файл створюються автоматично | Успішно |
| **Г. Звичайний браузер** | Виведено "Режим браузера: файл даних недоступний" | Успішно |