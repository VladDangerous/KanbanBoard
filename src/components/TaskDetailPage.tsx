import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { BoardData } from "../types/types";

interface Props {
  board: BoardData;
  setBoard: (board: BoardData) => void;
}

const TaskDetailPage: React.FC<Props> = ({ board, setBoard }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task = board
    .flatMap((col) => col.issues)
    .find((issue) => issue.id === id);

  const [desc, setDesc] = useState(task?.description || "");

  if (!task) return <div>Task not found</div>;

  const saveDescription = () => {
    setBoard(
      board.map((col) => ({
        ...col,
        issues: col.issues.map((issue) =>
          issue.id === id ? { ...issue, description: desc } : issue
        ),
      }))
    );
  };

  return (
    <div className="page-wrapper">
      <main
        className="task-page"
        style={{
          background: "#ffffff",
          padding: "22px 26px",
          height: "100%",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 400 }}>
            {task.name}
          </h1>

          <button
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
            }}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.06058"
                y1="0.353539"
                x2="24.0606"
                y2="23.3535"
                stroke="black"
              />
              <line
                y1="-0.5"
                x2="32.5269"
                y2="-0.5"
                transform="matrix(-0.707107 0.707107 0.707107 0.707107 23.707 0.707092)"
                stroke="black"
              />
            </svg>
          </button>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
          }}
        >
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onBlur={saveDescription}
            placeholder="This task has no description"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: "18px",
              lineHeight: "100%",
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default TaskDetailPage;
