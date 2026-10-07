import useIsDesktop from "../hooks/useIsDesktop";

function Header({ taskCount }) {
  const isDesktop = useIsDesktop();

  return (
    <header className="app-header">
      <h1>Student Assistant</h1>
      <span className="task-count">
        {isDesktop
          ? `Активних завдань: ${taskCount}`
          : `Завдань: ${taskCount}`}
      </span>
    </header>
  );
}

export default Header;