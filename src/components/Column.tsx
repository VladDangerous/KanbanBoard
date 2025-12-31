import React, { useState } from "react";
import type { ColumnType, BoardData, Issue } from "../types/types";
import { Link } from "react-router-dom";
import styles from "./Column.module.css";

interface Props {
  column: ColumnType;
  board: BoardData;
  setBoard: (board: BoardData) => void;
}

const Column: React.FC<Props> = ({ column, board, setBoard }) => {
  const [text, setText] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [adding, setAdding] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const order = ["backlog", "ready", "in-progress", "finished"];
  const prevColumn = board.find(
    (col) => order.indexOf(col.id) === order.indexOf(column.id) - 1
  );

  const addToBacklog = () => {
    if (!text.trim()) return;
    const newTask: Issue = { id: Date.now().toString(), name: text, description: "" };
    setBoard(
      board.map((col) =>
        col.id === "backlog"
          ? { ...col, issues: [...col.issues, newTask] }
          : col
      )
    );
    setText("");
    setAdding(false);
  };

  const moveTask = () => {
    if (!selectedId || !prevColumn) return;
    const task = prevColumn.issues.find((t) => t.id === selectedId);
    if (!task) return;

    setBoard(
      board.map((col) => {
        if (col.id === prevColumn.id) {
          return { ...col, issues: col.issues.filter((t) => t.id !== task.id) };
        }
        if (col.id === column.id) {
          return { ...col, issues: [...col.issues, task] };
        }
        return col;
      })
    );

    setSelectedId("");
    setAdding(false);
    setDropdownOpen(false);
  };

  const isDisabled =
    column.id !== "backlog" && (!prevColumn || prevColumn.issues.length === 0);

  return (
    <div className={styles.column}>
      <h2 className={styles.title}>{column.title}</h2>

      {column.issues.map((task) => (
        <Link key={task.id} to={`/tasks/${task.id}`} className={styles.card}>
          {task.name}
        </Link>
      ))}

      {adding && column.id === "backlog" && (
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task name"
        />
      )}

      {adding && column.id !== "backlog" && prevColumn && (
        <div className={styles.dropdown}>
          <div
            className={styles.dropdownHeader}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedId
              ? prevColumn.issues.find((t) => t.id === selectedId)?.name
              : "Select task"}
            <svg
              width="19"
              height="14"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              <path
                d="M0.390442 0.312378L10.3904 12.8124L18.3904 0.312378"
                stroke="black"
              />
            </svg>
          </div>
          {dropdownOpen && (
            <div className={styles.dropdownList}>
              {prevColumn.issues.map((task) => (
                <div
                  key={task.id}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setSelectedId(task.id);
                    setDropdownOpen(false);
                  }}
                >
                  {task.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        disabled={isDisabled}
        onClick={
          adding
            ? column.id === "backlog"
              ? addToBacklog
              : moveTask
            : () => setAdding(true)
        }
        className={`${styles.button} ${
          adding ? styles.buttonSubmit : ""
        } ${isDisabled ? styles.buttonDisabled : ""}`}
      >
        {!adding && (
          <span className={styles.icon}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 6H8V1C8 0.448 7.552 0 7 0C6.448 0 6 0.448 6 1V6H1C0.448 6 0 6.448 0 7C0 7.552 0.448 8 1 8H6V13C6 13.552 6.448 14 7 14C7.552 14 8 13.552 8 13V8H13C13.552 8 14 7.552 14 7C14 6.448 13.552 6 13 6Z"
                fill="currentColor"
              />
            </svg>
          </span>
        )}
        {adding ? "Submit" : "Add card"}
      </button>
    </div>
  );
};

export default Column;
